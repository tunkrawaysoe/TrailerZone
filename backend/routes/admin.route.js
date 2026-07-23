import express from "express"
import { getDashBoard } from "../controllers/admin.controller.js";

const router = express.Router();

router.get("/dashboard", getDashBoard)

export default router;