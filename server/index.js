import express from "express";
import http from "http";
import config from "./config/index.js";
import cors from "cors";
import print from "./utils/console.js";
import authRouter from "./router/auth.js";
import chatRouter from "./router/chat.js";
import { connectDB } from "./database/connect.js";
import verify from "./middleware/verify.js";
import compression from "compression";
import { Server } from "socket.io";
import Sockets from "./utils/socket.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const socket = new Sockets(io);

connectDB();
socket.start();

app.use(express.json());
app.use(cors());
app.use(compression());
app.use(verify);

app.use("/api/auth", authRouter);
app.use("/api/chat", chatRouter);

// when route & endpoint not found
app.use("*", (req, res) => {
  res.status(404).send("route not found");
});

app.get("/", (req, res) => {
  res.send("Hello from GigaCortex");
});

server.listen(config.port, () =>
  print(`Server running on port ${config.port}`, "cyan")
);
