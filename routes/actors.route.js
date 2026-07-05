import express from "express";
import { createActor, deleteActor, getActor, getActors, updateActor } from "../controllers/actors.controller.js";

const router = express.Router();

router.get('/', getActors);

router.post('/', createActor);

router.get('/:id', getActor)

router.patch('/:id', updateActor)

router.delete('/:id', deleteActor)

export default router;



