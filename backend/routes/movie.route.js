import express from "express";
import { getAllMovies, getMovie, reviewMovie, updateReview, deleteReview, getMovieReviews, getMovieTrailers, getTopRatedMovies, getSimilarMovies, getPopularMovies, getMovieStatus, } from "../controllers/movies.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { ownsReview } from "../middlewares/ownsReview.middleware.js";
import { optionalAuthenticate } from "../middlewares/optional.auth.middleware.js";

const router = express.Router();

router.get("/", getAllMovies);
router.get("/top-rated", getTopRatedMovies);
router.get("/popular", getPopularMovies);
router.get("/:id", getMovie);
router.post('/:movieId/reviews', authenticate, reviewMovie);
router.get('/:movieId/reviews', optionalAuthenticate, getMovieReviews);
router.get('/:movieId/trailer', getMovieTrailers);
router.get('/:id/similar', getSimilarMovies);
router.get('/:id/status', getMovieStatus);

router.patch('/review/:id', authenticate, ownsReview, updateReview);
router.delete('/review/:id', authenticate, ownsReview, deleteReview);

export default router;