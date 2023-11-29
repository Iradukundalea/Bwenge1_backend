const sockets = (socket) => {
  socket.on("send-message", messageController.sendMessage);
};

export default sockets;
