import express from "express";
import { createMovie, getAllMovies, getMovie, updateMovie, deleteMovie, reviewMovie, updateReview, deleteReview, getMovieReviews } from "../controllers/movies.controller.js";

const router = express.Router();

router.get("/", getAllMovies);

router.post("/", createMovie);

router.get("/:id", getMovie);

router.patch("/:id", updateMovie);

router.delete("/:id", deleteMovie);

router.post('/:movieId/reviews', reviewMovie);

router.get('/:movieId/reviews', getMovieReviews)

router.patch('/review/:id', updateReview);

router.delete('/review/:id', deleteReview)



export default router;