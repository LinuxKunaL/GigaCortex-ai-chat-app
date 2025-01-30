import Ollama from "ollama";
import config from "../config/index.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import print from "../utils/console.js";
import MChat from "../database/model/chat.js";

class Chat {
  async ollamaChat(res, message) {
    try {
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

      print("Ollama model started", "gray");

      for await (const chunk of streamResponse) {
        const message = chunk.message.content;
        res.write(message);
        res.flush();
      }

      print("Ollama model ended", "gray");
      res.end();
    } catch (error) {
      print(`Ollama Error: ${error.message}`, "red");
      res.status(500).send("Error in Ollama chat.");
    }
  }

  async geminiChat(socket, question, userId, conversionId) {
    try {
      const genAI = new GoogleGenerativeAI(config.GeminiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const chat = await model.startChat();

      const result = await chat.sendMessageStream(
        `Respond to the following message in markdown format. Here's the message: ${question.text}`
      );

      let tempResult = [];
      let isCompleted = false;
      let title = "";
      let description = "";

      print("Gemini model started", "blue");

      for await (const chunk of result.stream) {
        const chunkContent = chunk.text();
        isCompleted = chunk.candidates[0]?.finishReason === "STOP";

        if (chunkContent) {
          tempResult.push(chunkContent);
          console.log(chunkContent);
          socket.emit("receive-answer", {
            questionId: question.questionId,
            answerInChunk: chunkContent,
            isCompleted,
          });
        }
      }

      if (!conversionId) {
        title = await this.generateTitle(chat, question);
        description = tempResult.join(" ").replace(/\n/g, "").slice(0, 35);
      }

      print("Gemini model ended", "blue");

      if (isCompleted) {
        await this.saveConversation(
          socket,
          conversionId,
          userId,
          title,
          description,
          question,
          tempResult
        );
      }
    } catch (error) {
      socket.emit("error-in-ask-question", error.message);
      print(`Gemini Error: ${error.message}`, "red");
    }
  }

  async conversation(socket, data) {
    try {
      const { question, chatModel, userId, conversionId } = data;

      if (chatModel === "gemini") {
        await this.geminiChat(socket, question, userId, conversionId);
      }

      if (chatModel === "ollama") {
        await this.ollamaChat(socket, question);
      }
    } catch (error) {
      print(`Conversation Error: ${error.message}`, "red");
    }
  }

  async generateTitle(chat, question) {
    try {
      let title = "";

      const result = await chat.sendMessageStream(
        `Generate a straightforward and meaningful title with only 4 to 5 words that directly reflects the main idea of the following message. Avoid adding extra punctuation, symbols, or questions. Do not include anything other than the title itself. Here's the message: ${question.text}`
      );

      for await (const chunk of result.stream) {
        const chunkContent = chunk.text();
        title += chunkContent.replace(/\n/g, " ");
      }

      return title;
    } catch (error) {
      print(`Title Generation Error: ${error.message}`, "red");
      return "Untitled";
    }
  }

  async saveConversation(
    socket,
    conversionId,
    userId,
    title,
    description,
    question,
    tempResult
  ) {
    try {
      const conversation =
        (conversionId && (await MChat.findById(conversionId))) || null;

      // Create a new conversation if not found
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
      } else {
        // Update existing conversation
        await MChat.findByIdAndUpdate(conversation._id, {
          $push: {
            conversation: {
              question: question.text,
              answer: tempResult.join(""),
            },
          },
        });
      }
    } catch (error) {
      print(`Save Conversation Error: ${error.message}`, "red");
    }
  }
}

export default Chat;
