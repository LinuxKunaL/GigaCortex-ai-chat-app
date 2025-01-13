import Ollama from "ollama";
import config from "../config/index.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import print from "../utils/console.js";
import Socket from "../utils/socket.js";

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

  geminiChat = async (socket, message) => {
    const genAI = new GoogleGenerativeAI(config.GeminiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const chat = await model.startChat();
    const result = await chat.sendMessageStream(
      `i will ask you the question you wanna give the answer in form of markdown format like heading ### at all use all the key features of markdown , here is the question => : ${message}`
    );

    print("gemini model Started ", "blue");
    var lines = [];
    for await (const chunk of result.stream) {
      const chunkContent = chunk.text();
      lines.push(chunkContent);
      socket.emit("receive-answer", {
        chunk: chunkContent,
      });
    }
    print("gemini model Ended ", "blue");

    console.log(lines);

    // const lines = [
    //   "HTML (HyperText Markup Language) is **Markup Language** the standard language used to create and design webpages. It structures web content using elements represented by tags, such as `<h1>` for headings, `<p>` for paragraphs, and `<a>` for links.",

    //   "### Key Features of HTML:",

    //   "1. **Markup Language**: Defines the structure of web pages using tags.",
    //   "2. **Basic Building Block**: Works alongside CSS for styling and JavaScript for interactivity.",
    //   "3. **Cross-Platform**: Supported by all modern browsers.",

    //   "> hi",

    //   "The killer feature of `markdown-it` is very effective support of",

    //   "### Example:",

    //   '```html\n<!DOCTYPE html>\n<html>\n<head>\n  <title>My Web Page</title>\n</head>\n<body>\n  <h1>Welcome to My Website</h1>\n  <p>This is a paragraph of text.</p>\n  <a href="https://example.com">Visit Example</a>\n</body>\n</html>\n```',

    //   "```javascript\nvar code = 12\nlog(code+12);\nfunction kunal(){\n  return 12\n}\n```",

    //   '```python\na = 5\nb = 3\nsum = a + b\nprint("The sum is", sum)\n```',
    // ];
    // for (const chunk of lines) {
    //   await new Promise((resolve) => setTimeout(resolve, 100));
    //   socket.emit("receive-answer", {
    //     chunk: chunk,
    //   });
    // }
  };

  conversation = async (socket, data) => {
    try {
      const { message = "hi", chatModel = "gemini" } = data;

      if (!message || !chatModel) {
        return res.status(400).json({ error: "All fields are required" });
      }

      if (chatModel === "gemini") {
        this.geminiChat(socket, message);
      }

      if (chatModel === "ollama") {
        this.ollamaChat(socket, message);
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Something went wrong" });
    }
  };
}

export default Chat;
