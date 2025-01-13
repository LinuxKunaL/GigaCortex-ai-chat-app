import print from "./console.js";
import chatRouter from "../router/chat.js";

class Sockets {
  io = null;
  constructor(io) {
    this.io = io;
  }

  start() {
    print("Socket Server Started", "cyan");
    this.io.on("connection", (socket) => {
      new chatRouter(socket);
    });
  }
}

export default Sockets;
