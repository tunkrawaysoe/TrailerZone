import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

export const register = async (req, res) => {
    const { name, username, email, phoneNumber, password } = req.body;
    if (!name || !username || !email || !phoneNumber || !password) {
        return res.status(400).json({
            messsage: 'all field are required'
        });

    }
    try {
        const foundUser = await prisma.user.findUnique({
            where: { email }
        })
        if (foundUser) {
            return res.status(409).json({
                messsage: "Email already exists"
            })
        }
        const newUser = await prisma.user.create({
            data: {
                name,
                username,
                email,
                phoneNumber,
                password
            }
        })
        const { password: hidden, ...safe } = newUser;
        res.status(201).json({
            messsage: "User created successfully",
            user: safe
        })
    } catch (error) {
        if (error.code === "P2002") {
            return res.status(409).json({
                message: "Email Or Phone Number already exit"
            })
        }
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

export const logIn = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "All fields are requird" });
    }
    const foundUser = await prisma.user.findUnique({
        where: { email }
    })
    if (!foundUser) return res.status(404).json({ message: "You have to register first" });
    const isMatch = foundUser.password === password;
    if (!isMatch) return res.status(401).json({ message: "Password don't match" });
    const { refreshToken: hidden, password: _, ...rest } = foundUser;

    const accesstoken = jwt.sign({
        id: foundUser.id,
        email: foundUser.email
    }, JWT_SECRET, {
        expiresIn: '10m'
    });

    const refreshToken = jwt.sign({
        id: foundUser.id,
        email: foundUser.email
    },
        REFRESH_SECRET,
        {
            expiresIn: '7d'
        })

    await prisma.refreshToken.create({
        data: {
            token: refreshToken,
            userId: foundUser.id,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)

        }
    })
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000
    })

    return res.status(200).json({
        message: "Login Sucessful",
        user: rest,
        accesstoken
    })
}

export const logOut = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(204);
    await prisma.refreshToken.delete({
        where: {
            token: refreshToken
        }
    })
    res.clearCookie('refreshToken');

    return res.status(200).json({
        message: "Logout successfull"
    })
}

export const refresh = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.status(401).json({ message: "No refresh token" });
    const storedToken = await prisma.refreshToken.findUnique({
        where: {
            token: refreshToken
        },
        include: {
            user: true
        }
    })
    if (!storedToken) return res.status(401).json({ message: "Refresh token not recognized" });
    jwt.verify(refreshToken, REFRESH_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({
                message: 'Invalid refresh token'
            });
        }
        const accesstoken = jwt.sign({
            id: storedToken.user.id,
            email: storedToken.user.email
        }, JWT_SECRET, {
            expiresIn: '30s',
        })

        return res.status(200).json({ accesstoken });
    })
}