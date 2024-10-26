
import ffmpegPath from 'ffmpeg-static';
import ffmpeg from 'fluent-ffmpeg'
ffmpeg.setFfmpegPath(ffmpegPath);

export const combineImageAndAudioToVideo = (imagePath, audioPath) => {
    const outputVideoPath = `uploads/lofi/final/final_video.mp4`;
    let timemark = null;
    const text = 'LO-FI Video'

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
            resolve(outputVideoPath)
        }

        ffmpeg()
            .on('end', onEnd)
            .on('progress', onProgress)
            .on('error', onError)
            .input(imagePath)
            .addOptions('-loop', '1')
            .input('uploads/system/logo.png')
            .complexFilter([
                {
                    filter: 'scale',
                    options: { w: 1024, h: 1024 },
                    inputs: '0:v',
                    outputs: 'background'
                },
                {
                    filter: 'scale',
                    options: { w: 'iw*0.1', h: 'ih*0.1' },
                    inputs: '1:v',
                    outputs: 'logo_scaled'
                },
                // Adjust the opacity of the scaled watermark
                {
                    filter: 'colorchannelmixer',
                    options: { aa: 0.7 },
                    inputs: 'logo_scaled',
                    outputs: 'logo_with_opacity'
                },
                // Overlay the watermark on top of the video
                {
                    filter: 'overlay',
                    options: { x: 'W-w-10', y: '10' },
                    inputs: ['background', 'logo_with_opacity'],
                    outputs: 'video'
                },
                {
                    filter: 'drawtext',
                    options: {
                        text: text,
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
            .input(audioPath)
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
            .output(outputVideoPath)
            .run();
    });
};

const videoFile = await combineImageAndAudioToVideo('uploads/lofi/1728912425364_image.png', 'uploads/lofi/1728912419633_music.mp3')

console.log(videoFile)
