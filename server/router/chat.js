import express from "express";
import Chat from "../controller/chat.js";

const router = express.Router();
const chat = new Chat();

router.route("/chat").get(chat.getChat);

export default router;