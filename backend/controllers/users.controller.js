import prisma from "../lib/prisma.js";
import redis from "../lib/redis.js";

const userKey = "user:all";
const user_ttl = 60;

export const getAllUsers = async (req, res) => {
    try {
        const cacheUsers = await redis.get(userKey);

        if (cacheUsers) {
            console.log("Cache Hit");

            return res.status(200).json({
                message: "This is all users (cache)",
                users: JSON.parse(cacheUsers),
            });
        }

        console.log("Cache Miss");

        const users = await prisma.user.findMany();

        await redis.set(userKey, JSON.stringify(users), {
            EX: user_ttl,
        });

        return res.status(200).json({
            message: "This is all users (db)",
            users,
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Server error",
        });
    }
};