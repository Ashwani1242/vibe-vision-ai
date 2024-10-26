import { NavLink } from "react-router-dom";

function Footer() {
  return (
    <div className="w-full border-t-2 border-white/20 py-16 md:py-20 flex flex-col justify-center items-center text-sm gap-y-16 md:gap-y-20">
      <div className="flex flex-col sm:flex-row gap-8 justify-center items-start w-full px-16 md:items-center">
        <NavLink to={'/'} className={({ isActive }) => `${isActive ? 'text-indigo-300' : 'text-white'} cursor-pointer hover:text-indigo-200 transition-all duration-500 hover:-translate-y-[2px]`}>Home</NavLink>
        <NavLink to={'/comedy-show'} className={({ isActive }) => `${isActive ? 'text-indigo-300' : 'text-white'} cursor-pointer hover:text-indigo-200 transition-all duration-500 hover:-translate-y-[2px]`}>Comedy Show</NavLink>
        <NavLink to={'/kids-music'} className={({ isActive }) => `${isActive ? 'text-indigo-300' : 'text-white'} cursor-pointer hover:text-indigo-200 transition-all duration-500 hover:-translate-y-[2px]`}>Kid's Music</NavLink>
        <NavLink to={'/pricing'} className={({ isActive }) => `${isActive ? 'text-indigo-300' : 'text-white'} cursor-pointer hover:text-indigo-200 transition-all duration-500 hover:-translate-y-[2px]`}>Pricing</NavLink>
        {localStorage.getItem('loggedInUser') && <NavLink to={'/gallery'} className={({ isActive }) => `${isActive ? 'text-indigo-300' : 'text-white'} cursor-pointer hover:text-indigo-200 transition-all duration-500 hover:-translate-y-[2px]`}>Gallery | {localStorage.getItem('loggedInUser')} </NavLink>}
        <NavLink to={'/whats-new'} className={({ isActive }) => `${isActive ? 'text-indigo-300' : 'text-white'} cursor-pointer hover:text-indigo-200 transition-all duration-500 hover:-translate-y-[2px]`}>What's New</NavLink>
      </div>
      <div className="text-gray-400">Copyright © 2024 Interdimensional Comedy</div>
    </div>
  );
}

export default Footer;
