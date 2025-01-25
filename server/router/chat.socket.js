/**
 * this is the router for chat
 * this router is not express router its @socket io
 * @param {Object} socket
 */

import ChatController from "../controller/chat.socket.js";

class chatRouter {
  socket = null;
  constructor(socket) {
    this.socket = socket;
    socket.on("ask-question", (data) => this.sendMessage(data));
  }

  sendMessage(data) {
    const chatController = new ChatController();
    chatController.conversation(this.socket, data);
  }


}

export default chatRouter;
