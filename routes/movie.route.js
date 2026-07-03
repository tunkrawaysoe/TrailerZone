import express from "express";
import prisma from "../lib/prisma.js";
import redis from '../lib/redis.js'
const router = express.Router();

function getMovieRedisKey(pageNo, limit) {
    return `movies:${pageNo}:${limit}`;
}

router.get("/", async (req, res) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const movieKey = getMovieRedisKey(page, limit);

    try {
        const cacheMovies = await redis.get(movieKey);

        if (cacheMovies) {
            console.log("cache hit");
            return res.status(200).json(JSON.parse(cacheMovies));
        }

        const totalMovies = await prisma.movie.count();

        const movies = await prisma.movie.findMany({
            skip: (page - 1) * limit,
            take: limit,
            orderBy: {
                releaseDate: "desc",
            },
        });

        const totalPages = Math.ceil(totalMovies / limit);

        const data = {
            page,
            limit,
            movies,
            totalPages,
            totalMovies,
        };

        console.log("cache miss");

        await redis.set(movieKey, JSON.stringify(data), {
            EX: 60,
        });

        return res.status(200).json(data);

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Something went wrong",
        });
    }
});

router.post("/", async (req, res) => {
    const {
        title,
        description,
        releaseDate,
        duration,
        posterUrl,
        backdropUrl,
        language,
        genreIds
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

        if (genreIds?.length) {
            await prisma.movieGenre.createMany({
                data: genreIds.map(id => ({
                    movieId: movie.id,
                    genreId: id,
                }))
            });
        }

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
            },
            include: {
                movieGenres: {
                    include: {
                        genre: true
                    }
                }
            }
        });

        if (!movie) {
            return res.status(404).json({
                message: "Movie not found"
            });
        }

        return res.status(200).json({
            ...movie, movieGenres: movie.movieGenres.map(mg => {
                return mg.genre.name
            })
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

router.post('/:movieId/reviews', async (req, res) => {
    const movieId = Number(req.params.movieId);
    const userId = Number(req.body.userId);
    const { rating, comment } = req.body;

    if (isNaN(movieId)) {
        return res.status(400).json({
            message: "Invalid movie id"
        });
    }

    if (isNaN(userId)) {
        return res.status(400).json({
            message: "Invalid user id"
        });
    }

    if (rating === undefined || !comment) {
        return res.status(400).json({
            message: "Rating and comment are required"
        });
    }

    try {
        await prisma.review.create({
            data: {
                rating,
                comment,
                movieId,
                userId,
            }
        });

        return res.status(201).json({
            message: "Review added successfully"
        });

    } catch (error) {
        if (error.code === 'P2002') {
            return res.status(400).json({
                message: "You already reviewed this movie"
            });
        }

        return res.status(500).json({
            message: "Something went wrong"
        });
    }
});

export default router;