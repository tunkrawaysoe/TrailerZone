import prisma from "../lib/prisma.js";

export const getActors = async (req, res) => {
    try {
        const actors = await prisma.actor.findMany();
        return res.status(200).json({ actors });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
};

export const createActor = async (req, res) => {
    const { name, profileImage, biography, birthDate } = req.body;

    if (!name) {
        return res.status(400).json({ message: "Name is required" });
    }

    try {
        const actor = await prisma.actor.create({
            data: {
                name,
                profileImage,
                biography,
                birthDate: birthDate ? new Date(birthDate) : null,
            },
        });

        return res.status(201).json({
            message: "Actor created successfully",
            actor,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
};

export const getActor = async (req, res) => {
    const actorId = Number(req.params.id);

    if (isNaN(actorId)) {
        return res.status(400).json({ message: "Invalid actor id" });
    }

    try {
        const actor = await prisma.actor.findUnique({
            where: { id: actorId },
            include: {
                movies: {
                    select: {
                        movie: {
                            select: {
                                id: true,
                                title: true,
                                releaseDate: true,
                                posterUrl: true
                            }
                        }
                    }
                },
            },
        });
        const formattedactor = actor.movies.map(mv => {
            return {
                id: mv.movie.id,
                title: mv.movie.title,
                releaseDate: mv.movie.releaseDate,
                posterUrl: mv.movie.posterUrl
            }
        })

        return res.status(200).json({ ...actor, movies: formattedactor });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
};

export const updateActor = async (req, res) => {
    const actorId = Number(req.params.id);
    const { name, profileImage, biography, birthDate } = req.body;

    if (isNaN(actorId)) {
        return res.status(400).json({ message: "Invalid actor id" });
    }

    try {
        const updatedActor = await prisma.actor.update({
            where: { id: actorId },
            data: {
                ...(name !== undefined && { name }),
                ...(profileImage !== undefined && { profileImage }),
                ...(biography !== undefined && { biography }),
                ...(birthDate !== undefined && {
                    birthDate: new Date(birthDate),
                }),
            },
        });

        return res.status(200).json({
            message: "Actor updated successfully",
            actor: updatedActor,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
};

export const deleteActor = async (req, res) => {
    const actorId = Number(req.params.id);

    if (isNaN(actorId)) {
        return res.status(400).json({ message: "Invalid actor id" });
    }

    try {
        await prisma.actor.delete({
            where: { id: actorId },
        });

        return res.status(200).json({
            message: "Actor deleted successfully",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
};