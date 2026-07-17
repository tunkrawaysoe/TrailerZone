import express from "express";
import { addToWatchlist, getWatchlist, removeFromWatchlist } from "../controllers/watchlists.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post('/:movieId', authenticate, addToWatchlist);

router.get('/', authenticate, getWatchlist);

router.delete('/:movieId', authenticate, removeFromWatchlist);

export default router;