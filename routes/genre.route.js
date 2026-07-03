import express from "express";
import prisma from "../lib/prisma";

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const genres = await prisma.genre.findMany({
            orderBy: {
                name: "asc"
            }
        });
        return res.status(200).json({ genres })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            messaege: "Something went wrong"
        })
    }
})

   