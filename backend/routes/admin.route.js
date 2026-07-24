import express from "express"
import { getDashBoard } from "../controllers/admin.controller.js";
import { createMovie, deleteMovie, updateMovie } from "../controllers/movies.controller.js";

const router = express.Router();

router.get("/dashboard", getDashBoard)

router.post("/movies", createMovie);

router.patch("/movies/:id", updateMovie);

router.delete("movies/:id", deleteMovie);

export default router;