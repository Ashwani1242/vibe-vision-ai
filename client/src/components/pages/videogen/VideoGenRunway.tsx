import { useState } from 'react';
import axios from 'axios';
import PrimaryButton from '../../utils/PrimaryButton';
import { BASE_URL } from '../../../../config';

const VideoGenRunway = () => {
    const [prompt, setPrompt] = useState<string>('');
    const [theme, setTheme] = useState<string>('fantasy');
    const [tone, setTone] = useState<string>('sarcastic');
    const [ageGroup, setAgeGroup] = useState<string>('kids (5 - 12)');
    const [duration, setDuration] = useState<number>(5);
    const [model, setModel] = useState<string>('gen3');
    const [width, setWidth] = useState<number>(1344);
    const [height, setHeight] = useState<number>(768);
    const [motion, setMotion] = useState<number>(5);
    const [seed, setSeed] = useState<number>(0);
    const [callbackUrl, setCallbackUrl] = useState<string>('');
    const [videoUrl, setVideoUrl] = useState<string>('');
    const [gifUrl, setGifUrl] = useState<string>('');
    const [progress, setProgress] = useState<number>(0);
    const [error, setError] = useState<string>('');
    const [isGeneratingVideo, setIsGeneratingVideo] = useState<boolean>(false);

    const pollVideoStatus = async (uuid: string) => {
        try {
            const response = await axios.get(`${BASE_URL}/video/status/${uuid}`);
            const data = response.data;
            setProgress(data.progress || 0);

            if (data.status === 'success' && data.progress === 1) {
                setVideoUrl(data.url);
                setGifUrl(data.gif_url);
                setIsGeneratingVideo(false);
            } else if (data.progress < 1) {
                setTimeout(() => pollVideoStatus(uuid), 5000); 
            }
        } catch (error) {
            console.error('Error fetching video status:', error);
            setError('Error fetching video status.');
            setIsGeneratingVideo(false);
        }
    };

    const handleGenerate = async () => {
        if (!prompt.trim()) {
            setError('Please enter a prompt.');
            return;
        }

        const apiUrl = `${BASE_URL}/video`;

        setError('');
        setIsGeneratingVideo(true);
        setProgress(0); 

        try {
            const response = await axios.post(`${apiUrl}/generate`, {
                prompt: `A ${prompt}, dancing and headbanging in the jungle in front of a large beautiful waterfall`,
                model,
                width,
                height,
                motion,
                seed,
                callbackUrl,
                time: duration,
            });

            const { uuid } = response.data;

            const pollStatus = setInterval(async () => {
                const statusResponse = await axios.get(`${apiUrl}/status/${uuid}`);
                const { progress, url, gif_url, status } = statusResponse.data;

                setProgress(progress); 

                if (status === 'success' && progress === 1) {
                    setVideoUrl(url);
                    setGifUrl(gif_url);
                    clearInterval(pollStatus);  
                    setIsGeneratingVideo(false); 
                }
            }, 5000);  
        } catch (error) {
            console.error('Error generating video:', error);
            setError('Failed to generate video. Please try again.');
            setIsGeneratingVideo(false);
        }
    };

    return (
        <div className="flex flex-col justify-center items-center/ xl:h-screen w-screen pt-24 md:px-40">
            <div className='flex flex-col xl:flex-row items-center h-fit xl:h-full w-full pb-16'>
                <div className="flex-1 flex flex-col justify-normal xl:h-full items-center space-y-4 px-12 md:px-16 py-8">
                    <div className='text-2xl md:text-4xl uppercase font-bold bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent pb-8'>
                        Generate Your Comedy Show
                    </div>

                    <div className='w-full h-[200px] md:h-[100px] relative p-[1px] bg-gradient-to-br from-red-400 from-30% via-indigo-400 to-purple-400 rounded-sm'>
                        {error && <p className="text-red-300 absolute -top-8">{error}</p>}
                        <textarea
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder="Enter your prompt"
                            className="border/ outline-none p-2 h-full w-full resize-none rounded-sm"
                            required
                        />
                    </div>

                    <div className='flex flex-col md:flex-row w-full md:gap-x-8 mt-10'>
                        <div className='flex flex-col flex-1'>
                            <div className='text-sm md:text-base font-bold bg-gradient-to-br from-pink-300 via-purple-300 to-blue-300 bg-clip-text text-transparent'>
                                Theme
                            </div>
                            <select value={theme} onChange={(e) => setTheme(e.target.value)} className="border p-2 mb-4 ">
                                <option value="fantasy">Fantasy</option>
                                <option value="science fiction">Science Fiction</option>
                                <option value="fairy tale">Fairy Tale</option>
                                <option value="slice of life">Slice Of Life</option>
                            </select>
                        </div>

                        <div className='flex flex-col flex-1'>
                            <div className='text-sm md:text-base font-bold bg-gradient-to-br from-pink-300 via-purple-300 to-blue-300 bg-clip-text text-transparent'>
                                Tone
                            </div>
                            <select value={tone} onChange={(e) => setTone(e.target.value)} className="border p-2 mb-4">
                                <option value="sarcastic">Sarcastic</option>
                                <option value="hilarious">Hilarious</option>
                                <option value="silly">Silly</option>
                                <option value="dark comedy">Dark Comedy</option>
                            </select>
                        </div>

                        <div className='flex flex-col flex-1'>
                            <div className='text-sm md:text-base font-bold bg-gradient-to-br from-pink-300 via-purple-300 to-blue-300 bg-clip-text text-transparent'>
                                Age Group
                            </div>
                            <select value={ageGroup} onChange={(e) => setAgeGroup(e.target.value)} className="border p-2 mb-4">
                                <option value="kids (5 - 12)">Kids (5 - 12)</option>
                                <option value="teens (13 - 18)">Teens (13 - 18)</option>
                                <option value="adults (18 - 35)">Adults (18 - 35)</option>
                            </select>
                        </div>
                    </div>

                    <div className='h-fit w-full py-2'>
                        <div className='w-full h-[2px] bg-white/30'></div>
                    </div>

                    <div className='flex flex-col w-full text-nowrap gap-x-8'>
                        <div className='grid grid-cols-3 gap-x-8'>
                            <div className='flex flex-col flex-1'>
                                <div className='text-sm md:text-base font-bold bg-gradient-to-br from-pink-300 via-purple-300 to-blue-300 bg-clip-text text-transparent'>
                                    Duration (Seconds)
                                </div>
                                <input
                                    type="number"
                                    value={duration}
                                    onChange={(e) => setDuration(Number(e.target.value))}
                                    placeholder="Duration (seconds)"
                                    min={0}
                                    max={60}
                                    className="border p-2 mb-4"
                                />
                            </div>

                            <div className='flex flex-col flex-1'>
                                <div className='text-sm md:text-base font-bold bg-gradient-to-br from-pink-300 via-purple-300 to-blue-300 bg-clip-text text-transparent'>
                                    Model
                                </div>
                                <select value={model} onChange={(e) => setModel(e.target.value)} className="border p-2 mb-4">
                                    <option value="gen2">Gen 2</option>
                                    <option value="gen3">Gen 3</option>
                                </select>
                            </div>

                            <div className='flex flex-col flex-1'>
                                <div className='text-sm md:text-base font-bold bg-gradient-to-br from-pink-300 via-purple-300 to-blue-300 bg-clip-text text-transparent'>
                                    Width (MAx: 1920)
                                </div>
                                <input
                                    type="number"
                                    value={width}
                                    onChange={(e) => setWidth(Math.min(Math.max(Number(e.target.value), 0), 1920))}
                                    placeholder="Width (max 1920)"
                                    min={0}
                                    max={1920}
                                    className="border p-2 mb-4"
                                />
                            </div>

                            <div className='flex flex-col flex-1'>
                                <div className='text-sm md:text-base font-bold bg-gradient-to-br from-pink-300 via-purple-300 to-blue-300 bg-clip-text text-transparent'>
                                    Height (Max: 1080)
                                </div>
                                <input
                                    type="number"
                                    value={height}
                                    onChange={(e) => setHeight(Math.min(Math.max(Number(e.target.value), 0), 1080))}
                                    placeholder="Height (max 1080)"
                                    min={0}
                                    max={1080}
                                    className="border p-2 mb-4"
                                />
                            </div>

                            <div className='flex flex-col flex-1'>
                                <div className='text-sm md:text-base font-bold bg-gradient-to-br from-pink-300 via-purple-300 to-blue-300 bg-clip-text text-transparent'>
                                    Motion (0 - 10)
                                </div>
                                <input
                                    type="number"
                                    value={motion}
                                    onChange={(e) => setMotion(Math.min(Math.max(Number(e.target.value), 0), 10))}
                                    placeholder="Motion (0-10)"
                                    min={0}
                                    max={10}
                                    className="border p-2 mb-4"
                                />
                            </div>

                            <div className='flex flex-col flex-1'>
                                <div className='text-sm md:text-base font-bold bg-gradient-to-br from-pink-300 via-purple-300 to-blue-300 bg-clip-text text-transparent'>
                                    Seed
                                </div>
                                <input
                                    type="number"
                                    value={seed}
                                    onChange={(e) => setSeed(Number(e.target.value))}
                                    placeholder="Seed"
                                    className="border p-2 mb-4"
                                />
                            </div>
                        </div>

                        <div className='flex flex-col flex-1 mt-4'>
                            {/* <div className='text-sm md:text-base font-bold bg-gradient-to-br from-pink-300 via-purple-300 to-blue-300 bg-clip-text text-transparent'>
                                Calback Url
                            </div> */}
                            <input
                                type="text"
                                value={callbackUrl}
                                onChange={(e) => setCallbackUrl(e.target.value)}
                                placeholder="Callback URL"
                                className="border p-2 mb-4"
                            />
                        </div>
                    </div>

                    <div className='h-fit w-full py-2'>
                        <div className='w-full h-[2px] bg-white/50'></div>
                    </div>

                    <button
                        onClick={handleGenerate}
                        className="w-full px-1"
                        disabled={isGeneratingVideo}
                    >
                        <PrimaryButton label={isGeneratingVideo ? 'Generating Video...' : 'Generate'} />
                    </button>

                </div>
                <div className="xl:flex-1 flex flex-col w-3/4 justify-center items-center h-fit xl:h-full bg-neutral-800 rounded-xl p-4">
                    {progress !== 1 && 'Final Result'}
                    {isGeneratingVideo && (
                        <div className="w-full h-4 text-black bg-neutral-950 rounded mt-4">
                            <div className="bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 animate-pulse duration-700 transition-all h-full rounded-sm" style={{ width: `${progress * 100}%` }}>
                            </div>
                        </div>
                    )}

                    {progress === 1 && (
                        <div className='flex flex-col w-full h-full gap-4 xl:gap-8 xl:p-12 overflow-auto'>
                            {videoUrl ? (
                                <div className="flex-1 flex-shrink">
                                    <p>Video Preview:</p>
                                    <video controls src={videoUrl} className="mb-4" />
                                    <a href={videoUrl} download className="bg-green-500 text-white p-2 rounded">
                                        Download Video
                                    </a>
                                </div>
                            ) : 'Video Not Available'}
                            {gifUrl ? (
                                <div className="flex-1 flex-shrink">
                                    <p>GIF Preview:</p>
                                    <img src={gifUrl} alt="GIF Preview" className="mb-4" />
                                    <a href={gifUrl} download className="bg-green-500 text-white p-2 rounded">
                                        Download Gif
                                    </a>
                                </div>
                            ) : 'GIF Not Available'}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default VideoGenRunway;