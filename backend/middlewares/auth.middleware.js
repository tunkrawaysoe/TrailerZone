import jwt from "jsonwebtoken"
const ACCESS_SECRET = process.env.JWT_SECRET;
export const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token || token === "null" || token === "undefined") return res.status(401).json({ message: "No token provide" });
    try {
        const decoded = jwt.verify(token, ACCESS_SECRET);
        req.user = decoded;
        next();
    }
    catch {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
}