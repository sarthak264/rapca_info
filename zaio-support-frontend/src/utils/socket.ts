import { io } from "socket.io-client";
export const customSocket = io(
  process.env.REACT_APP_SOCKET_BACKEND_URL ||
    "https://zaio-support-backend.herokuapp.com"
);
