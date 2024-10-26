import { useState } from 'react';
import axios from 'axios';
import PrimaryButton from '../../utils/PrimaryButton';
import { BASE_URL } from '../../../../config';
import Loader from '../../../icons/Loader';
import MusicPlayer from '../../utils/MusicPlayer';
import { webData } from '../../../data/db';
import CardCarousel from '../../utils/CardCarousel';
import GallerySection from '../home/GallerySection';

function Jukebox() {
    const [prompt, setPrompt] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    const [instrumental, setInstrumental] = useState<boolean>(false);
    const [musicUrl, setMusicUrl] = useState<string>('');
    const [imageUrl, setImageUrl] = useState<string>('');
    const [musicTitle, setMusicTitle] = useState<string>('');
    const [isGeneratingMusic, setIsGeneratingMusic] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [generatedLyrics, setGeneratedLyrics] = useState<string>('');
    const [genreType, setGenreType] = useState<string>('Pop');
    const [themeType, setThemeType] = useState<string>('Love');

    const handleGenerateMusic = async () => {
        if (!prompt.trim()) {
            setError('Please ensure prompt are provided.');
            return;
        }

        const finalPrompt = `Create a ${genreType} song with the theme of ${themeType} not more than 1 minute long. "${prompt}". The music should capture the essence of ${themeType}. Ensure that elements typical of ${genreType} music, like its instruments, rhythm, and mood, are present.`;

        setError('');
        setIsGeneratingMusic(true);

        const apiUrl = `${BASE_URL}/music/generate`;

        const data = {
            title: title,
            prompt: finalPrompt,
            instrumental: instrumental,
        };

        try {
            const response = await axios.post(
                apiUrl,
                data,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'ngrok-skip-browser-warning': '1',
                    },
                }
            );

            console.log('Response data:', response.data);

            setMusicUrl(response.data.musicUrl);
            setImageUrl(response.data.imageUrl);
            setGeneratedLyrics(response.data.lyrics);
            setMusicTitle(response.data.songTitle);

        } catch (error: any) {
            console.error('Error generating music:', error.response ? error.response.data : error.message);
            setError('Failed to generate music. Please try again.');
        } finally {
            setIsGeneratingMusic(false);
        }
    };


    return (
        <>
            <div className='p-4 gap-x-8 flex flex-col lg:flex-row justify-center items-center lg:items-start relative w-full mb-12'>
                <div className="max-w-md p-4 w-full bg-white/ /text-black shadow-md rounded-lg flex-1 flex flex-col">
                    {/* <div className='text-2xl md:text-4xl uppercase font-bold bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent pb-8'>
                    Generate Your Music
                </div> */}

                    <h2 className="text-2xl font-bold bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent mb-4"> AI Jukebox for custom AI generated music to your liking. </h2>
                    <div className='space-y-4'>

                        <div className='max-w-md mx-auto mt-8 overflow-hidden/ md:max-w-xl w-full h-[100px] min-h-[100px] relative p-[1px] bg-gradient-to-br from-red-400 via-indigo-400 to-purple-400 rounded-sm'>
                            {error && <p className="text-red-500 absolute -top-8">{error}</p>}
                            <textarea
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                placeholder="Enter your prompt"
                                className="outline-none p-2 h-full w-full resize-none rounded-sm bg-neutral-900 text-neutral-300"
                                required
                            />
                        </div>

                        <div className='flex flex-col text-nowrap sm:flex-row/ sm:items-center/ gap-4 w-full'>
                            <div className='flex gap-x-4 items-center p-[1px] bg-gradient-to-br from-red-400 via-indigo-400 to-purple-400 rounded-sm'>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="Enter song title (optional)"
                                    className="border/ rounded-sm flex-1 p-2 w-full sm:w-fit bg-neutral-900 text-neutral-300"
                                />
                                {/* <span className='text-gray-500'>Optional</span> */}
                            </div>
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={instrumental}
                                    onChange={() => setInstrumental(!instrumental)}
                                    className="mr-2"
                                />
                                <label>Instrumental</label>
                            </div>

                            <div className="flex flex-col mb-6">
                                <span className='font-bold bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent mb-4'>Genre:</span>
                                <div className='flex text-nowrap flex-wrap gap-1'>
                                    {['Pop', 'Anime', 'Rock', 'Classical', 'Jazz', 'Hip-Hop', 'Lofi', 'Electronic', 'R&B/Soul', 'Chillout', 'Holiday', 'Children’s Music', 'Metal', 'Blues'].map((genre) => (
                                        <div key={genre} className={`text-xs w-fit h-fit rounded-lg p-[2px] ${genreType === genre ? 'bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 text-white' : 'bg-neutral-900 text-white'} `}>
                                            <button
                                                onClick={() => setGenreType(genre)}
                                                className={`px-4 py-2 rounded-lg bg-neutral-800`}
                                            >
                                                {genre.replace('-', ' ')}
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>


                            <div className="flex flex-col mb-6">
                                <span className='font-bold bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent mb-4'>Theme:</span>
                                <div className='flex text-nowrap flex-wrap gap-1'>
                                    {['Love', 'Adventure', 'Fantasy', 'Fantasy/Mythology', 'Nature', 'Celebration', 'Sadness', 'Uplifting/Positive', 'Relaxation', 'Spiritual', 'Inspirational', 'War', 'Space/Science Fiction', 'Epic', 'Blues'].map((theme) => (
                                        <div key={theme} className={`text-xs w-fit h-fit rounded-lg p-[2px] ${themeType === theme ? 'bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 text-white' : 'bg-neutral-900 text-white'} `}>
                                            <button
                                                onClick={() => setThemeType(theme)}
                                                className={`px-4 py-2 rounded-lg bg-neutral-800`}
                                            >
                                                {theme.replace('-', ' ')}
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={handleGenerateMusic}
                            className="w-full"
                            disabled={isGeneratingMusic}>
                            <PrimaryButton label={isGeneratingMusic ? 'Generating Music...' : 'Generate Music'} />
                        </button>

                    </div>

                </div>
                <div className="xl:flex-1 w-full flex flex-col justify-center items-center h-96 xl:h-full bg-neutral-800/ rounded-xl">
                    {musicUrl ? (
                        <div className="p-4 w-full h-[300px]/ gap-y-6 bg-neutral-800/ text-gray-400 flex flex-col justify-center items-center overflow-hidden">
                            <MusicPlayer imageUrl={imageUrl} audioUrl={musicUrl} title={musicTitle} />
                            {/* <a href={musicUrl} download className="bg-green-500 text-white p-2 rounded">
                            Download Music
                        </a> */}
                            <div className="max-w-md p-4 w-full bg-gradient-to-br max-h-full overflow-auto from-neutral-950 via-gray-950 to-indigo-950 rounded-sm mt-4">
                                <h3 className="font-semibold text-lg mb-2">Lyrics</h3>
                                <p className="whitespace-pre-wrap text-gray-400">{generatedLyrics ? generatedLyrics : "Nothing to show here yet"}</p>
                            </div>
                        </div>
                    ) : "Your Music Here"}
                    {isGeneratingMusic &&
                        <div className="flex flex-col justify-between text-sm/ mt-2">
                            <div className={`${musicUrl ? 'text-green-500' : 'text-gray-400'} flex flex-col text-center gap-y-4 font-semibold items-center m-4 p-2 bg-gra/y-200 rounded-xl`}>
                                <Loader isLoading={isGeneratingMusic} />
                                <span className='animate-pulse'>Your video is in Queue, <br /> Please don't close this page..</span>
                            </div>
                        </div>}
                </div>
            </div>
            <CardCarousel
                width={200}
                title={'Sample Clips'}
                slides={webData.jukeboxMusic}
                landscape={false}
                // customClass='mb-96'
            />
            <div className="text-5xl pl-8 py-16" > Explore More! </div>
            <GallerySection />
        </>
    );
}

export default Jukebox;
