import express from "express";
import prisma from "../lib/prisma.js";

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const genres = await prisma.genre.findMany({
            orderBy: {
                name: "asc"
            }
        });
        return res.status(200).json(genres)
    } catch (error) {
        console.log(error);
        res.status(500).json({
            messaege: "Something went wrong"
        })
    }
})

router.post("/", async (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({
            message: "Name is required",
        });
    }

    try {
        const genre = await prisma.genre.create({
            data: {
                name,
            },
        });

        return res.status(201).json({
            message: "Genre created successfully",
            genre,
        });
    } catch (error) {
        console.error(error);

        if (error.code === "P2002") {
            return res.status(409).json({
                message: "This genre name already exists",
            });
        }

        return res.status(500).json({
            message: "Something went wrong",
        });
    }
});

router.delete('/:id', async (req, res) => {
    const genreId = Number(req.params.id)
    if (isNaN(genreId)) {
        return res.status(400).json({ message: "Invalid GenreId" })
    }
    try {
        await prisma.genre.delete({
            where: {
                id: genreId
            }
        })
        return res.status(200).json({ messaege: "Genre deleted successfully" })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ messaege: "Something went wrong" })
    }
})

export default router;