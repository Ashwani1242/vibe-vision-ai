// import React, { useRef } from 'react';

interface AudioPlayerProps {
    imageUrl: string;
    audioUrl: string;
    title: string
}

const MusicPlayer: React.FC<AudioPlayerProps> = ({ imageUrl, audioUrl, title }) => {
    // const [isPlaying, setIsPlaying] = useState(false);
    // const [progress, setProgress] = useState(0);
    // const [duration, setDuration] = useState(0);
    // const [currentTime, setCurrentTime] = useState(0);
    // const audioRef = useRef<HTMLAudioElement | null>(null);

    // const togglePlay = () => {
    //     const audio = audioRef.current;
    //     if (!audio) return;

    //     if (isPlaying) {
    //         audio.pause();
    //     } else {
    //         audio.play();
    //     }
    //     setIsPlaying(!isPlaying);
    // };

    // const handleTimeUpdate = () => {
    //     const audio = audioRef.current;
    //     if (audio) {
    //         const progressValue = (audio.currentTime / audio.duration) * 100;
    //         setProgress(progressValue);
    //     }
    // };

    // const handleDurationUpdate = () => {
    //     const audio = audioRef.current;
    //     if (audio) {
    //         const durationValue = (audio.duration);
    //         const currentTimeDuration = (audio.currentTime);
            
    //         setDuration(durationValue);
    //         setCurrentTime(currentTimeDuration);
    //     }
    // };

    

    // const handleProgressClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    //     const audio = audioRef.current;
    //     if (!audio) return;

    //     const rect = (e.target as HTMLDivElement).getBoundingClientRect();
    //     const clickPosition = e.clientX - rect.left;
    //     const newTime = (clickPosition / rect.width) * audio.duration;
    //     audio.currentTime = newTime;
    // };



    return (
        <div className="max-w-md w-full mx-auto bg-neutral-800 rounded-lg shadow-lg p-4">
            <div className="flex items-center space-x-4">
                <img src={imageUrl} alt="Thumbnail" className="w-32 h-32 rounded-lg object-cover" />
                <div className="flex-1">
                    <div className="text-white text-xl font-semibold">{title}</div>
                    {/* <div className="text-gray-400">Artist Name</div> */}
                </div>
            </div>

            {/* <div className="relative mt-4">
                <div className="w-full h-2 bg-gray-600 rounded-lg cursor-pointer" onClick={handleProgressClick}>
                    <div
                        className="h-2 bg-green-500 rounded-lg"
                        style={{ width: `${progress}%` }}
                    />
                    <div className='flex justify-between'>
                        <div className="text-gray-400">{currentTime}</div>
                        <div className="text-gray-400">{duration}</div>
                    </div>
                </div>
            </div> */}

            <div className="mt-4 flex items-center justify-between">
                {/* <button
                    className={`text-3xl text-white`}
                    onClick={togglePlay}
                > {
                        isPlaying ?
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
                            </svg>
                            :
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
                            </svg>
                    }
                </button> */}

                <audio
                    controls
                    // ref={audioRef}
                    src={audioUrl}
                    // onTimeUpdate={handleTimeUpdate}
                    // onDurationChange={handleDurationUpdate}
                    
                    // onEnded={() => setIsPlaying(false)}
                    className='w-full'
                />
            </div>
        </div>
    );
};

export default MusicPlayer;
