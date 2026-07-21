import express from "express";
import { getAllUsers, getProfile, updateProfile } from "../controllers/users.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get('/', getAllUsers);
router.get('/me', authenticate, getProfile);
router.patch('/me', authenticate, updateProfile)

export default router;