import express from "express";
import { createMovie, getAllMovies, getMovie, updateMovie ,deleteMovie,reviewMovie} from "../controllers/movies.controller.js";

const router = express.Router();

router.get("/", getAllMovies);

router.post("/", createMovie);

router.get("/:id", getMovie);

router.patch("/:id", updateMovie);

router.delete("/:id", deleteMovie);

router.post('/:movieId/reviews', reviewMovie);

export default router;