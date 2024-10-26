import axios from 'axios';
import { Music_Api_Key } from '../config.js';

export const generateMusic = async (req, res) => {
    const { title, prompt, instrumental } = req.body;

    let musicUrl = ''
    let imageUrl = ''
    let lyrics = ''
    let songTitle = ''

    console.log("Received request to generate music:", {
        title,
        prompt,
        instrumental,
    });

    const postData = {
        title: title,
        prompt: prompt,
        gpt_description_prompt: '',
        custom_mode: false,
        make_instrumental: instrumental,
        model: 'chirp-v3.0',
        callback_url: '',
        disable_callback: true,
        token: 'dd3bec30-e8b4-4d53-9f4a-8dde791475cc'
    };


    try {
        console.log("Sending request to music generation API with data:", postData);

        const response = await axios.post(
            'https://udioapi.pro/api/generate',
            postData,
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        const { workId } = response.data;

        if (!workId) {
            throw new Error('No workId returned from the API');
        }

        console.log(`Work ID: ${workId}`);

        let isComplete = false;

        console.log("Received response from music generation API:", response.data);

        while (!isComplete) {
            console.log('Polling for completion...');
            const pollResponse = await axios.post(`https://udioapi.pro/api/feed?workId=${workId}`);

            const { type, response_data } = pollResponse.data;

            if (type === 'complete') {
                isComplete = true;

                musicUrl = response_data[0].audio_url;
                imageUrl = response_data[0].image_url;
                lyrics = response_data[0].prompt;
                songTitle = response_data[0].title

                console.log('Music generation complete!');
            } else {
                console.log('Still generating music. Waiting...');
                await new Promise((resolve) => setTimeout(resolve, 10000));  // Wait for 5 seconds before polling again
            }
        }

        res.status(200).json({
            message: 'Music generated successfully!',
            musicUrl,
            imageUrl,
            lyrics,
            songTitle
        });
    } catch (error) {
        console.error('Error generating music:', error);

        if (error.response) {
            console.error('API Response Error:', error.response.data);
            return res.status(error.response.status || 500).json({
                message: 'Failed to generate music. Please try again.',
                error: error.response.data,
            });
        } else {
            return res.status(500).json({ message: 'Failed to generate music. Please try again.', error });
        }
    }
};
