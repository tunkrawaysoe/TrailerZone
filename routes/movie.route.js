import express from "express";
import prisma from "../lib/prisma.js";

const router = express.Router();

router.get('/', async (req, res) => {
    const allMovies = await prisma.movie.findMany();
    if (!allMovies) return res.status(204).json({ message: "There is no movie yet" });
    return res.status(200).json({ allMovies });
})

router.post("/", async (req, res) => {
    const {
        title,
        description,
        releaseDate,
        duration,
        posterUrl,
        backdropUrl,
        language
    } = req.body;

    if (!title || !description) {
        return res.status(400).json({
            message: "Title and description are required"
        });
    }

    try {
        const movie = await prisma.movie.create({
            data: {
                title,
                description,
                releaseDate: releaseDate ? new Date(releaseDate) : null,
                duration,
                posterUrl,
                backdropUrl,
                language,
            },
        });

        return res.status(201).json({
            message: "Movie created successfully",
            movie,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Failed to create movie",
        });
    }
});

router.get("/:id", async (req, res) => {
    const movieId = Number(req.params.id);

    if (isNaN(movieId)) {
        return res.status(400).json({
            message: "Invalid movie id"
        });
    }

    try {
        const movie = await prisma.movie.findUnique({
            where: {
                id: movieId
            }
        });

        if (!movie) {
            return res.status(404).json({
                message: "Movie not found"
            });
        }

        return res.status(200).json({
            movie
        });
    } catch (err) {
        console.error(err);

        return res.status(500).json({
            message: "Something went wrong"
        });
    }
});

router.patch("/:id", async (req, res) => {
    try {
        const movieId = Number(req.params.id);
        if (isNaN(movieId)) {
            return res.status(400).json({
                message: "Invalid movie id",
            });
        }

        const existingMovie = await prisma.movie.findUnique({
            where: { id: movieId },
        });

        if (!existingMovie) {
            return res.status(404).json({
                message: "Movie not found",
            });
        }

        const {
            title,
            description,
            releaseDate,
            duration,
            posterUrl,
            backdropUrl,
            language,
        } = req.body;

        const updatedMovie = await prisma.movie.update({
            where: { id: movieId },
            data: {
                ...(title !== undefined && { title }),
                ...(description !== undefined && { description }),
                ...(releaseDate !== undefined && {
                    releaseDate: releaseDate ? new Date(releaseDate) : null,
                }),
                ...(duration !== undefined && { duration }),
                ...(posterUrl !== undefined && { posterUrl }),
                ...(backdropUrl !== undefined && { backdropUrl }),
                ...(language !== undefined && { language }),
            },
        });

        return res.status(200).json({
            message: "Movie updated successfully",
            movie: updatedMovie,
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
});

router.delete("/:id", async (req, res) => {
    const movieId = Number(req.params.id);

    if (isNaN(movieId)) {
        return res.status(400).json({
            message: "Invalid movie id",
        });
    }

    try {
        await prisma.movie.delete({
            where: { id: movieId },
        });

        return res.status(200).json({
            message: "Movie deleted successfully",
        });

    } catch (err) {

        if (err?.code === "P2025") {
            return res.status(404).json({
                message: "Movie not found",
            });
        }

        return res.status(500).json({
            message: "Something went wrong",
        });
    }
});

export default router;