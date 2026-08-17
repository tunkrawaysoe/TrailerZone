import jwt from "jsonwebtoken";

export const socketAuth = (socket, next) => {
    try {
        const accessToken = socket.handshake.auth.token;
        console.log(accessToken);

        if (!accessToken) {
            console.log("auth is required")
            return next(new Error("Authentication required"));
        }

        const decoded = jwt.verify(
            accessToken,
            process.env.JWT_SECRET
        );

        socket.user = decoded;

        next();
    } catch (error) {
        next(new Error("Invalid token"));
    }
};