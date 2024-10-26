import axios from 'axios';

export const generateVideo = async (req, res) => {
    const { prompt, model, width, height, motion, seed, callbackUrl, time } = req.body;

    try {
        const textPrompt = `Cinematic, creative, engaging, and concise comedy show. An ${prompt}, with a light tone, should be entertaining from start to finish`;

        const options = {
            method: 'POST',
            url: 'https://api.aivideoapi.com/runway/generate/text',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                Authorization: process.env.RUNWAY_API_KEY,  
            },
            data: {
                text_prompt: textPrompt,
                model,
                width,
                height,
                motion,
                seed,
                callback_url: callbackUrl,
                time
            },
        };

        const response = await axios.request(options);
        const { uuid } = response.data;
        return res.status(200).json({ uuid, message: 'Video generation initiated.' });
    } catch (error) {
        console.error('Error initiating video generation:', error);
        return res.status(500).json({ error: 'Failed to initiate video generation.' });
    }
};

export const checkVideoStatus = async (req, res) => {
    const { uuid } = req.params;
    try {
        const options = {
            method: 'GET',
            url: `https://api.aivideoapi.com/status?uuid=${uuid}`,  
            headers: {
                accept: 'application/json',
                Authorization: process.env.RUNWAY_API_KEY,  
            },
        };
        const response = await axios.request(options);
        return res.status(200).json(response.data);
    } catch (error) {
        console.error('Error checking video status:', error);
        return res.status(500).json({ error: 'Failed to check video status.' });
    }
};

