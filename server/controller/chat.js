import Ollama from "ollama";
import config from "../config/index.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import print from "../utils/console.js";
import Ws from "ws";

class Chat {
  setHeaders = (req, res, next) => {
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    res.flushHeaders();
    next();
  };

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

  geminiChat = async (res, message) => {
    // const genAI = new GoogleGenerativeAI(config.GeminiKey);
    // const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // const chat = await model.startChat();
    // const result = await chat.sendMessageStream(message);

    // print("gemini model Started ", "blue");
    // for await (const chunk of result.stream) {
    //   const chunkContent = chunk.text();
    //   console.log(chunkContent);
    //   res.write(chunkContent);
    //   res.flush();
    // }
    // print("gemini model Ended ", "blue");

    // res.end();


    ws.on("connection", function connection(ws) {
      ws.send("Hello");
    });


    const chunks = [
      "This is the first chunk.",
      "This is the first chunk.",
      " Here comes the second chunk.",
      " Here comes the second chunk.",
      " Here comes the second chunk.",
      " And the third chunk.",
      " And the third chunk.",
      " And the third chunk.",
    ];

    for (const chunk of chunks) {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate delay
      res.write(chunk);
    }

    res.end();
  };

  conversation = async (req, res) => {
    try {
      const { message = "hi", chatModel = "gemini" } = req.body;

      if (!message || !chatModel) {
        return res.status(400).json({ error: "All fields are required" });
      }

      if (chatModel === "gemini") {
        this.geminiChat(res, message);
      }

      if (chatModel === "ollama") {
        this.ollamaChat(res, message);
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Something went wrong" });
    }
  };
}

export default Chat;
