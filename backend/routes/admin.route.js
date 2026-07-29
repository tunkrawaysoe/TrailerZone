import express from "express"
import { addActorToMovie, addDirectorToMovie, createMovie, createTrailer, deleteMovie, deleteUser, getAllUsers, getDashBoard, updateMovie } from "../controllers/admin.controller.js";

const router = express.Router();


router.get("/dashboard", getDashBoard)
router.post("/movies", createMovie);
router.patch("/movies/:id", updateMovie);
router.delete("/movies/:id", deleteMovie);
router.post('movies/:movieId/trailer', createTrailer);
router.post('/:movieId/actor', addActorToMovie);
router.post('/:id/director', addDirectorToMovie);
router.get('/users', getAllUsers)
router.delete('/users/:id', deleteUser)
export default router;