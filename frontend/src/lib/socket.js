import { io } from "socket.io-client";

export const socket = io("http://localhost:3000", {
    withCredentials: true,
    autoConnect: false,
});

export const setSocketToken = (accessToken) => {
    socket.auth = {
        token: accessToken,
    };
}