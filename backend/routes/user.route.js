import express from "express";
import { getProfile, updateProfile } from "../controllers/users.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import authorize from "../middlewares/checkRoles.middleware.js";
import ROLES from "../lib/userRoles.js";

const router = express.Router();

router.get('/me', authenticate, authorize(ROLES.USER), getProfile);
router.patch('/me', authenticate, updateProfile)

export default router;