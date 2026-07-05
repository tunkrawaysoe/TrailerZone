import { join } from "@prisma/client/runtime/library";
import prisma from "../lib/prisma.js"

export const deleteTrailer = async (req, res) => {
    const trailerId = Number(req.params.id);

    if (isNaN(trailerId)) {
        return res.status(400).json({
            message: "Invalid trailer id"
        });
    }

    try {
        await prisma.trailer.delete({
            where: {
                id: trailerId
            }
        });

        return res.status(200).json({
            message: "Trailer deleted successfully"
        });

    } catch (error) {

        if (error.code === "P2025") {
            return res.status(404).json({
                message: "Trailer not found"
            });
        }

        return res.status(500).json({
            message: "Something went wrong"
        });
    }
};

export const updateTrailer = async (req, res) => {
    const trailerId = Number(req.params.id);
    const { title, youtubeKey } = req.body;

    if (isNaN(trailerId)) {
        return res.status(400).json({
            message: "Invalid trailer id"
        });
    }

    try {
        const updatedTrailer = await prisma.trailer.update({
            where: {
                id: trailerId
            },
            data: {
                ...(title !== undefined && { title }),
                ...(youtubeKey !== undefined && { youtubeKey }),
            }
        });

        return res.status(200).json({
            message: "Trailer updated successfully",
            trailer: updatedTrailer
        });

    } catch (error) {
        console.log(error);

        if (error.code === "P2025") {
            return res.status(404).json({
                message: "Trailer not found"
            });
        }

        if (error.code === "P2002") {
            return res.status(409).json({
                message: "YouTube key already exists"
            });
        }

        return res.status(500).json({
            message: "Something went wrong"
        });
    }
};
