import { io } from "socket.io-client"

const socket = io("https://onlinecoding-backend.onrender.com", {
  transports: ['websocket'],
  withCredentials: true
});

export default socket;
