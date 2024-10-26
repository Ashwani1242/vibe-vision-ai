import axios from 'axios';
import { Music_Api_Key, Prodia_Api_Key } from '../config.js';

import fs from 'fs';
import { pipeline } from 'stream/promises';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import path from 'path';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import ffmpegPath from 'ffmpeg-static';
import ffmpeg from 'fluent-ffmpeg'
ffmpeg.setFfmpegPath(ffmpegPath);

const fileName = String(Date.now());
let timemark = null;


const audioPath = `uploads/lofi/${fileName}_music.mp3`;
const imagePath = `uploads/lofi/${fileName}_image.png`;
const finalVideoPath = `uploads/lofi/final/${fileName}_video.mp4`;

let songTitle = 'Lofi Music';


export const generateMusic = async (prompt, instrumental) => {

    const musicPrompt = `A calming, cozy Lo-fi track with soft beats, warm piano chords, and a gentle bassline of about less than 1 minute. ${prompt} The music should evoke a peaceful and relaxed atmosphere, perfect for studying, unwinding, or enjoying a quiet evening. Include subtle vinyl crackle sounds for an added vintage vibe, and keep the tempo slow and smooth, with ambient background noises to create a comforting, chill mood.`

    const postData = {
        title: '',
        prompt: musicPrompt,
        gpt_description_prompt: '',
        custom_mode: false,
        make_instrumental: instrumental,
        model: 'chirp-v3.0',
        callback_url: '',
        disable_callback: true,
        token: 'dd3bec30-e8b4-4d53-9f4a-8dde791475cc'  // Add your API token here
    };


    try {
        // Step 1: Generate music and get workId
        const response = await axios.post('https://udioapi.pro/api/generate', postData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const { workId } = response.data;

        if (!workId) {
            throw new Error('No workId returned from the API');
        }

        console.log(`Work ID: ${workId}`);

        // Step 2: Poll for completion
        let isComplete = false;
        let musicData = null;

        while (!isComplete) {
            // Polling every 5 seconds
            console.log('Polling for completion...');
            const pollResponse = await axios.post(`https://udioapi.pro/api/feed?workId=${workId}`);

            const { type, response_data } = pollResponse.data;

            if (type === 'complete') {
                isComplete = true;
                musicData = response_data[0];
                songTitle = response_data[0].title
                console.log('Music generation complete!');
            } else {
                console.log('Still generating music. Waiting...');
                await new Promise((resolve) => setTimeout(resolve, 5000));  // Wait for 5 seconds before polling again
            }
        }

        // Step 3: Download the audio file
        if (musicData) {
            const musicFileUrl = musicData.audio_url;
            const musicResponse = await axios({
                url: musicFileUrl,
                method: 'GET',
                responseType: 'stream',
            });

            const file = fs.createWriteStream(audioPath);
            musicResponse.data.pipe(file);

            return new Promise((resolve, reject) => {
                file.on('finish', () => {
                    console.log(`Audio file saved to ${audioPath}`);
                    resolve(audioPath);
                });
                file.on('error', (error) => {
                    console.error('Error saving audio file:', error);
                    reject(error);
                });
            });
        } else {
            throw new Error('Failed to get audio file URL');
        }

    } catch (error) {
        console.error('Error during music generation:', error);
        throw error;
    }
};

// export const generateMusic = async (prompt) => {
//     const outputFile = `uploads/lofi/${fileName}_music.mp3`;
//     // const outputFile = path.resolve(__dirname, `uploads/lofi/${fileName}_music.mp3`);

//     const requestData = {
//         is_auto: true,
//         prompt,
//         lyrics: '_',
//         title: 'Generated Song',
//         instrumental: 1,
//     };

//     const response = await axios.post('https://api.topmediai.com/v1/music', requestData, {
//         headers: {
//             'x-api-key': '2a711d4296aa469a81e1ec1bc340b888',
//             // 'x-api-key': Music_Api_Key,
//             'Content-Type': 'application/json',
//         },
//     });

//     const musicFile = response.data.data[0].audio_file;
//     console.log("MUSIC URL: ", musicFile)

//     console.log("RESPONSE: \n", response.data.data[0], response.data.data[1])

//     const musicResponse = await axios({
//         url: musicFile,
//         method: 'GET',
//         responseType: 'stream'
//     });

//     console.log("MUSIC RESPONSE: ", musicResponse)

//     if (musicFile) {
//         const file = fs.createWriteStream(outputFile);
//         // await pipeline(musicFile, file);
//         musicResponse.data.pipe(file)
//         console.log(`Audio file written to ${outputFile}`);
//         return outputFile;
//     } else {
//         console.error('Error: No stream returned from Deepgram');
//         throw new Error('Failed to generate audio');
//     }
// };

export const generateImage = async (prompt, width, height, stylePreset) => {
    const imagePrompt = `${prompt}. A cozy, relaxing Lo-fi music thumbnail with different scenes that evoke a calming atmosphere: a sunset, a rainy street, a cozy café, a peaceful bedroom, or a serene nature landscape. Include warm colors, soft lighting, and details like ambient objects (coffee mugs, books, headphones, plants) that reflect a chill, nostalgic vibe. The scene should feel intimate, quiet, and perfect for unwinding.`

    const requestData = {
        model: 'sd_xl_base_1.0.safetensors [be9edd61]',
        prompt: imagePrompt,
        negative_prompt: 'badly drawn',
        style_preset: stylePreset,
        width: width,
        height: height,
    };

    try {
        // Send POST request to start image generation
        const response = await axios.post('https://api.prodia.com/v1/sdxl/generate',
            requestData,
            {
                headers: {
                    accept: 'application/json',
                    'content-type': 'application/json',
                    'X-Prodia-Key': Prodia_Api_Key,
                },
            }
        );

        const jobId = response.data.job;

        console.log("Image generation started. Job ID:", jobId);

        // Polling loop to check for image completion
        let imageUrl;
        while (true) {
            const jobStatus = await axios.get(`https://api.prodia.com/v1/job/${jobId}`, {
                headers: { 'X-Prodia-Key': Prodia_Api_Key },
            });

            if (jobStatus.data.status === 'succeeded') {
                imageUrl = jobStatus.data.imageUrl;
                console.log("Image generation succeeded. Image URL:", imageUrl);
                break;
            }

            // Log the status and wait 5 seconds before polling again
            console.log("Image generation status:", jobStatus.data.status);
            await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait for 5 seconds
        }

        // Ensure the imageUrl is valid before proceeding
        if (!imageUrl || !imageUrl.startsWith('http')) {
            throw new Error(`Invalid image URL: ${imageUrl}`);
        }

        // Log image URL before returning the stream
        console.log("Fetching image stream from:", imageUrl);

        const imageResponse = await axios({
            url: imageUrl,
            method: 'GET',
            responseType: 'stream', // Get the image as a stream
        });

        // Use response.data (which is the stream) in the pipeline
        const imageStream = imageResponse.data;

        // Save the image to a file
        const file = fs.createWriteStream(imagePath);
        await pipeline(imageStream, file); // Use pipelineAsync to handle stream

        console.log(`Image file written to ${imagePath}`);
        return imagePath;

    } catch (error) {
        console.error('Error generating image:', error.message);
        throw new Error('Image generation failed.');
    }
};

// Combine image and audio into video
export const combineImageAndAudioToVideo = (image, audio, width, height,) => {

    return new Promise((resolve, reject) => {

        function onProgress(progress) {
            if (progress.timemark !== timemark) {
                timemark = progress.timemark;
                console.log('Time mark: ' + timemark + "...");
            }
        }

        function onError(err) {
            console.error('Error creating video:', err);
            reject(err);
        }

        function onEnd() {
            console.log('Final video with music created successfully.');

            const responseData = {
                video: finalVideoPath,
                audio: audioPath,
                image: imagePath,
                title: songTitle,
            }

            resolve(responseData)
        }

        ffmpeg()
            .on('end', onEnd)
            .on('progress', onProgress)
            .on('error', onError)
            .input(image)
            .addOptions('-loop', '1')
            .input('uploads/system/logo.png')
            .complexFilter([
                {
                    filter: 'scale',
                    options: { w: width, h: height },
                    inputs: '0:v',
                    outputs: 'background'
                },
                {
                    filter: 'scale',
                    options: { w: 'iw*0.1', h: 'ih*0.1' },
                    inputs: '1:v',
                    outputs: 'logo_scaled'
                },
                {
                    filter: 'colorchannelmixer',
                    options: { aa: 0.7 },
                    inputs: 'logo_scaled',
                    outputs: 'logo_with_opacity'
                },
                {
                    filter: 'overlay',
                    options: { x: 'W-w-10', y: '10' },
                    inputs: ['background', 'logo_with_opacity'],
                    outputs: 'video'
                },
                {
                    filter: 'drawtext',
                    options: {
                        text: songTitle,
                        fontcolor: 'white',
                        fontsize: 48,
                        fontfile: '/path/to/your/font.ttf',
                        x: '(w-text_w)/2',
                        y: 'h-(h/6)',
                        shadowcolor: 'black',
                        shadowx: 2,
                        shadowy: 2,
                        box: 1,
                        boxcolor: 'black@0.2',
                        boxborderw: 20
                    },
                    inputs: 'video',
                    outputs: 'final_video'
                },
            ])
            .input(audio)
            .videoCodec('libx264')
            .audioCodec('aac')
            .addOptions([
                '-map', '[final_video]',
                '-map', '0:v',
                '-map', '2:a',
                '-tune', 'stillimage',
                '-b:a', '192k',
                '-pix_fmt', 'yuv420p',
            ])
            .output(finalVideoPath)
            .run();
    });
};
