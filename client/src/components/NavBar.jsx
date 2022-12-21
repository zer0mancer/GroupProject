import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoginForm from './LoginForm';
import NavButton from './NavButton';
import RegistrationForm from './RegistrationForm';
import axios from 'axios';

const NavBar = () => {

    const [ isLoginClicked, setIsLoginClicked ] = useState(false);
    const [ isRegistrationClicked, setIsRegistrationClicked] = useState(false);
    const [ formErrors, setFormErrors ] = useState({});
    const [ currentUser, setCurrentUser ] = useState({});
    const [ userId, setUserId ] = useState(localStorage.getItem('userId'));
    const [ accessToken, setAccessToken ] = useState(localStorage.getItem('accessToken'));
    

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
            setAccessToken(localStorage.setItem('accessToken', res.data.token));
            setUserId(localStorage.setItem("userId", res.data.user._id));
            setIsRegistrationClicked(false);
          })
          .catch(err => {
            console.log(err);
            const errObj = err.response.data.error.errors;
            setFormErrors(errObj);
          })
      };

    //=====LOGS OUT USER, REMOVES SESSION DATA AND THEN NAVIGATES BACK HOME=====
    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('userId');
        navigate("/");
        window.location.reload(false)
      };

      useEffect(() => {
        axios.get(
          `http://localhost:8000/api/users/${userId}`,
          {headers:
            { "Authorization": `Bearer ${accessToken}`}
          },
          {withCredentials: true}
        )
        .then((res) => {
          console.log(res);
          setCurrentUser(res.data.user);
        })
        .catch(err => console.log(err))
      }, [])

  return (
    <div className="grid grid-cols-3 items-center bg-slate-700 text-white p-2 relative w-full">
        <div>
            <Link to={`/lobriary/user/${userId}`} className="hover:text-gray-200 underline">{currentUser.username}</Link>
        </div>
        <div className='flex flex-col gap-2'>
            <h1 onClick={handleHomeClick} className="text-3xl font-bold cursor-pointer">The Lobriary</h1>
            <Link to="/lobriary/lobby/create">
                <NavButton >Make a lobby</NavButton>
            </Link>
        </div>
        {userId ? 
          <div>
              <NavButton onClickHandler={handleLogout}>Logout</NavButton>
          </div>
        :
          <div>
              <NavButton onClickHandler={handleLoginClick}>Login</NavButton>
          </div>
          
        }
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