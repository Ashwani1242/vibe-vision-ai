import React, { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../../../config';
import MusicPlayer from '../../utils/MusicPlayer';
import PrimaryButton from '../../utils/PrimaryButton';
import Loader from '../../../icons/Loader';
import Instrument from '../../../icons/Instrument';
import { webData } from '../../../data/db';
import CardCarousel from '../../utils/CardCarousel';
import GallerySection from '../home/GallerySection';

const LofiMix: React.FC = () => {
    const [prompt, setPrompt] = useState<string>('');
    const [videoUrl, setVideoUrl] = useState<string | null>(null);
    const [audioUrl, setAudioUrl] = useState<string | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [title, setTitle] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [instrumental, setInstrumental] = useState<boolean>(true);

    const [width, setWidth] = useState<number>(1024); // Default width
    const [height, setHeight] = useState<number>(576); // Default height
    const [stylePreset, setStylePreset] = useState<string>('anime'); // Default style preset

    // Function to fetch and save media file to client-side
    const saveMediaFile = async (url: string, type: string): Promise<string> => {
        try {
            const response = await axios.get(url, {
                responseType: 'blob',
                headers: {
                    'ngrok-skip-browser-warning': '1', // Header for bypassing browser warning
                }
            });
            const blob = new Blob([response.data], { type });
            return URL.createObjectURL(blob);  // Create a local URL for the blob
        } catch (err) {
            console.error(`Failed to save ${type}:`, err);
            throw err;
        }
    };

    const handleGenerateMedia = async () => {
        setLoading(true);
        setError(null);
        setVideoUrl(null);
        setAudioUrl(null);
        setImageUrl(null);

        try {
            // Send the prompt, width, height, and stylePreset to the backend
            const data = { prompt, width, height, stylePreset, instrumental }
            console.log(data)
            const response = await axios.post(
                `${BASE_URL}/api/lofi-mix/generate-media`,
                data,
                {
                    headers: {
                        'ngrok-skip-browser-warning': '1',
                    },
                }
            );


            // Save video, audio, and image to client-side
            const savedVideoUrl = await saveMediaFile(`${BASE_URL}/${response.data.videoUrl}`, 'video/mp4');
            const savedAudioUrl = await saveMediaFile(`${BASE_URL}/${response.data.audioUrl}`, 'audio/mpeg');
            const savedImageUrl = await saveMediaFile(`${BASE_URL}/${response.data.imageUrl}`, 'image/jpeg');

            // Set the local URLs to state to display in the frontend
            setVideoUrl(savedVideoUrl);
            setAudioUrl(savedAudioUrl);
            setImageUrl(savedImageUrl);
            setTitle(`${response.data.title}`)
        } catch (err) {
            setError('Failed to generate media.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="p-4 gap-x-8 flex flex-col lg:flex-row justify-center items-center lg:items-start relative w-full mb-12">
                <div className="max-w-md p-4 flex flex-col w-full bg-white/ /text-black shadow-md rounded-lg">
                    <h2 className="text-2xl font-bold bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent mb-4"> Generate Relaxing Lofi Music videos for you! </h2>

                    {/* Prompt Input */}
                    <div className="max-w-md mx-auto mt-8 overflow-hidden/ md:max-w-xl w-full h-[100px] min-h-[100px] relative p-[1px] bg-gradient-to-br from-red-400 via-indigo-400 to-purple-400 rounded-sm">
                        <textarea
                            value={prompt}
                            required
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder="Enter a prompt for Lofi generation"
                            className="border/ outline-none p-2 h-full w-full resize-none rounded-sm bg-neutral-900"
                        />
                    </div>

                    {/* <div className="flex items-center mt-6">
                    <input
                        type="checkbox"
                        checked={instrumental}
                        onChange={() => setInstrumental(!instrumental)}
                        className="mr-2"
                    />
                    <label>Is Instrumental?</label>
                </div> */}

                    <div className="flex items-center mt-6">
                        <label
                            className={`p-[1px] rounded-lg transition-all duration-200 ${instrumental
                                ? 'bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500'
                                : 'bg-neutral-900'
                                }`}
                        >
                            <div className='bg-neutral-900 rounded-lg text-gray-500'>
                                <input
                                    type="checkbox"
                                    className="h-[1px] opacity-0 overflow-hidden absolute whitespace-nowrap w-[1px] peer"
                                    checked={instrumental}
                                    onChange={() => setInstrumental(!instrumental)}
                                />
                                <span
                                    className="peer-checked:bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 bg-clip-text peer-checked:shadow-blue-400/10 peer-checked:text-indigo-400 peer-checked:before:border-none peer-checked:before:bg-gradient-to-br peer-checked:before:opacity-100 peer-checked:before:scale-100 peer-checked:before:content-['✔'] flex flex-col items-center justify-center w-28 min-h-[7rem] rounded-lg shadow-lg transition-all duration-300 bg-white cursor-pointer relative before:absolute before:w-5 before:h-5 before:border-[2px] before:border-gray-500 before:rounded-full before:top-1 before:left-1 before:opacity-0 before:transition-all before:scale-0 before:text-neutral-200 before:text-base before:flex before:items-center before:justify-center hover:border-blue-400 hover:before:scale-100 hover:before:opacity-100"
                                >
                                    <span className="transition-all relative duration-300">
                                        <div className={`absolute top-0 left-0 w-full h-full flex justify-center items-center`}>
                                            <div className={`h-[72px] w-[3px] rotate-45 duration-300  ${instrumental ? 'bg-transparent' : 'bg-gray-500'} `} />
                                        </div>
                                        <Instrument />
                                    </span>
                                    <span className="transition-all duration-300 text-center">Instrumental</span>
                                </span>
                            </div>
                        </label>
                    </div>


                    {/* Width and Height Options */}
                    <div className="flex lg:flex-row flex-col justify-center my-6 gap-4">
                        <div className={`text-xs rounded-lg w-full h-[100px] min-h-[100px] relative p-[1px] ${width === 1024 && height === 576 ? 'bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 text-white' : 'bg-neutral-900 text-white'} `}>
                            <button
                                onClick={() => { setWidth(1024); setHeight(576); }}
                                className={`w-full h-full flex flex-col/ gap-4 justify-center items-center rounded-lg bg-neutral-900`} >
                                <div className='border w-8 h-5' />
                                16:9 <br /> (Horizontal)
                            </button>
                        </div>
                        <div className={`text-xs rounded-lg w-full h-[100px] min-h-[100px] relative p-[1px] ${width === 576 && height === 1024 ? 'bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 text-white' : 'bg-neutral-900 text-white'} `}>
                            <button
                                onClick={() => { setWidth(576); setHeight(1024); }}
                                className={`w-full h-full flex flex-col/ gap-4 justify-center items-center rounded-lg bg-neutral-900`} >
                                <div className='border w-5 h-8' />
                                9:16 <br /> (Vertical)
                            </button>
                        </div>
                        <div className="flex lg:flex-col flex-row gap-4 lg:justify-between items-center">
                            <div className="w-20 h-fit rounded relative flex justify-center items-center p-[1px] bg-gradient-to-br from-red-400 via-indigo-400 to-purple-400">
                                <span className='text-neutral-500 text-xs w-full absolute -bottom-[50%] lg:bottom-auto lg:-right-[108%]'>Width*</span>
                                <input
                                    type="number"
                                    value={width}
                                    onChange={(e) => setWidth(Math.min(1024, Math.max(0, parseInt(e.target.value))))}
                                    max="1536"
                                    placeholder="Custom Width"
                                    className="w-full p-2 rounded mb-2/ bg-neutral-900"
                                />
                            </div>
                            <div className="w-20 h-fit rounded relative flex justify-center items-center p-[1px] bg-gradient-to-br from-red-400 via-indigo-400 to-purple-400">
                                <span className='text-neutral-500 text-xs w-full absolute -bottom-[50%] lg:bottom-auto lg:-right-[108%]'>Height*</span>
                                <input
                                    type="number"
                                    value={height}
                                    onChange={(e) => setHeight(Math.min(1024, Math.max(0, parseInt(e.target.value))))}
                                    max="1536"
                                    placeholder="Custom Height"
                                    className="w-full p-2 rounded bg-neutral-900"
                                />
                            </div>
                        </div>
                    </div>



                    {/* Style Preset Options */}
                    <div className="flex flex-col mb-6">
                        <span className='font-bold bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent mb-4'>Background Style:</span>
                        <div className='flex text-nowrap flex-wrap gap-1'>
                            {['anime', 'cinematic', '3d-model', 'analog-film', 'comic-book', 'digital-art', 'fantasy-art', 'neon-punk', 'pixel-art', 'photographic'].map((preset) => (
                                <div key={preset} className={`text-xs w-fit h-fit rounded-lg p-[2px] ${stylePreset === preset ? 'bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 text-white' : 'bg-neutral-900 text-white'} `}>
                                    <button
                                        key={preset}
                                        onClick={() => setStylePreset(preset)}
                                        className={`px-4 py-2 rounded-lg bg-neutral-800`}
                                    >
                                        {preset.replace('-', ' ')}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Generate Button */}
                    {/* <button
                    onClick={handleGenerateMedia}
                    disabled={loading}
                    className={`w-full max-w-md p-3 bg-blue-500 text-white rounded-lg font-semibold ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
                >
                    {loading ? 'Generating...' : 'Generate'}
                </button> */}
                    <button
                        onClick={handleGenerateMedia}
                        className="w-full px-1"
                        disabled={loading}>
                        <PrimaryButton label={loading ? 'Processing...' : 'Generate Lofi Music'} />
                    </button>
                </div>
                <div className='p-4 flex flex-col flex-1 w-full items-center shadow-md rounded-lg'>
                    {loading && (
                        <div className="flex flex-col justify-between text-sm/ mt-2">
                            <div className={`${!loading ? 'text-green-500' : 'text-gray-400'} flex flex-col text-center gap-y-4 font-semibold items-center m-4 p-2 bg-gra/y-200 rounded-xl`}>
                                <Loader isLoading={loading} />
                                <span className='animate-pulse'>Your video is in Queue, <br /> Please don't close this page..</span>
                            </div>
                        </div>
                    )}

                    {error && (
                        <div className="mt-6 p-4 max-w-md w-full bg-red-800/40 border-red-900 border-2 text-red-300 rounded-md">
                            <h3 className="font-bold mb-2">Error:</h3>
                            <p>{error} This is an Error</p>
                        </div>
                    )}

                    {/* Display generated video */}
                    {videoUrl && (
                        <div className="p-4 mt-4">
                            <video controls src={videoUrl} className="w-full max-h-[480px] mt-2 mb-4" />
                            <a href={videoUrl} download className="bg-green-500 text-white p-2 rounded">
                                Download Video
                            </a>
                        </div>
                    )}

                    {/* Display audio player with saved audio and image */}
                    {audioUrl && imageUrl && (
                        <div className="p-4 mt-4 w-full">
                            <MusicPlayer audioUrl={audioUrl} imageUrl={imageUrl} title={title || 'Title not found'} />
                        </div>
                    )}
                </div>
            </div>
            <CardCarousel
                width={300}
                title={'Sample Videos'}
                slides={webData.lofiVideos}
                // customClass='mb-96'
            />
            <div className="text-5xl pl-8 py-16" > Explore More! </div>
            <GallerySection />
        </>
    );
};

export default LofiMix;
