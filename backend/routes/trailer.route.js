import express from 'express';
import { deleteTrailer, updateTrailer } from '../controllers/trailer.controller.js';

const router = express.Router();

router.delete('/:id', deleteTrailer);
router.patch('/:id', updateTrailer);

export default router;