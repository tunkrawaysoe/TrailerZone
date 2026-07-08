import express from "express";
import { createMovie, getAllMovies, getMovie, updateMovie, deleteMovie, reviewMovie, updateReview, deleteReview, getMovieReviews, createTrailer, getMovieTrailers, addActorToMovie, addDirectorToMovie, getTopRatedMovies, getSimilarMovies, getPopularMovies, getMovieStatus, } from "../controllers/movies.controller.js";

const router = express.Router();

router.get("/", getAllMovies);

router.post("/", createMovie);

router.get("/top-rated", getTopRatedMovies);

router.get("/popular", getPopularMovies);

router.get("/:id", getMovie);

router.patch("/:id", updateMovie);

router.delete("/:id", deleteMovie);

router.post('/:movieId/reviews', reviewMovie);

router.get('/:movieId/reviews', getMovieReviews);

router.patch('/review/:id', updateReview);

router.delete('/review/:id', deleteReview);

router.post('/:movieId/trailer', createTrailer);

router.get('/:movieId/trailer', getMovieTrailers);

router.post('/:movieId/actor', addActorToMovie);

router.post('/:id/director', addDirectorToMovie);

router.get('/:id/similar', getSimilarMovies);

router.get('/:id/status', getMovieStatus);

export default router;