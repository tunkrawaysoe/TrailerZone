import prisma from "../lib/prisma.js";

export const getAllUsers = async (req, res) => {
    const users = await prisma.user.findMany();
    res.status(200).json({
        message: 'This is all users',
        users
    })
}