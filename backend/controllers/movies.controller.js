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

        let userReviewed = false;

        if (userId) {
            const review = await prisma.review.findUnique({
                where: {
                    userId_movieId: {
                        userId,
                        movieId
                    }
                }
            })

            userReviewed = Boolean(review)
        }

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