import dotenv from "dotenv";

dotenv.config();

const config = {
  port: process.env.PORT,
  socket_port: 3001,
  dbUrl: process.env.MONGODB_URL,
  jwt: process.env.JWT_SECRET,
  GeminiKey: process.env.GEMINI_KEY,
  ollamaModels: {
    codeamma: "codellama:7b",
    qwen: "qwen2.5-coder:7b",
    llama3: "llama3.1:8b",
  },
};

export default config;
