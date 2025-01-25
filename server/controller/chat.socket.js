import Ollama from "ollama";
import config from "../config/index.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import print from "../utils/console.js";
import result from "../utils/demoGeminiResponse.js";
import MChat from "../database/model/chat.js";

class Chat {
  ollamaChat = async (res, message) => {
    const streamResponse = await Ollama.chat({
      model: config.ollamaModels.llama3,
      messages: [
        {
          role: "user",
          content: message,
        },
      ],
      stream: true,
    });

    print("ollama model Started ", "gray");
    for await (const chunk of streamResponse) {
      const message = chunk.message.content;
      res.write(message);
      res.flush();
    }
    print("ollama model end ", "gray");

    res.end();
  };

  geminiChat = async (socket, question, userId, conversionId) => {
    // const genAI = new GoogleGenerativeAI(config.GeminiKey);
    // const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // const chat = await model.startChat();
    // const result = await chat.sendMessageStream(
    //   `i will ask you the question you wanna give the answer in form of markdown format like heading ### at all use all the key features of markdown , here is the question => : ${question.text}`
    // );

    /**
     * result[0] is holds the @title
     * result[1] is holds the @description
     */
    const title = result[0].candidates[0].content.parts[0].text;
    const description = result[1].candidates[0].content.parts[0].text;

    var tempResult = [];
    var isCompleted;
    try {
      /**
       * send the @question to the model
       */
      print("gemini model Started ", "blue");
      /**
       * send a @title first
       */
      for await (const chunk of result.slice(2) /** result.stream*/) {
        // const chunkContent = chunk.text;

        const chunkContent = chunk.candidates[0].content.parts[0].text;
        isCompleted = chunk.candidates[0].finishReason === "STOP";

        if (chunkContent) {
          tempResult.push(chunkContent);
          /**
           * send the @chunkContent to the client
           */
          socket.emit("receive-answer", {
            answerInChunk: chunkContent,
            isCompleted: isCompleted,
          });
          /**
           * wait for 400ms for demo purposes
           */
          await new Promise((resolve) => setTimeout(resolve, 400));
        }
      }
      print("gemini model Ended ", "blue");

      /**
       * if @isCompleted than save the conversation
       */
      if (isCompleted) {
        const conversation =
          (conversionId && (await MChat.findById(conversionId))) || null;
        /**
         * if not @found create new one
         * */

        if (!conversation) {
          const result = await MChat.create({
            userId,
            title,
            description,
            conversation: [
              {
                question: question.text,
                answer: tempResult.join(""),
              },
            ],
          });
          socket.emit("receive-title", title);
          socket.emit("receive-conversation-id", result._id.toString());
        }
        /**
         * if @found than update / push new question and answer
         * */
        if (conversation) {
          await MChat.findByIdAndUpdate(conversation._id, {
            $push: {
              conversation: {
                question: question.text,
                answer: tempResult.join(""),
              },
            },
          });
        }
      }
    } catch (error) {
      print(error, "red");
    }
  };

  conversation = async (socket, data) => {
    try {
      const { question, chatModel, userId, conversionId } = data;

      if (chatModel === "gemini") {
        this.geminiChat(socket, question, userId, conversionId);
      }

      if (chatModel === "ollama") {
        this.ollamaChat(socket, question);
      }
    } catch (error) {
      console.log(error);
    }
  };
}

export default Chat;
