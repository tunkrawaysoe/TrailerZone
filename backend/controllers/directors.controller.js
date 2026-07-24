
import prisma from "../lib/prisma.js";

export const createDirector = async (req, res) => {
    const { name, biography, birthDate } = req.body;

    if (!name) {
        return res.status(400).json({
            message: "Name is required"
        });
    }

    try {
        const director = await prisma.director.create({
            data: {
                name,
                biography,
                birthDate: birthDate ? new Date(birthDate) : null
            }
        });

        return res.status(201).json({
            message: "Director created successfully",
            director
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Something went wrong"
        });
    }
};

export const getDirectors = async (req, res) => {
    try {
        const directors = await prisma.director.findMany();

        return res.status(200).json(directors);

    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong"
        });
    }
};

export const getDirector = async (req, res) => {
    const directorId = Number(req.params.id);

    if (isNaN(directorId)) {
        return res.status(400).json({
            message: "Invalid director id"
        });
    }

    try {
        const director = await prisma.director.findUnique({
            where: { id: directorId },
            include: {
                movies: {
                    include: {
                        movie: {
                            select: {
                                id: true,
                                title: true,
                                posterUrl: true
                            }
                        }
                    }
                }
            }
        });

        if (!director) {
            return res.status(404).json({
                message: "Director not found"
            });
        }
        const formattedMovie = director.movies.map(mv => {
            return {
                id: mv.movie.id,
                title: mv.movie.title,
                posterUrl: mv.movie.posterUrl
            }
        })
        return res.status(200).json({ ...director, movies: formattedMovie });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Something went wrong"
        });
    }
};

export const updateDirector = async (req, res) => {
    const directorId = Number(req.params.id);
    const { name, biography, birthDate } = req.body;

    if (isNaN(directorId)) {
        return res.status(400).json({
            message: "Invalid director id"
        });
    }

    try {
        const director = await prisma.director.update({
            where: { id: directorId },
            data: {
                ...(name !== undefined && { name }),
                ...(biography !== undefined && { biography }),
                ...(birthDate !== undefined && {
                    birthDate: new Date(birthDate)
                })
            }
        });

        return res.status(200).json({
            message: "Director updated successfully",
            director
        });

    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong"
        });
    }
};

export const deleteDirector = async (req, res) => {
    const directorId = Number(req.params.id);

    if (isNaN(directorId)) {
        return res.status(400).json({
            message: "Invalid director id"
        });
    }

    try {
        await prisma.director.delete({
            where: { id: directorId }
        });

        return res.status(200).json({
            message: "Director deleted successfully"
        });

    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong"
        });
    }
};