import express from "express";
import { getAllUsers, getProfile } from "../controllers/users.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get('/', getAllUsers);
router.get('/me', authenticate, getProfile);

export default router;