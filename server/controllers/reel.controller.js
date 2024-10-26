// import { generateSummary } from "../services/reel.service.js";

// export async function generateSummaryController(req, res) {
//   try {
//     const summary = await generateSummary(req.file);
//     res.status(200).json({ summary });
//   } catch (error) {
//     console.error('Error generating summary:', error);
//     res.status(500).json({ error: 'Failed to generate summary' });
//   }
// }



// import { generateSummary, convertTextToSpeech } from "../services/reel.service.js";

// export async function generateSummaryController(req, res) {
//   try {
//     // Generate the summary
//     const summary = await generateSummary(req.file);
//     // Convert the summary to speech
//     const audioFilePath = await convertTextToSpeech(summary);
//     console.log("SUMMMMMMMMMMMMMM: ", audioFilePath)
//     // Send the summary and audio file path
//     res.status(200).json({ summary, audioFile: audioFilePath });
//   } catch (error) {
//     console.error('Error generating summary or audio:', error);
//     res.status(500).json({ error: 'Failed to generate summary or audio' });
//   }
// }

import { generateSummary, generateAudioFromSummary, combineImageAndAudio } from '../services/reel.service.js';

export async function generateSummaryController(req, res) {
  try {
    // Generate image summary
    const summary = await generateSummary(req.file);

    // Convert summary to audio
    const audioFile = await generateAudioFromSummary(summary);

    // Combine image and audio into a video
    const videoFile = await combineImageAndAudio(req.file.path, audioFile, summary);

    // Send the summary, audio, and video file path back to the frontend
    res.status(200).json({ summary, audio: audioFile, video: videoFile });
  } catch (error) {
    console.error('Error generating summary, audio, or video:', error);
    res.status(500).json({ error: 'Failed to generate summary, audio, or video' });
  }
}

