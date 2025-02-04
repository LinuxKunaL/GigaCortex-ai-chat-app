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
  async getConversationById(req, res) {
    try {
      const { id } = req.body;
      const result = await MChat.findById(id);
      if (!result) {
        return res.status(404).json({
          success: false,
          message: "Conversation not found",
        });
      }
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
  async deleteConversation(req, res) {
    try {
      const { id } = req.query;
      if (!id) {
        await MChat.deleteMany();
        return res.status(200).json({
          success: true,
          massage: "All Conversations deleted",
        });
      }

      await MChat.findByIdAndDelete(id);
      return res.status(200).json({
        success: true,
        massage: "Conversation deleted",
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
