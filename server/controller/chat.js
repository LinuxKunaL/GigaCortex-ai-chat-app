import MChat from "../database/model/chat.js";

class Chat {
  async getConversationsList(req, res) {
    try {
      const userId = req.user;

      const result = await MChat.find(
        { userId },
        { userId: 0, __v: 0, conversation: 0 }
      ).sort({
        updateAt: -1,
        createAt: -1,
      });

      return res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
}
export default Chat;
