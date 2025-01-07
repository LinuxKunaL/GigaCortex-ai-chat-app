import express from "express";
import config from "./config/index.js";
import cors from "cors";
import { connectDB } from "./database/connect.js";
import print from "./utils/console.js";

const app = express();
connectDB();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello from GigaCortex");
});

app.listen(config.port, () =>
  print(`Server running on port ${config.port}`, "cyan")
);
