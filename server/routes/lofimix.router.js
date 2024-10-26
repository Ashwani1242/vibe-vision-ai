import express from 'express';
import { generateMedia } from '../controllers/lofimix.controller.js';

const lofiMixRoute = express.Router();

// Route to handle media generation
lofiMixRoute.post('/generate-media', generateMedia);

export default lofiMixRoute;
