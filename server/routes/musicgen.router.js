import express from 'express';
import { generateMusic } from '../controllers/musicgen.controller.js';

const musicRoute = express.Router();

musicRoute.post('/generate', generateMusic);

export default musicRoute;
