import express from 'express';
import { checkVideoStatus, generateVideo } from '../controllers/runwayvideogen.controller.js';

const videoGenRoute = express.Router();

videoGenRoute.post('/generate', generateVideo);
videoGenRoute.get('/status/:uuid', checkVideoStatus);

export default videoGenRoute;
