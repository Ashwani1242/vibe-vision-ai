import { Link, NavLink, useNavigate } from "react-router-dom";
import MainIcon from "../icons/MainIcon";
import PrimaryButton from "./utils/PrimaryButton";
import { useEffect, useState, useRef } from "react";

function Sidebar() {
    const [loggedInUser, setLoggedInUser] = useState("");
    const [isMenuOpen, setIsMenuOpen] = useState(true);
    const sidebarRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    useEffect(() => {
        setLoggedInUser(localStorage.getItem("loggedInUserEmail") || "No User");

        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setIsMenuOpen(true); // Open menu on larger screens
            } else {
                setIsMenuOpen(false); // Close menu on mobile screens
            }
        };

        const handleClickOutside = (event: MouseEvent) => {
            if (window.innerWidth < 1024 && sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false); // Close sidebar if clicked outside on smaller screens
            }
        };

        // Set initial state based on current screen width
        handleResize();

        // Add resize event listener
        window.addEventListener("resize", handleResize);

        // Add click outside event listener
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            window.removeEventListener("resize", handleResize);
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("loggedInUser");
        localStorage.removeItem("loggedInUserEmail");
        navigate("/");
    };

    const Line = () => (
        <div className="h-fit w-full py-2/">
            <div className="w-full h-[1px] bg-white/30" />
        </div>
    );

    return (
        <div
            ref={sidebarRef}
            className={`flex flex-col justify-between bg-neutral-900 z-50 text-sm text-nowrap transition-all duration-300 
                ${isMenuOpen
                    ? "fixed lg:relative h-screen px-8 py-4 rounded-r-xl"
                    : "fixed top-4 left-4 p-1 rounded-lg"
                } 
                items-start w-fit`}
        >
            <div className="flex flex-col justify-center items-center h-full w-full gap-y-4">
                <div className="flex flex-row-reverse justify-center items-center gap-x-4">
                    <button
                        onClick={() => setIsMenuOpen((val) => !val)}
                        className="h-10 w-10 flex justify-center items-center transition-all duration-300 hover:scale-110"
                    >
                        <div className="relative w-full h-full">
                            <span
                                style={{
                                    left: "25%",
                                    top: isMenuOpen ? "45%" : "32%",
                                    rotate: isMenuOpen ? "45deg" : "0deg",
                                }}
                                className="absolute h-[2px] w-5 bg-white transition-all duration-300 rounded-full"
                            />
                            <span
                                style={{
                                    left: "25%",
                                    top: isMenuOpen ? "45%" : "48%",
                                    rotate: isMenuOpen ? "-45deg" : "0deg",
                                }}
                                className="absolute h-[2px] w-5 bg-white transition-all duration-300 rounded-full"
                            />
                            <span
                                style={{
                                    left: "25%",
                                    top: isMenuOpen ? "45%" : "63%",
                                    rotate: isMenuOpen ? "45deg" : "0deg",
                                }}
                                className="absolute h-[2px] w-5 bg-white transition-all duration-300 rounded-full"
                            />
                        </div>
                    </button>

                    {isMenuOpen && (
                        <button
                            onClick={() => setIsMenuOpen((val) => !val)}
                            className="flex justify-center items-center gap-x-4 cursor-pointer py-4"
                        >
                            <MainIcon />
                            <div className="text-lg font-bold bg-gradient-to-br from-pink-500 via-purple-400 to-blue-300 bg-clip-text text-transparent">
                                VibeVision AI <span className="text-xs text-white font-normal">v1</span>
                            </div>
                        </button>
                    )}
                </div>

                {isMenuOpen && (
                    <div className="flex flex-col gap-y-4 w-full items-start h-full">
                        <Line />

                        <NavLink
                            to="/explore"
                            className={({ isActive }) =>
                                `${isActive ? "text-indigo-300" : "text-white"
                                } text-lg cursor-pointer hover:text-indigo-200 transition-all duration-500 hover:-translate-y-[2px]`
                            }
                        >
                            Explore
                        </NavLink>

                        <Line />

                        <NavLink
                            to="/create"
                            className={({ isActive }) =>
                                `${isActive ? "text-indigo-300" : "text-white"
                                } text-lg cursor-pointer hover:text-indigo-200 transition-all duration-500 hover:-translate-y-[2px]`
                            }
                        >
                            Create
                        </NavLink>

                        <NavLink
                            to="/create/video"
                            className={({ isActive }) =>
                                `${isActive ? "text-indigo-300" : "text-white"
                                } text-lg pl-4 cursor-pointer hover:text-indigo-200 transition-all duration-500 hover:-translate-y-[2px]`
                            }
                        >
                            Video
                        </NavLink>

                        <NavLink
                            to="/create/music"
                            className={({ isActive }) =>
                                `${isActive ? "text-indigo-300" : "text-white"
                                } text-lg pl-4 cursor-pointer hover:text-indigo-200 transition-all duration-500 hover:-translate-y-[2px]`
                            }
                        >
                            Music
                        </NavLink>

                        <Line />

                        <NavLink
                            to="/pricing"
                            className={({ isActive }) =>
                                `${isActive ? "text-indigo-300" : "text-white"
                                } text-lg cursor-pointer hover:text-indigo-200 transition-all duration-500 hover:-translate-y-[2px]`
                            }
                        >
                            Pricing
                        </NavLink>

                        {localStorage.getItem("loggedInUser") && (
                            <NavLink
                                to="/gallery"
                                className={({ isActive }) =>
                                    `${isActive ? "text-indigo-300" : "text-white"
                                    } text-lg cursor-pointer hover:text-indigo-200 transition-all duration-500 hover:-translate-y-[2px]`
                                }
                            >
                                Gallery | {localStorage.getItem("loggedInUser")}
                            </NavLink>
                        )}

                        <NavLink
                            to="/whats-new"
                            className={({ isActive }) =>
                                `${isActive ? "text-indigo-300" : "text-white"
                                } text-lg cursor-pointer hover:text-indigo-200 transition-all duration-500 hover:-translate-y-[2px]`
                            }
                        >
                            What's New
                        </NavLink>
                    </div>
                )}

                {isMenuOpen &&
                    (localStorage.getItem("loggedInUserEmail") ? (
                        <div className="xl:flex gap-x-8 justify-center items-center hidden">
                            <span className="cursor-pointer text-white hover:text-indigo-200 transition-all duration-500 hover:-translate-y-[2px]">
                                {loggedInUser}
                            </span>
                            <button onClick={handleLogout}>
                                <PrimaryButton label="Log Out" />
                            </button>
                        </div>
                    ) : (
                        <div className="xl:flex hidden gap-x-8 justify-center items-center">
                            <Link
                                to="/auth/login"
                                className="cursor-pointer text-white hover:text-indigo-200 transition-all duration-500 hover:-translate-y-[2px]"
                            >
                                Log in
                            </Link>
                            <Link to="/auth/signup" className="w-fit h-fit p-0">
                                <PrimaryButton label="Start for free" />
                            </Link>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default Sidebar;
