import prisma from "../lib/prisma.js";

export const addToWatchlist = async (req, res) => {
    const movieId = Number(req.params.movieId);
    const userId = Number(req.body.userId);

    if (isNaN(movieId) || isNaN(userId)) {
        return res.status(400).json({
            message: "Invalid movie or user id"
        });
    }

    try {
        const watchlist = await prisma.watchlist.create({
            data: {
                userId,
                movieId
            }
        });

        return res.status(201).json({
            message: "Added to watchlist",
            watchlist
        });

    } catch (error) {
        if (error.code === "P2002") {
            return res.status(400).json({
                message: "Movie already in watchlist"
            });
        }

        return res.status(500).json({
            message: "Something went wrong"
        });
    }
};

export const getWatchlist = async (req, res) => {
    const userId = Number(req.query.userId);

    if (isNaN(userId)) {
        return res.status(400).json({
            message: "Invalid user id"
        });
    }

    try {
        const watchlist = await prisma.watchlist.findMany({
            where: { userId },
            select: {
                createdAt: true,
                movie: {
                    select: {
                        id: true,
                        title: true,
                        releaseDate: true,
                        posterUrl: true
                    }
                }
            }
        });

        const formattedWatchlist = watchlist.map(({ createdAt, movie }) => {
            return { ...movie, createdAt }
        })

        return res.status(200).json({
            watchlist: formattedWatchlist
        });

    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong"
        });
    }
};

export const removeFromWatchlist = async (req, res) => {
    const movieId = Number(req.params.movieId);
    const userId = Number(req.body.userId);

    if (isNaN(movieId) || isNaN(userId)) {
        return res.status(400).json({
            message: "Invalid movie or user id"
        });
    }

    try {
        await prisma.watchlist.delete({
            where: {
                userId_movieId: {
                    userId,
                    movieId
                }
            }
        });

        return res.status(200).json({
            message: "Removed from watchlist"
        });

    } catch (error) {
        if (error.code === "P2025") {
            return res.status(404).json({
                message: "Watchlist item not found"
            });
        }

        return res.status(500).json({
            message: "Something went wrong"
        });
    }
};
