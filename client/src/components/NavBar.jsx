import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoginForm from './LoginForm';
import NavButton from './NavButton';
import RegistrationForm from './RegistrationForm';
import axios from 'axios';

const NavBar = () => {

    const [ isLoginClicked, setIsLoginClicked ] = useState(false);
    const [ isRegistrationClicked, setIsRegistrationClicked] = useState(false);
    const [ userId, setUserId ] = useState(sessionStorage.getItem('userId'));
    const [ formErrors, setFormErrors ] = useState({});

    const navigate = useNavigate();


    //=====REDIRECTS TO HOME ON CLICK=====
    const handleHomeClick = () => {
        navigate("/");
        window.location.reload(false);
      };

      const handleLoginClick = () => {
        setIsLoginClicked(!isLoginClicked)
        setIsRegistrationClicked(false)
      };

      const handleRegistrationClicked = () => {
        setIsLoginClicked(false)
        setIsRegistrationClicked(true)
      }
      const handleLogin = () => {

      }

      const handleRegistration = (userParam) => {
        axios.post("http://localhost:8000/api/users", userParam) 
          .then(res => { 
            console.log(res);
            setUserId(sessionStorage.setItem("userId", res.data.newUser._id));
          })
          .catch(err => {
            console.log(err);
            const errObj = err.response.data.error.errors
            setFormErrors(errObj)
          })
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
    <div className="flex justify-between items-center bg-slate-700 text-white p-2 relative">
        <div>
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
            onClickHandler={handleLoginClick}>Login</NavButton>
        </div>
        {isLoginClicked && <LoginForm 
        onClickHandler={handleRegistrationClicked}
        formErrors={formErrors}
        />}
        {isRegistrationClicked && <RegistrationForm 
        onSubmitHandler={handleRegistration}
        formErrors={formErrors}
        />}
    </div>
  )
}

export default NavBar