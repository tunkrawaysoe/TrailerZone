import prisma from "../lib/prisma.js";

export const getDashBoard = async (req, res) => {
    try {
        const [
            movies, users,
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

export const createMovie = async (req, res) => {
    const {
        title,
        description,
        releaseDate,
        duration,
        posterUrl,
        backdropUrl,
        language,
        genreIds,
        actors,
        directorIds,
    } = req.body;

    if (!title || !description) {
        return res.status(400).json({
            message: "Title and description are required"
        });
    }

    try {
        const movie = await prisma.$transaction(async (tx) => {
            const createdMovie = await tx.movie.create({
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
                await tx.movieGenre.createMany({
                    data: genreIds.map(id => ({
                        movieId: createdMovie.id,
                        genreId: id,
                    }))
                });
            }
            if (actors?.length) {
                await tx.movieActor.createMany({
                    data: actors.map(actor => {
                        return {
                            movieId: createdMovie.id,
                            actorId: actor.actorId,
                            characterName: actor.characterName
                        }
                    })
                })
            }
            if (directorIds?.length) {
                await tx.movieDirector.createMany({
                    data: directorIds.map(id => {
                        return {
                            movieId: createdMovie.id,
                            directorId: id
                        }
                    })
                })
            }

            return createdMovie
        })
        const keys = await redis.keys("movies:*");

        if (keys.length > 0) {
            await redis.del(keys);
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
};

export const updateMovie = async (req, res) => {
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
};

export const deleteMovie = async (req, res) => {
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
};

export const createTrailer = async (req, res) => {
    const movieId = Number(req.params.movieId);
    const { title, youtubeKey } = req.body;
    if (isNaN(movieId)) {
        return res.status(400).json({ message: "Invalid movie id" });
    }
    if (!title || !youtubeKey) return res.status(400).json({ message: "Title and youtube key are required." });
    try {
        const trailer = await prisma.trailer.create({
            data: {
                title,
                youtubeKey,
                movieId
            }
        })

        return res.status(201).json({
            message: "Trailer created successfully",
            trailer
        })

    } catch (error) {
        if (error.code === 'P2002') {
            return res.status(409).json({ message: "This trailer already exists for the movie" })
        }

        if (error.code === "P2003") {
            return res.status(400).json({
                message: "Invalid movieId (movie does not exist)"
            });
        }
        res.status(500).json({ message: "Something went wrong" });
    }
}

export const addActorToMovie = async (req, res) => {
    const movieId = Number(req.params.movieId);
    const actorId = Number(req.body.actorId);
    const { characterName } = req.body;

    if (isNaN(movieId)) {
        return res.status(400).json({
            message: "Invalid movie id"
        });
    }

    if (isNaN(actorId)) {
        return res.status(400).json({
            message: "Invalid actor id"
        });
    }

    try {
        const movieActor = await prisma.movieActor.create({
            data: {
                movieId,
                actorId,
                characterName
            }
        });

        return res.status(201).json({
            message: "Actor added to movie successfully",
            movieActor
        });

    } catch (error) {
        console.log(error);

        if (error.code === "P2003") {
            return res.status(404).json({
                message: "Actor or movie not found"
            });
        }

        if (error.code === "P2002") {
            return res.status(409).json({
                message: "This actor has already been added to this movie"
            });
        }

        return res.status(500).json({
            message: "Something went wrong"
        });
    }
};

export const addDirectorToMovie = async (req, res) => {
    const movieId = Number(req.params.id);
    const directorId = Number(req.body.directorId);
    if (isNaN(movieId)) {
        return res.status(400).json({
            message: "Invalid movie id"
        });
    }
    if (isNaN(directorId)) {
        return res.status(400).json({
            message: "Invalid actor id"
        });
    }
    try {
        const movieDiector = await prisma.movieDirector.create({
            data: {
                movieId,
                directorId,
            }
        })
        res.status(201).json({ message: "Director is added to the movie" });
    } catch (error) {

        if (error.code === "P2003") {
            return res.status(404).json({
                message: "Director or movie not found"
            });
        }

        if (error.code === "P2002") {
            return res.status(409).json({
                message: "This director has already been added to this movie"
            });
        }

        return res.status(500).json({
            message: "Something went wrong"
        });
    }



}