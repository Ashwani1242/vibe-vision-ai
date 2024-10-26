import { Link, NavLink, useNavigate } from "react-router-dom"
import MainIcon from "../icons/MainIcon"
import PrimaryButton from "./utils/PrimaryButton"
import { useEffect, useState } from "react"

interface props {
    color?: string
}

function Navbar({ color = "#0f0f11" }: props) {

    const [loggedInUser, setLoggedInUser] = useState('')
    const [isMenuOpen, setisMenuOpen] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        setLoggedInUser(localStorage.getItem('loggedInUserEmail') || 'No User')
    })

    const handleLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('loggedInUser')
        localStorage.removeItem('loggedInUserEmail')

        navigate('/')
    }


    return (
        <nav
            style={{ backgroundColor: color }}
            className="flex justify-between z-50 text-sm text-nowrap items-center px-8 md:px-32 py-4 fixed top-0 w-full max-w-[1920px]">
            <Link to={'/'} className="flex justify-center items-center gap-x-4 cursor-pointer">
                <MainIcon />
                <div className='text-xl uppercas md:block hidden font-bold bg-gradient-to-br from-pink-500 via-purple-400 to-blue-300 bg-clip-text text-transparent'>
                    VibeVision AI
                </div>
            </Link>
            {/* <div className="xl:flex hidden gap-x-8 justify-center items-center">
                <NavLink to={'/'} className={({ isActive }) => `${isActive ? 'text-indigo-300' : 'text-white'} cursor-pointer hover:text-indigo-200 transition-all duration-500 hover:-translate-y-[2px]`}>Home</NavLink>
                <NavLink to={'/comedy-show'} className={({ isActive }) => `${isActive ? 'text-indigo-300' : 'text-white'} cursor-pointer hover:text-indigo-200 transition-all duration-500 hover:-translate-y-[2px]`}>Comedy Show</NavLink>
                <NavLink to={'/kids-music'} className={({ isActive }) => `${isActive ? 'text-indigo-300' : 'text-white'} cursor-pointer hover:text-indigo-200 transition-all duration-500 hover:-translate-y-[2px]`}>Kid's Music</NavLink>
                <NavLink to={'/pricing'} className={({ isActive }) => `${isActive ? 'text-indigo-300' : 'text-white'} cursor-pointer hover:text-indigo-200 transition-all duration-500 hover:-translate-y-[2px]`}>Pricing</NavLink>
                {localStorage.getItem('loggedInUser') && <NavLink to={'/gallery'} className={({ isActive }) => `${isActive ? 'text-indigo-300' : 'text-white'} cursor-pointer hover:text-indigo-200 transition-all duration-500 hover:-translate-y-[2px]`}>Gallery | {localStorage.getItem('loggedInUser')} </NavLink>}
                <NavLink to={'/whats-new'} className={({ isActive }) => `${isActive ? 'text-indigo-300' : 'text-white'} cursor-pointer hover:text-indigo-200 transition-all duration-500 hover:-translate-y-[2px]`}>What's New</NavLink>
            </div> */}
            {localStorage.getItem('loggedInUserEmail') ?
                <div className="xl:flex gap-x-8 justify-center items-center hidden">
                    <span className="cursor-pointer text-white hover:text-indigo-200 transition-all duration-500 hover:-translate-y-[2px]">{loggedInUser}</span>
                    <button onClick={handleLogout}> <PrimaryButton label='Log Out' /> </button>
                </div>
                :
                <div className="xl:flex hidden gap-x-8 justify-center items-center">
                    <Link to={'/auth/login'} className="cursor-pointer text-white hover:text-indigo-200 transition-all duration-500 hover:-translate-y-[2px]">Log in</Link>
                    {/* <div className="bg-indigo-500 cursor-pointerter px-4 py-1 rounded-sm border-2 border-transparent hover:border-white transition-all duration-500">Start for free</div> */}
                    <Link to={'/auth/signup'} className="w-fit h-fit p-0">
                        <PrimaryButton label="Start for free" />
                    </Link>
                </div>
            }
            {/* <ResponsiveNavbar /> */}
            <button onClick={() => setisMenuOpen((val) => !val)} className='xl:hidden h-10 w-10 flex justify-cente items-cente transition-all duration-300 hover:scale-110'>
                <div className='relative w-full h-full'>
                    <span
                        style={{
                            left: '25%',
                            top: isMenuOpen ? '45%' : "32%",
                            rotate: isMenuOpen ? '45deg' : '0deg'
                        }}
                        className='absolute h-[2px] w-5 bg-white transition-all duration-300 rounded-full' />
                    <span
                        style={{
                            left: '25%',
                            top: isMenuOpen ? '45%' : "48%",
                            rotate: isMenuOpen ? '-45deg' : '0deg'
                        }}
                        className='absolute h-[2px] w-5 bg-white transition-all duration-300 rounded-full' />
                    <span
                        style={{
                            left: '25%',
                            top: isMenuOpen ? '45%' : "63%",
                            rotate: isMenuOpen ? '45deg' : '0deg'
                        }}
                        className='absolute h-[2px] w-5 bg-white transition-all duration-300 rounded-full' />
                </div>
            </button>
            {isMenuOpen && <div className="absolute top-[100%] flex flex-col p-12 left-0 bg-neutral-950 h-screen w-screen">
                <div className="flex flex-col justify-around gap-12 w-full">
                    <NavLink to={'/'} className={({ isActive }) => `${isActive ? 'text-indigo-300' : 'text-white'} cursor-pointer hover:text-indigo-200 transition-all duration-500 hover:-translate-y-[2px]`}>Home</NavLink>
                    <NavLink to={'/comedy-show'} className={({ isActive }) => `${isActive ? 'text-indigo-300' : 'text-white'} cursor-pointer hover:text-indigo-200 transition-all duration-500 hover:-translate-y-[2px]`}>Comedy Show</NavLink>
                    <NavLink to={'/kids-music'} className={({ isActive }) => `${isActive ? 'text-indigo-300' : 'text-white'} cursor-pointer hover:text-indigo-200 transition-all duration-500 hover:-translate-y-[2px]`}>Kid's Music</NavLink>
                    <NavLink to={'/pricing'} className={({ isActive }) => `${isActive ? 'text-indigo-300' : 'text-white'} cursor-pointer hover:text-indigo-200 transition-all duration-500 hover:-translate-y-[2px]`}>Pricing</NavLink>
                    {localStorage.getItem('loggedInUser') && <NavLink to={'/gallery'} className={({ isActive }) => `${isActive ? 'text-indigo-300' : 'text-white'} cursor-pointer hover:text-indigo-200 transition-all duration-500 hover:-translate-y-[2px]`}>Gallery | {localStorage.getItem('loggedInUser')} </NavLink>}
                    <NavLink to={'/whats-new'} className={({ isActive }) => `${isActive ? 'text-indigo-300' : 'text-white'} cursor-pointer hover:text-indigo-200 transition-all duration-500 hover:-translate-y-[2px]`}>What's New</NavLink>
                </div>
                <div className="bg-neutral-800 w-full h-[2px] my-8"></div>
                {localStorage.getItem('loggedInUserEmail') ?
                    <div className="flex gap-x-8 items-center">
                        <span className="cursor-pointer text-white hover:text-indigo-200 transition-all duration-500 hover:-translate-y-[2px]">{loggedInUser}</span>
                        <button onClick={handleLogout}> <PrimaryButton label='Log Out' /> </button>
                    </div>
                    :
                    <div className="flex gap-x-8 items-center">
                        <Link to={'/auth/login'} className="cursor-pointer text-white hover:text-indigo-200 transition-all duration-500 hover:-translate-y-[2px]">Log in</Link>
                        {/* <div className="bg-indigo-500 cursor-pointerter px-4 py-1 rounded-sm border-2 border-transparent hover:border-white transition-all duration-500">Start for free</div> */}
                        <Link to={'/auth/signup'} className="w-fit h-fit p-0">
                            <PrimaryButton label="Start for free" />
                        </Link>
                    </div>
                }
            </div>}
        </nav>
    )
}

export default Navbar
