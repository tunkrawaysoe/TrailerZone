import prisma from "../lib/prisma.js";

export const ownsReview = async (req, res, next) => {
    const userId = req.user.id;
    const reviewId = Number(req.params.id);

    if (isNaN(reviewId)) {
        return res.status(400).json({
            message: "Invalid review id"
        });
    }

    try {
        const review = await prisma.review.findUnique({
            where: {
                id: reviewId
            }
        });

        if (!review) {
            return res.status(404).json({
                message: "Review not found"
            });
        }

        if (review.userId !== userId) {
            return res.status(403).json({
                message: "Forbidden"
            });
        }

        next();

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Something went wrong"
        });
    }
};