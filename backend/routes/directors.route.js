import express from 'express';
import { createDirector, deleteDirector, getDirector, getDirectors, updateDirector } from '../controllers/directors.controller.js';

const router = express.Router();

router.get('/', getDirectors);

router.get('/:id', getDirector);

router.post('/', createDirector);

router.patch('/:id', updateDirector);

router.delete('/:id', deleteDirector);

export default router;