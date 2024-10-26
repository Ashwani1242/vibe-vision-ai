import React, { useCallback, useEffect, useRef, useState } from "react";
import PrimaryButton from "./PrimaryButton";
import Arrow from "../../icons/Arrow";
import { Link } from "react-router-dom";

type webArray = {
    id: number,
    imageUrl: string,
    titleOne: string,
    titleTwo: string,
    subTitleOne: string,
    subTitleTwo: string,
}

interface ImageCarouselProps {
    slides: webArray[];
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ slides }) => {
    const [current, setCurrent] = useState<number>(0);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const isAutoScroll = true;

    const debounce = (func: () => void, wait: number) => {
        let timeout: NodeJS.Timeout;
        return () => {
            clearTimeout(timeout);
            timeout = setTimeout(func, wait);
        };
    };

    const previousSlide = useCallback(debounce(() => {
        setCurrent((current) => (current === 0 ? slides.length - 1 : current - 1));
    }, 300), [current]);

    const nextSlide = useCallback(debounce(() => {
        setCurrent((current) => (current === slides.length - 1 ? 0 : current + 1));
    }, 300), [current]);

    const startAutoScroll = () => {
        if (isAutoScroll) {
            intervalRef.current = setInterval(() => {
                setCurrent((prevCurrent) => (prevCurrent === slides.length - 1 ? 0 : prevCurrent + 1));
            }, 10000);
        }
    };

    const stopAutoScroll = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    startAutoScroll();
                } else {
                    stopAutoScroll();
                }
            },
            { threshold: 0.5 }
        );
        const element = document.getElementById("carousel-container");
        if (element) {
            observer.observe(element);
        }
        return () => {
            observer.disconnect();
        };
    }, []);


    // useEffect(() => {
    //     startAutoScroll();

    //     return () => stopAutoScroll();
    // }, []);

    const MemoizedSlides = React.memo(({ slides }: ImageCarouselProps & { current: number }) => (
        <>
            {slides.map((s) => (
                <div
                    key={s.id}
                    className="w-full h-full relative flex justify-center items-center">
                    <div
                        style={{ backgroundImage: `url(${s.imageUrl})` }}
                        className="w-full h-full absolute bg-no-repeat bg-center bg-cover filter brightness-[.4] rounded-lg" />
                    <div className="absolute text-center/ text-left pl-16 py-8 z-50 w-3/4 h-full md:h-fit flex flex-col justify-around items-start gap-y-4 md:gap-y-8">
                        <div className="flex flex-col gap-y-2">
                            <span className="xl:text-4xl lg:text-2xl text-2xl font-bold"> {s.titleOne} {s.titleTwo} </span>
                            <span className="xl:text-xl lg:text-lg"> {s.subTitleOne} <br /> {s.subTitleTwo} </span>
                        </div>
                        <Link to='/create' className="flex gap-x-4 md:gap-x-8 w-full text-sm md:text-xl items-center /justify-center justify-start" >
                            <PrimaryButton label="Try Now!" customClass="text-nowrap" />
                            <div className="hover:animate-pulse hover:brightness-90 duration-500 font-semibold py-2 px-4 cursor-pointer text-white hover:text-indigo-100 transition-all hover:-translate-y-[2px]">
                                Watch Demo
                            </div>
                        </Link>
                    </div>
                </div>
            ))}
        </>
    ));

    return (
        <div
            id="carousel-container"
            className="relative w-full max-w-[1800px] md:h-[300px] h-[300px] rounded-lg flex flex-col justify-around items-center">
            <div className="w-full max-w-[1800px] h-[94%] overflow-hidden rounded-lg">
                <div
                    className="flex transition-transform ease-in-out duration-500 gap-x-16/ h-full"
                    style={{
                        transform: `translateX(calc(-${current * 100}vw - 64px))`,
                        width: `${slides.length * 100}vw`,
                    }}>

                    <MemoizedSlides slides={slides} current={current} />
                    {/* {slides.map((s) => (
                        <div
                            key={s.id}
                            className="w-full h-[92%] relative flex justify-center items-center">
                            <div
                                style={{ backgroundImage: `url(${s.imageUrl})` }}
                                className="w-full h-full absolute bg-no-repeat bg-center bg-cover filter brightness-[.4] rounded-lg" />
                            <div className="absolute text-center md:text-left pl-16 py-16 z-50 w-3/4 h-full md:h-fit flex flex-col justify-around items-start gap-y-4 md:gap-y-8">
                                <div className="flex flex-col gap-y-4 md:gap-y-8">
                                    <span className="xl:text-7xl lg:text-5xl text-2xl font-bold"> {s.titleOne} <br /> {s.titleTwo} </span>
                                    <span className="xl:text-3xl lg:text-xl"> {s.subTitleOne} <br /> {s.subTitleTwo} </span>
                                </div>
                                <div className="flex gap-x-4 md:gap-x-8 w-full text-sm md:text-xl items-center justify-center md:justify-start" >
                                    <PrimaryButton label="Try Now!" customClass="text-nowrap" />
                                    <div className="hover:animate-pulse hover:brightness-90 duration-500 font-semibold py-2 px-4 cursor-pointer text-white hover:text-indigo-100 transition-all hover:-translate-y-[2px]">
                                        Watch Demo
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))} */}
                </div>
            </div>

            <button className="absolute top-0 left-1 h-full flex items-center text-white px-4 text-3xl" onClick={previousSlide}>
                <Arrow size="40px" customClass="w-6 md:w-8" />
            </button>
            <button className="absolute top-0 right-1 h-full flex items-center text-white px-4 text-3xl" onClick={nextSlide}>
                <Arrow size="40px" customClass="rotate-180 w-6 md:w-8" />
            </button>

            <div className="bottom-6 flex mt-8 justify-center gap-4 w-full">
                {slides.map((_, i) => (
                    <div
                        onClick={() => setCurrent(i)}
                        key={`circle-${i}`}
                        className={`w-2 h-2 rounded-full cursor-pointer ${i === current ? "bg-white" : "bg-gray-500"
                            }`}
                    ></div>
                ))}
            </div>
        </div>
    );
};

export default ImageCarousel;
