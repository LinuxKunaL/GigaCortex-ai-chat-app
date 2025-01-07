import express from "express";
import config from "./config/index.js";
import cors from "cors";
import print from "./utils/console.js";
import authRouter from "./router/auth.js";
import chatRouter from "./router/chat.js";
import { connectDB } from "./database/connect.js";

const app = express();
connectDB();

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRouter);
app.use("/api/chat", chatRouter);

app.get("/", (req, res) => {
  res.send("Hello from GigaCortex");
});

app.listen(config.port, () =>
  print(`Server running on port ${config.port}`, "cyan")
);
