import React, { useState } from "react";
import Arrow from "../../icons/Arrow";
import MusicPlayer from "./MusicPlayer";

type webArray = {
    id: number,
    videoUrl?: string
    audioUrl?: string
    imageUrl?: string
    isVideo?: boolean
    isAudio?: boolean
    musicTitle?: string
}

interface ImageCarouselProps {
    slides: webArray[];
    title: string;
    width?: number;
    landscape?: boolean;
    customClass?: string
}

const CardCarousel: React.FC<ImageCarouselProps> = ({ slides, title, width = 360, landscape = true, customClass = '' }) => {
    const [current, setCurrent] = useState<number>(0);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isCurrentVideo, setIsCurrentVideo] = useState<boolean>(false);
    const [isCurrentAudio, setIsCurrentAudio] = useState<boolean>(false);
    const [thumbnailUrl, setThumbnailUrl] = useState<string>('');
    const [currentMusicTitle, setCurrentMusicTitle] = useState<string>('');
    const [currentMedia, setCurrentMedia] = useState<string | null>(null);

    const debounce = (func: () => void, wait: number) => {
        let timeout: NodeJS.Timeout;
        return () => {
            clearTimeout(timeout);
            timeout = setTimeout(func, wait);
        };
    };

    const previousSlide = debounce(() => {
        setCurrent((current) => (current === 0 ? slides.length - 1 : current - 1));
    }, 300);

    const nextSlide = debounce(() => {
        setCurrent((current) => (current === slides.length - 1 ? 0 : current + 1));
    }, 300);

    const handleDotClick = (index: number) => {
        if (index !== current) {
            setCurrent(index);
        }
    };

    const openModal = (mediaUrl: string, isVideo: boolean, isAudio: boolean, thumbnailUrl?: string, musicTitle?: string) => {
        // setCurrentMedia(null);
        if (isModalOpen) closeModal()
            
        setCurrentMedia(mediaUrl);
        setIsCurrentVideo(isVideo)
        setIsCurrentAudio(isAudio)
        if (isAudio) {
            // setIsCurrentVideo(false)
            setCurrentMusicTitle(musicTitle || 'Title not found');
            setThumbnailUrl(thumbnailUrl || 'Cannot Load the Image')
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setIsCurrentVideo(false)
        setIsCurrentAudio(false)
        setCurrentMedia(null);
    };

    return (
        <div className={`relative w-full max-w-[1920px]/ overflow-clip h-fit pt-4 rounded-lg flex flex-col justify-normal items-center ${customClass}`}>
            <div className='flex w-full items-center justify-between py-8/ px-8 lg:px-32/ xl:px-80/'>
                <span className='text-xl md:text-3xl'>{title}</span>
                <div className='flex'>
                    <button onClick={previousSlide} className="flex items-center text-white px-2 text-3xl">
                        <Arrow customClass="w-6 md:w-8" />
                    </button>
                    <button onClick={nextSlide} className="flex items-center text-white px-2 text-3xl">
                        <Arrow customClass="rotate-180 w-6 md:w-8" />
                    </button>
                </div>
            </div>

            <div className="w-full grid-background-animated/ /border-y-[3px] border-[#212225] py-8 px-8 lg:px-32/ xl:px-80/">
                <div className="w-full rounded-lg">
                    <div
                        className="flex transition-transform ease-in-out duration-300 gap-x-8 w-fit h-full"
                        style={{
                            transform: `translateX(-${(width + 32) * current}px)`,
                        }}
                    >
                        {slides.map((slide, i) => (
                            <div
                                key={slide.id}
                                className={`relative flex justify-center items-center hover:scale-[1.03] transition-all duration-300 cursor-pointer ${landscape ? 'landscape-slide' : 'portrait-slide'} ${i < current ? 'brightness-[.2]' : ''}`}
                                style={{ '--slide-width': `${width}px` } as React.CSSProperties}
                                onClick={() => {
                                    slide.isVideo ?
                                        openModal(slide.videoUrl || '', true, false) :
                                        slide.isAudio ?
                                            openModal(slide.audioUrl || '', false, true, slide.imageUrl, slide.musicTitle) :
                                            openModal(slide.imageUrl || '', false, false)
                                }
                                }>
                                <div
                                    style={{ backgroundImage: slide.isAudio ? '' : `url(${slide.imageUrl})` }}
                                    className={`w-full h-full absolute bg-no-repeat bg-center bg-cover filter brightness-[.9] rounded-lg ${slide.isVideo ? 'video-thumbnail' : ''}`}
                                >
                                    {slide.isVideo && (

                                        <div
                                            // style={{ backgroundImage: `url(${slide.imageUrl})` }}
                                            className="absolute inset-0 bg-blue-800/ rounded-lg bg-cover bg-opacity-50 flex justify-center items-center">
                                            <button className="text-white text-4xl">▶</button>
                                        </div>
                                    )}
                                    {slide.isAudio && (
                                        <div className="bg-gray-900 w-full h-full flex flex-col justify-center items-start rounded-lg p-3 group">
                                            <div className="relative">
                                                <img className="w-full md:w-72 block rounded" src={slide.imageUrl} alt="" />
                                                <div className="absolute bg-black rounded bg-opacity-0 group-hover:bg-opacity-60 w-full h-full top-0 flex items-center group-hover:opacity-100 transition justify-evenly">
                                                    {/* <button className="hover:scale-110 text-white opacity-0 transform translate-y-3 group-hover:translate-y-0 group-hover:opacity-100 transition">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-heart" viewBox="0 0 16 16">
                                                            <path d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                                                        </svg>
                                                    </button> */}

                                                    <button className="hover:scale-110 text-white opacity-0 transform translate-y-3 group-hover:translate-y-0 group-hover:opacity-100 transition">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-play-circle-fill" viewBox="0 0 16 16">
                                                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z" />
                                                        </svg>
                                                    </button>

                                                    {/* <button className="hover:scale-110 text-white opacity-0 transform translate-y-3 group-hover:translate-y-0 group-hover:opacity-100 transition">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-three-dots" viewBox="0 0 16 16">
                                                            <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
                                                        </svg>
                                                    </button> */}
                                                </div>
                                            </div>
                                            <div className="py-5 w-full">
                                                <h3 className="text-white text-lg">{slide.musicTitle}</h3>
                                                <p className="text-gray-400 text-sm">Vibe Vision Music.</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-8 bottom-4 flex justify-center gap-4 w-full">
                    {slides.map((_, i) => (
                        <div
                            onClick={() => handleDotClick(i)}
                            key={`circle-${i}`}
                            className={`w-2 h-2 rounded-full cursor-pointer ${i === current ? "bg-white" : "bg-gray-500"}`}
                        ></div>
                    ))}
                </div>
            </div>

            {isModalOpen && currentMedia && (
                <div className="fixed z-[2000] w-full max-w-[420px] max-h-[480px] p-8 md:p-0 md:right-8 bottom-4 bg-black bg-opacity-75 flex justify-end items-end">
                    <div className="relative bg-neutral-900 p-2 rounded-lg flex flex-col justify-end items-end w-full">
                        <button className="absolute z-10 top-2 right-2 text-white hover:scale-110 duration-300 hover:bg-black/50 px-2 py-1 rounded-full mb-10" onClick={closeModal}>✖</button>
                        {isCurrentVideo ?
                            <video src={currentMedia} controls className="w-full h-full rounded-lg"></video> :
                            isCurrentAudio ?
                                <MusicPlayer imageUrl={thumbnailUrl} audioUrl={currentMedia} title={currentMusicTitle} /> :
                                <img src={currentMedia} className="w-full h-full bg-cover" />
                        }
                    </div>
                </div>
            )}
        </div>
    );
};

export default CardCarousel;
