import express from 'express';
import multer from 'multer';

const reelGenRoute = express.Router();
import { generateSummaryController } from '../controllers/reel.controller.js';

const upload = multer({ dest: 'uploads/' });

reelGenRoute.post('/generate-summary', upload.single('image'), generateSummaryController);


export default reelGenRoute;
