import express from "express";
import { addToWatchlist, getWatchlist, removeFromWatchlist } from "../controllers/watchlists.controller.js";

const router = express.Router();

router.post('/:movieId', addToWatchlist);

router.get('/', getWatchlist);

router.delete('/:movieId', removeFromWatchlist);

export default router;