import { Router } from "express";
import Chat from "../controller/chat.js";

const chat = new Chat();

const router = Router();

router
  .route("/conversations")
  .post(chat.getConversationById)
  .get(chat.getConversationsList)
  .delete(chat.deleteConversation);

export default router;
