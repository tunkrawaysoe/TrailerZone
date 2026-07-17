import { join } from "@prisma/client/runtime/library";
import prisma from "../lib/prisma.js";
import redis from "../lib/redis.js"
import { getMovieRedisKey } from "../lib/ulti.js";
import { configDotenv } from "dotenv";
import { json } from "express";

export const getAllMovies = async (req, res) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const genreId = Number(req.query.genreId);
    const search = req.query.search || "";
    const sort = req.query.sort || "latest";

    const where = {};

    if (!isNaN(genreId)) {
        where.movieGenres = {
            some: {
                genreId,
            },
        };
    }

    if (search) {
        where.title = {
            contains: search,
            mode: "insensitive",
        };
    }

    let orderBy = { releaseDate: "desc" };

    switch (sort) {
        case "oldest":
            orderBy = { releaseDate: "asc" };
            break;

        case "title":
            orderBy = { title: "asc" };
            break;

        case "latest":
        default:
            orderBy = { releaseDate: "desc" };
    }

    const movieKey = getMovieRedisKey(
        page,
        limit,
        genreId,
        search,
        sort
    );

    try {
        const cacheMovies = await redis.get(movieKey);

        if (cacheMovies) {
            console.log("cache hit");
            return res.status(200).json(JSON.parse(cacheMovies));
        }

        const totalMovies = await prisma.movie.count({
            where,
        });

        const movies = await prisma.movie.findMany({
            where,
            orderBy,
            skip: (page - 1) * limit,
            take: limit,
            include: {
                movieGenres: {
                    include: {
                        genre: true,
                    },
                },
            },
        });

        const formattedMovies = movies.map(mv => (
            {
                ...mv,
                movieGenres: mv.movieGenres.map(mg => mg.genre.name)
            }
        ));
        const totalPages = Math.ceil(totalMovies / limit);

        const data = {
            page,
            limit,
            movies: formattedMovies,
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
        const key = await redis.keys("movies:*")
        await redis.del(key);

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

export const getMovie = async (req, res) => {
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
                },
                movieActors: {
                    select: {
                        characterName: true,
                        actor: {
                            select: {
                                id: true,
                                name: true,
                                profileImage: true
                            }
                        }
                    }
                },
                movieDirectors: {
                    select: {
                        director: {
                            select: {
                                id: true,
                                name: true
                            }
                        }
                    }
                }
            }
        });


        if (!movie) {
            return res.status(404).json({
                message: "Movie not found"
            });
        }
        const { movieActors, movieGenres, movieDirectors, ...movieData } = movie;

        const formattedGenres = movie.movieGenres.map(mg => mg.genre.name);
        const formattedActor = movie.movieActors.map(ma => {
            return {
                id: ma.actor.id,
                name: ma.actor.name,
                profileImage: ma.actor.profileImage,
                characterName: ma.characterName,
            }
        })
        const formattedDirector = movie.movieDirectors.map(md => {
            return {
                id: md.director.id,
                name: md.director.name
            }
        })

        return res.status(200).json({
            ...movieData,
            genres: formattedGenres,
            actors: formattedActor,
            directors: formattedDirector
        })

    } catch (err) {
        console.error(err);

        return res.status(500).json({
            message: "Something went wrong"
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

export const reviewMovie = async (req, res) => {
    const movieId = Number(req.params.movieId);
    const userId = req.user.id;
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
        console.log(error)
        if (error.code === 'P2002') {
            return res.status(400).json({
                message: "You already reviewed this movie"
            });
        }
        if (error.code === 'P2003') {
            return res.status(400).json({
                message: "Movie or user not found"
            });
        }

        return res.status(500).json({
            message: "Something went wrong"
        });
    }
};

export const updateReview = async (req, res) => {
    const reviewId = Number(req.params.id);
    const { rating, comment } = req.body

    if (isNaN(reviewId)) {
        return res.status(400).json({
            message: "Invalid review id"
        });
    }
    try {
        const updatedReview = await prisma.review.update({
            where: {
                id: reviewId
            },
            data: {
                ...(rating !== undefined && { rating }),
                ...(comment !== undefined && { comment })
            }

        })
        return res.status(200).json({
            message: "Review updated successfully",
            review: updatedReview
        });
    } catch (error) {
        if (error.code === "P2025") {
            return res.status(404).json({
                message: "Review not found"
            });
        }

        return res.status(500).json({
            message: "Something went wrong"
        });
    }
};

export const deleteReview = async (req, res) => {
    const reviewId = Number(req.params.id);

    try {
        await prisma.review.delete({
            where: {
                id: reviewId
            }
        });

        return res.status(200).json({
            message: "Review deleted successfully"
        });

    } catch (error) {

        return res.status(500).json({
            message: "Something went wrong"
        });
    }
};

export const getMovieReviews = async (req, res) => {
    const movieId = Number(req.params.movieId);
    const userId = req.user?.id;
    if (isNaN(movieId)) {
        return res.status(400).json({
            message: "Invalid movie id"
        });
    }

    try {
        const reviews = await prisma.review.findMany({
            where: {
                movieId
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        profilePicture: true
                    }
                }
            },
            orderBy: {
                createdAt: "desc"
            }
        });
        const userReviewed = await prisma.review.findUnique({
            where: {
                userId_movieId: {
                    userId,
                    movieId
                }
            }
        })

        return res.status(200).json({
            reviews,
            userReviewed: Boolean(userReviewed)
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Something went wrong"
        });
    }
}

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

export const getMovieTrailers = async (req, res) => {
    const movieId = Number(req.params.movieId);

    if (isNaN(movieId)) {
        return res.status(400).json({
            message: "Invalid movie id"
        });
    }

    try {
        const trailers = await prisma.trailer.findMany({
            where: {
                movieId,
            },
        });

        return res.status(200).json(trailers);

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Something went wrong",
        });
    }
};

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

export const getTopRatedMovies = async (req, res) => {
    try {
        const topRatedMovies = await prisma.review.groupBy({
            by: ["movieId"],
            _avg: {
                rating: true
            },
            _count: {
                id: true
            },
            orderBy: {
                _avg: {
                    rating: "desc"
                }
            },
            take: 15
        });

        const movieIds = topRatedMovies.map(({ movieId }) => movieId);

        const movies = await prisma.movie.findMany({
            where: {
                id: {
                    in: movieIds
                }
            }
        })

        return res.status(200).json(movies);

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Something went wrong"
        });
    }
};

export const getSimilarMovies = async (req, res) => {
    const movieId = Number(req.params.id);

    if (isNaN(movieId)) {
        return res.status(400).json({
            message: "Invalid movie id"
        });
    }

    try {
        const movieGenre = await prisma.movie.findUnique({
            where: {
                id: movieId
            },
            select: {
                movieGenres: {
                    select: {
                        genre: {
                            select: {
                                id: true
                            }
                        }
                    }
                }
            }
        });

        if (!movieGenre) {
            return res.status(404).json({
                message: "Movie not found"
            });
        }

        const genreIds = movieGenre.movieGenres.map(g => g.genre.id);

        const movies = await prisma.movie.findMany({
            where: {
                id: {
                    not: movieId
                },
                movieGenres: {
                    some: {
                        genreId: {
                            in: genreIds
                        }
                    }
                }
            },
            select: {
                id: true,
                title: true,
                releaseDate: true,
                posterUrl: true
            }
        });

        return res.status(200).json(movies);

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Something went wrong"
        });
    }
};

export const getPopularMovies = async (req, res) => {
    try {
        const movies = await prisma.movie.findMany({
            select: {
                id: true,
                title: true,
                releaseDate: true,
                posterUrl: true,
                reviews: {
                    select: {
                        rating: true
                    }
                },
                watchlists: {
                    select: {
                        userId: true
                    }
                }
            }
        })
        const popularMovies = movies.map(({ reviews, watchlists, ...movieData }) => {
            const totalReviews = reviews.length;
            const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
            const averageRating = totalReviews === 0 ? 0 : (totalRating / totalReviews);
            const totalWatchLists = watchlists.length;

            const popularityScore =
                (totalReviews * 0.5) +
                (averageRating * 10) +
                (totalWatchLists * 0.3);

            return {
                ...movieData,
                popularityScore
            }
        }).sort((a, b) => b.popularityScore - a.popularityScore);
        res.status(200).json(popularMovies);
    } catch (error) {
        console.log(error)
    }

}

export const getMovieStatus = async (req, res) => {
    const movieId = Number(req.params.id);

    if (isNaN(movieId)) {
        return res.status(400).json({
            message: "Invalid movie id"
        });
    }
    try {
        const watchlistCount = await prisma.watchlist.count({
            where: {
                movieId,
            }
        });
        const actorCount = await prisma.movieActor.count({
            where: {
                movieId
            }
        });
        const directorCount = await prisma.movieDirector.count({
            where: {
                movieId
            }
        });

        const movieReviews = await prisma.review.aggregate({
            where: {
                movieId
            },
            _avg: {
                rating: true,
            },
            _count: {
                id: true
            }

        });
        const averageRating = movieReviews._avg.rating;
        const totalReviews = movieReviews._count.id;

        res.status(200).json({
            averageRating,
            totalReviews,
            watchlistCount,
            actorCount,
            directorCount
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Something went wrong" });
    }
}