import { Schema, model } from "mongoose";

const chatSchema = new Schema({
  title: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
  },
  userId: {
    type: Schema.Types.ObjectId,
  },
  conversation: [
    {
      questionId: {
        type: Schema.Types.ObjectId,
      },
      question: {
        type: String,
      },
      answer: {
        type: String,
      },
    },
  ],
  updateAt: {
    type: Date,
    default: Date.now,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});

const MChat = model("chats", chatSchema);

export default MChat;
