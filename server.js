    import dotenv from "dotenv";
    dotenv.config();

    import express from "express";
    import jwt from "jsonwebtoken";
    import cookieParser from "cookie-parser";
    import { PrismaClient } from "@prisma/client";
    import prisma from "./lib/prisma.js";


    const app = express();

    app.use(cookieParser());
    app.use(express.json());

    const PORT = process.env.PORT || 3000;
    const JWT_SECRET = process.env.JWT_SECRET;
    const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
    const users = [
        {
            id: 1,
            name: "Tun Tun",
            email: "tuntun@example.com",
            phoneNumber: "09123456789",
            password: "password123",
            refreshToken: "",
        },
        {
            id: 2,
            name: "Su Su",
            email: "susu@example.com",
            phoneNumber: "09987654321",
            password: "password456",
            refreshToken: ""
        },
        {
            id: 3,
            name: "Aung Aung",
            email: "aung@example.com",
            phoneNumber: "09456789123",
            password: "password789",
            refreshToken: ""
        }
    ];

    app.post('/auth/register', async (req, res) => {
        const { name, email, phoneNumber, password } = req.body;
        if (!name || !email || !phoneNumber || !password) {
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
    })

    app.post('/auth/login', async (req, res) => {
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
            expiresIn: '30s'
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
    })

    app.get('/auth/logout', async (req, res) => {
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
    })

    app.get('/get/users', async (req, res) => {
        const users = await prisma.user.findMany();
        res.status(200).json({
            message: 'This is all users',
            users
        })
    })
    app.post('/auth/refresh', async (req, res) => {
        const refreshToken = req.cookies.refreshToken;
        console.log(refreshToken);
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
    })



    app.get('/', (req, res) => {
        res.status(200).json({
            message: "This is auth server"
        })
    })

    app.listen(PORT, () => {
        console.log("Server is running at", PORT);
    })
