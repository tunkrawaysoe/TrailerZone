import { Server } from "socket.io";

let io;

export const socketServer = (httpServer) => {
    io = new Server(httpServer, {
        cors: {
            origin: "http://localhost:5173",
            credentials: true,
        },
    });

    return io;
};

export const getIO = () => io;