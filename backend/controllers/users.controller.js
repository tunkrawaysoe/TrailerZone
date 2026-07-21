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

export const getProfile = async (req, res) => {
    const userId = req.user?.id || 2;

    if (!userId) {
        return res.status(401).json({
            message: "Unauthorized"
        });
    }
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            },
            select: {
                id: true,
                name: true,
                username: true,
                email: true,
                phoneNumber: true,
                profilePicture: true,
                createdAt: true,
                _count: {
                    select: {
                        reviews: true,
                        watchlists: true
                    }
                }
            }
        });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        return res.status(200).json(user);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Something went wrong"
        });
    }
};