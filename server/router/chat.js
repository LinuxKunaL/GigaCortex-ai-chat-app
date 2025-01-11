import express from "express";
import Chat from "../controller/chat.js";

const router = express.Router();
const chat = new Chat();

router.route("/conversation").post(chat.setHeaders,chat.conversation);

export default router; 