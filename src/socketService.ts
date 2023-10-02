import { io } from "socket.io-client"

const socket = io("https://onlinecoding-backend.onrender.com", {
  transports: ['websocket'],
  withCredentials: true,
  autoConnect: false
});

export default socket;
