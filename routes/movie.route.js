import express from "express";
import prisma from "../lib/prisma.js";

const router = express.Router();

router.get('/', async (req, res) => {
    const allMovies = await prisma.movie.findMany();
    if (!allMovies) return res.status(204).json({ message: "There is no movie yet" });
    return res.status(200).json({ allMovies });
})

export default router;