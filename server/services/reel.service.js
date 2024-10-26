import { GoogleGenerativeAI } from '@google/generative-ai';
import { createClient } from '@deepgram/sdk';
import fs from 'fs';
import { pipeline } from 'stream/promises';
import dotenv from 'dotenv';

import ffmpegPath from 'ffmpeg-static';
import ffmpeg from 'fluent-ffmpeg'
import { Deepgram_Api_Key, Google_Api_Key } from '../config.js';
ffmpeg.setFfmpegPath(ffmpegPath);
// let command = ffmpeg();
let timemark = null;

dotenv.config();

const genAI = new GoogleGenerativeAI(Google_Api_Key);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

const deepgram = createClient(Deepgram_Api_Key);

function fileToGenerativePart(path, mimeType) {
    return {
        inlineData: {
            data: Buffer.from(fs.readFileSync(path)).toString('base64'),
            mimeType,
        },
    };
}

const systemPrompt = "Forget all the previous instructions. You have to generate an extremely funny Roast about this Image for about 40 words, it should be extremely funny in order to make it viral in social media. If the image is a profile page of some social media, then you have to generate the roast about that, Analyze the Image carefully and generate the roast based on that, if the image is inconceivable or meaningless or distorted, then you have to roast the user who is submitting this image. It is not necessary that the image is definitely social media screenshot, it can be anything, so keep that in mind, there might be some cases that the social media screenshot is not really the user's personal account as well. Remember to only generate the main roast and nothing else"

export async function generateSummary(imageFile) {
    try {
        const prompt = systemPrompt;
        const imagePart = fileToGenerativePart(imageFile.path, imageFile.mimetype);

        const result = await model.generateContent([prompt, imagePart]);
        const summary = result.response.text();
        return summary;
    } catch (error) {
        console.error('Error generating image summary:', error.message);
        throw new Error('Failed to generate image summary');
    }
}

let fileName = ''

export async function generateAudioFromSummary(summaryText) {
    fileName = String(Date.now());

    const outputFile = `uploads/audios/${fileName}_audio.mp3`;

    try {
        const response = await deepgram.speak.request(
            { text: summaryText },
            {
                model: 'aura-asteria-en'
            }
        );

        // console.log(response)

        const stream = await response.getStream();

        if (stream) {
            const file = fs.createWriteStream(outputFile);
            await pipeline(stream, file);
            console.log(`Audio file written to ${outputFile}`);
            console.log(stream, file)
            return outputFile;
        } else {
            console.error('Error: No stream returned from Deepgram');
            throw new Error('Failed to generate audio');
        }
    } catch (error) {
        console.error('Error generating audio:', error);
        throw new Error('Failed to generate audio');
    }
}

function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    const milliseconds = Math.floor((seconds % 1) * 1000);
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}.${String(milliseconds).padStart(3, '0')}`;
}

function generateSrtContent(summaryText) {
    const words = summaryText.split(' ');
    const chunkSize = Number.MAX_VALUE;
    // const chunkSize = Math.random() * (4 - 2) + 2;
    const wordsPerSecond = 3;

    let srtContent = '';
    let startTime = 0;
    let captionIndex = 1;

    for (let i = 0; i < words.length; i += chunkSize) {
        const chunk = words.slice(i, i + chunkSize).join(' ');

        // Calculate duration based on the number of words
        const duration = chunk.split(' ').length / wordsPerSecond;
        const endTime = startTime + duration;

        srtContent += `${captionIndex}\n`;
        srtContent += `${formatTime(startTime)} --> ${formatTime(endTime)}\n`;
        srtContent += `${chunk}\n\n`;

        captionIndex++;
        startTime = endTime + 0.1; // Adding a small gap before the next subtitle
    }

    return srtContent;
}

function saveSrtFile(srtContent, outputPath) {
    fs.writeFileSync(outputPath, srtContent, 'utf-8');
    console.log(`SRT file written to ${outputPath}`);
}


export async function combineImageAndAudio(imageFile, audioFile, summaryText) {
    const finalOutputFilePath = `uploads/videos/final/${fileName}_video.mp4`;
    const captionFilePath = `uploads/captions/${fileName}_caption.srt`;
    const tempVideoPath = `uploads/videos/temp/${fileName}_temp.mp4`;
    const splashScreen = 'uploads/system/splashscreen.mp4';

    try {
        const srtContent = generateSrtContent(summaryText);
        saveSrtFile(srtContent, captionFilePath);

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
                console.log('Final video with subtitles created successfully. Now concatenating...');

                concatenateVideos(tempVideoPath, splashScreen, finalOutputFilePath)
                    .then(resolve)
                    .catch(reject);
            }

            ffmpeg()
                .on('end', onEnd)
                .on('progress', onProgress)
                .on('error', onError)
                .input('uploads/system/background.jpg')
                .input(imageFile)
                .input('uploads/system/logo.png')
                // .input(captionFilePath)
                .complexFilter([
                    {
                        filter: 'scale',
                        options: { w: 1080, h: 1920 },
                        inputs: '0:v',
                        outputs: 'background'
                    },
                    {
                        filter: 'scale',
                        options: { w: 'min(1080,iw)', h: 'min(1920,ih)', force_original_aspect_ratio: 'decrease' },
                        inputs: '1:v',
                        outputs: 'user_image'
                    },
                    {
                        filter: 'overlay',
                        options: { x: '(W-w)/2', y: '(H-h)/4' },
                        inputs: ['background', 'user_image'],
                        outputs: 'combined_with_user'
                    },
                    {
                        filter: 'subtitles',
                        options: `filename=${captionFilePath}:force_style='Fontsize=8,OutlineColour=&H30000000,BorderStyle=3,Shadow=1,PrimaryColour=&HFFFFFF,SecondaryColour=&HFFFFFF,Alignment=2'`,
                        inputs: 'combined_with_user',
                        outputs: 'video_with_subtitles'
                    },
                    {
                        filter: 'scale',
                        options: { w: 'iw*0.1', h: 'ih*0.1' },
                        inputs: '2:v',
                        outputs: 'logo_scaled'
                    },
                    {
                        filter: 'colorchannelmixer',
                        options: { aa: 0.5 },
                        inputs: 'logo_scaled',
                        outputs: 'logo_with_opacity'
                    },
                    {
                        filter: 'overlay',
                        options: { x: 'W-w-10', y: '10' },
                        inputs: ['video_with_subtitles', 'logo_with_opacity'],
                        outputs: 'final_video'
                    },
                ])
                .input(audioFile)
                .videoCodec('libx264')
                .audioCodec('aac')
                .addOptions([
                    // '-c:s', 'mov_text',
                    '-tune', 'stillimage',
                    // '-shortest',
                    '-map', '[final_video]',
                    '-map', '0:v',
                    '-map', '3:a',
                    '-b:a', '192k',
                    '-pix_fmt', 'yuv420p'
                    // '-metadata:s:s:0', 'language=eng',
                    // '-r', '24'
                ])
                .output(tempVideoPath)
                .run();
        });
    } catch (error) {
        console.error('Error adding captions:', error);
        throw new Error('Failed to add captions to video');
    }
}



function concatenateVideos(video1Path, video2Path, outputPath) {
    const introVideo = 'uploads/system/intro.mp4'
    return new Promise((resolve, reject) => {
        const fileListPath = 'file_list.txt';
        // const fileListContent = `file '${introVideo}'\nfile '${video1Path}'\nfile '${video2Path}'`;
        const fileListContent = `file '${video1Path}'\nfile '${video2Path}'`;

        fs.writeFileSync(fileListPath, fileListContent, 'utf-8');

        ffmpeg()
            .input(fileListPath)
            .inputOptions('-f', 'concat')
            .inputOptions('-safe', '0')
            // .outputOptions('-c', 'copy')
            .outputOptions('-movflags', '+faststart') // Fast start for mobile compatibility
            .videoCodec('libx264')
            .audioCodec('aac')                  
            .format('mp4')   
            // .outputOptions('-preset', 'medium')
            .outputOptions('-preset', 'medium') // Slower preset for better compression
            .outputOptions('-crf', '23')  // Constant Rate Factor (CRF) controls quality (lower = better)
            .outputOptions('-b:v', '5000k')  // Set video bitrate for 1080p (5000 kbps)
            .outputOptions('-b:a', '128k')   // Set audio bitrate (128 kbps for AAC)
            .outputOptions('-pix_fmt', 'yuv420p') // Ensure playback on older players
            .outputOptions('-vf', 'scale=1080:1920')
            // .outputOptions('-map', '0:v:0')   // Map all video streams
            // .outputOptions('-map', '0:a:0') // Scale video to 1080x1920 (portrait mode)
            // .outputOptions('-shortest')
            // .outputOptions('-sseof', '-20')
            // .outputOptions('-vf', `filename=${captionFilePath}:force_style='Fontsize=8,OutlineColour=&H30000000,BorderStyle=3,Shadow=1,PrimaryColour=&HFFFFFF,SecondaryColour=&HFFFFFF,Alignment=2'`) 
            .on('start', () => {
                console.log('Starting high-quality video concatenation...');
            })
            .on('progress', (progress) => {
                console.log(`Processing: ${progress.percent}% done`);
            })
            .on('end', () => {
                console.log('Videos concatenated successfully.');
                fs.unlinkSync(fileListPath); // Clean up temporary file list
                resolve(outputPath);
            })
            .on('error', (err) => {
                console.error('Error during concatenation:', err);
                fs.unlinkSync(fileListPath); // Clean up on error
                reject(new Error('Failed to concatenate videos'));
            })
            .output(outputPath)
            .run();
    });
}












