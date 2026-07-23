import prisma from "../lib/prisma.js";

export const getDashBoard = async (req, res) => {
    try {
        const [
            movies,users,
            reviews,
            watchlists,
            recentMovies,
            recentUsers,
        ] = await Promise.all([
            prisma.movie.count(),
            prisma.user.count(),
            prisma.review.count(),
            prisma.watchlist.count(),
            prisma.movie.findMany({
                take: 5,
                orderBy: {
                    releaseDate: "desc",
                },
                select: {
                    id: true,
                    title: true,
                    releaseDate: true,
                },
            }),
            prisma.user.findMany({
                take: 5,
                orderBy: {
                    createdAt: "desc",
                },
                select: {
                    id: true,
                    username: true,
                    createdAt: true,
                },
            }),
        ]);

        return res.status(200).json({
            stats: {
                movies,
                users,
                reviews,
                watchlists,
            },
            recentMovies,
            recentUsers,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
};