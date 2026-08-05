import express from "express"
import prisma from "../lib/prisma.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const reviews = await prisma.review.findMany({
            select: {
                id: true,
                rating: true,
                comment: true,
                movie: {
                    select: {
                        title: true,
                    },
                },
                user: {
                    select: {
                        name: true,
                    },
                },
            },
        });

        const formattedReviews = reviews.map(
            ({ id, rating, comment, movie, user }) => ({
                id,
                rating,
                comment,
                movieTitle: movie.title,
                userName: user.name,
            })
        );

        return res.status(200).json(formattedReviews);
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Internal server error",
        });
    }
});

router.delete('/:id', async (req, res) => {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: "Invalid reviewId" })
    try {
        await prisma.review.delete({
            where: {
                id
            }
        })
        return res.status(200).json({ message: "Review is deleted successfully" })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal server error" });
    }
})
export default router;