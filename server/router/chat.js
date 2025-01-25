import { Router } from "express";
import Chat from "../controller/chat.js";

const chat = new Chat();

const router = Router();

router.route("/conversations-list").get(chat.getConversationsList);

export default router;
