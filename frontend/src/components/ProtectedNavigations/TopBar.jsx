import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Avatar } from '@nextui-org/react';
import { Link } from 'react-router-dom';
import { IoSunny, IoMoon } from 'react-icons/io5';
import { Settings, ShutDown as Logout } from '../../utils/Icons';
import arrow from '../../assets/arrow.gif';
import avatar from '../../assets/avatar.webp';
import { openModal } from '../../features/logoutModal/logoutModalSlice';
import Menu from './Menu';

const TopBar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const isRouteActive = (path) => {
    return location.pathname === path;
  };
  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
    document.documentElement.classList.toggle('dark', !isDarkMode);
  };
  return (
    <div className="w-full h-[10vh] flex justify-between items-center px-8 py-2 border-b-1 border-secondary">
      <div className="block xl:hidden">
        <Menu />
      </div>
      <div className="hidden md:flex items-center space-x-4">
        <img src={arrow} alt="" className="w-[35px]" />
        <Link
          to="https://www.linkedin.com/in/anilbhutale/"
          target="_blank"
          className="text-xl text-secondary transition-all hover:text-primary relative animateBottom"
        >
          Contact Me
        </Link>
      </div>
      <div className="flex justify-center items-center space-x-4">
        <div
          onClick={toggleDarkMode}
          className={`cursor-pointer ${isDarkMode ? 'text-yellow-400' : 'text-gray-800'}`}
        >
          {isDarkMode ? <IoMoon size={24} /> : <IoSunny size={24} />}
        </div>
        <Settings
          className={`hidden sm:block p-1 border-1 border-secondary rounded-lg size-[1.8rem] transition-all cursor-pointer hover:bg-slate-300 ${
            isRouteActive('/dashboard/settings') ? 'activeLink' : ''
          }`}
          onClick={() => navigate('/dashboard/settings')}
        />
        <Logout
          className="p-1 border-1 border-secondary rounded-lg size-[1.8rem] transition-all cursor-pointer hover:bg-error hover:text-white"
          onClick={() => dispatch(openModal())}
        />
        <Avatar
          src={avatar}
          name="Avatar"
          size="md"
          isBordered
          color="secondary"
          showFallback
        />
      </div>
    </div>
  );
};

export default TopBar;
