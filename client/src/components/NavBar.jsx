import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NavButton from './NavButton';

const NavBar = () => {

    const navigate = useNavigate();


    //=====REDIRECTS TO HOME ON CLICK=====
    const handleHomeClick = () => {
        navigate("/");
        window.location.reload(false);
      };

    //=====LOGS OUT USER, REMOVES LOCAL STOREAGE AND THEN NAVIGATES BACK HOME=====
    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('userId');
        navigate("/");
        window.location.reload(false)
      };

    //=====REDIRECTS TO ADD LOBBY PAGE=====
    const handleLobbyClick = () => {
        navigate("/")
    }

  return (
    <div className="flex justify-between items-center bg-slate-700 text-white p-2">
        <div>
            <img src="" alt="profile picture" />
            <Link to="" className="hover:text-gray-200">USER NAME</Link>
        </div>
        <div className='flex flex-col gap-2'>
            <h1 onClick={handleHomeClick} className="text-3xl font-bold cursor-pointer">The Lobriary</h1>
            <Link to="">
                <NavButton onClickHandler={handleLobbyClick}>Make a lobby</NavButton>
            </Link>
        </div>
        <div>
            <NavButton 
            onClickHandler={handleLogout}>Logout</NavButton>
        </div>
    </div>
  )
}

export default NavBar