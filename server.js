import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cookieParser from "cookie-parser";
import authRoutes from './routes/auth.route.js'
import userRoutes from './routes/user.route.js'
import movieRoutes from './routes/movie.route.js'
import watchlistRoutes from './routes/watchlist.route.js'
import trailerRoutes from './routes/trailer.route.js'
import actorRoutes from './routes/actors.route.js'
import directorRoutes from './routes/directors.route.js'
import { verifyToken } from "./middlewares/auth.middleware.js";

const app = express();

app.use(cookieParser());
app.use(express.json());

const PORT = process.env.PORT || 3000;
app.get('/', (req, res) => {
    res.status(200).json({
        message: "This is auth server"
    })
})

app.use('/users', userRoutes);
app.use('/auth', authRoutes);
app.use('/movies', movieRoutes);
app.use('/watchlist', watchlistRoutes);
app.use('/trailer', trailerRoutes);
app.use('/actors', actorRoutes);
app.use('/directors',directorRoutes);

app.listen(PORT, () => {
    console.log("Server is running at", PORT);
})
