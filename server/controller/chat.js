import Ollama from "ollama";
import config from "../config/index.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import print from "../utils/console.js";
import result from "../utils/demoGeminiResponse.js";

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

  geminiChat = async (socket, question) => {
    // const genAI = new GoogleGenerativeAI(config.GeminiKey);
    // const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // const chat = await model.startChat();
    // const result = await chat.sendMessageStream(
    //   `i will ask you the question you wanna give the answer in form of markdown format like heading ### at all use all the key features of markdown , here is the question => : ${question.text}`
    // );

    print("gemini model Started ", "blue");
    for await (const chunk of result /** result.stream*/) {
      // const chunkContent = chunk.text;
      const chunkContent = chunk.candidates[0].content.parts[0].text;
      const isCompleted = chunk.candidates[0].finishReason === "STOP";

      socket.emit("receive-answer", {
        answerInChunk: chunkContent,
        isCompleted: isCompleted,
        questionId: question.id,
      });

      await new Promise((resolve) => setTimeout(resolve, 400));
    }
    print("gemini model Ended ", "blue");
  };

  conversation = async (socket, data) => {
    try {
      const { question, chatModel } = data;

      if (chatModel === "gemini") {
        this.geminiChat(socket, question);
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
