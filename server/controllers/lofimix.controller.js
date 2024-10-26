import { generateImage, generateMusic, combineImageAndAudioToVideo } from '../services/lofimix.service.js';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const generateMedia = async (req, res) => {
    const { prompt, width, height, stylePreset, instrumental } = req.body;

    console.log(req.body)

    try {
        const [imageFile, audioFile] = await Promise.all([
            generateImage(prompt, width, height, stylePreset),
            generateMusic(prompt, instrumental),
        ]);

        const response = await combineImageAndAudioToVideo(imageFile, audioFile, width, height)

        console.log(response)
        console.log(response.video)
        console.log(response.audio)
        console.log(response.image)

        res.status(200).json({
            message: 'Media generated and combined successfully!',
            videoUrl: response.video,
            audioUrl: response.audio,
            imageUrl: response.image,
            title: response.title
        });
    } catch (error) {
        console.error('Error generating media:', error);
        res.status(500).json({ message: 'Failed to generate media.', error });
    }
};
