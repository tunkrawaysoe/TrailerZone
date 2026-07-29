import prisma from "../lib/prisma.js";
import redis from "../lib/redis.js";

export const getProfile = async (req, res) => {
    const userId = req.user?.id;

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


export const updateProfile = async (req, res) => {
    const userId = req.user.id;

    const {
        name,
        username,
        email,
        phoneNumber,
        profilePicture
    } = req.body;

    try {
        const updatedProfile = await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                ...(name !== undefined && { name }),
                ...(username !== undefined && { username }),
                ...(email !== undefined && { email }),
                ...(phoneNumber !== undefined && { phoneNumber }),
                ...(profilePicture !== undefined && { profilePicture }),
            },
            select: {
                id: true,
                name: true,
                username: true,
                email: true,
                phoneNumber: true,
                profilePicture: true,
                createdAt: true,
            }
        });

        return res.status(200).json(updatedProfile);

    } catch (error) {
        if (error.code === "P2002") {
            return res.status(409).json({
                message: "Email, username, or phone number already exists"
            });
        }

        console.log(error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
};