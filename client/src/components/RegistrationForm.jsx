import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';


const RegistrationForm = ({ onSubmitHandler, formErrors}) => {

    const [ username, setUsername ] = useState("");
    // const [ firstName, setFirstName ] = useState("");
    // const [ lastName, setLastName ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ confirmPassword, setConfirmPassword ] = useState("")
    // const [ accessToken, setAccessToken ] = useState(localStorage.getItem('accessToken'));

    const navigate = useNavigate();

    const handleUsername = (e) => {
        setUsername(e.target.value)
    };
    // const handleFirstName = (e) => {
    //     setFirstName(e.target.value)
    // };
    // const handleLastName = (e) => {
    //     setLastName(e.target.value)
    // };
    const handleEmail = (e) => {
        setEmail(e.target.value)
    }; 
    const handlePassword = (e) => {
        setPassword(e.target.value)
    }; 
    const handleConfirmPassword = (e) => {
        setConfirmPassword(e.target.value)
    }; 

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmitHandler({
            username,
            email,
            password,
            confirmPassword
        });
        setUsername("");
        setEmail("");
        setPassword("");
        setConfirmPassword("")
    }

  return (
    <div className='mb-44 absolute top-[103px] text-black right-10 z-100 bg-white border border-black p-4'>
        <div className='flex flex-col items-center'>
            <h1 className="text-2xl m-3">Register User</h1>
        <form onSubmit={handleSubmit} className="w-[500px] flex flex-col">
            <div className='flex'>
                <section className='m-4'>
                <div className="flex flex-col gap-2">
                    {formErrors.username && <p className="text-center text-red-500">{formErrors.username.message}</p>}
                        <label htmlFor="username">Username: </label>
                        <input id="username" className="border border-black rounded w-[400px]" type="text" onChange={handleUsername} value={username}/>
                    </div>
                    {/* <div className="flex flex-col gap-2">
                    {formErrors.firstName && <p className="text-center text-red-500">{formErrors.firstName.message}</p>}
                        <label htmlFor="firstName">First Name: </label>
                        <input id="firstName" className="border border-black rounded w-[400px]" type="text" onChange={handleFirstName} value={firstName}/>
                    </div>
                    <div className="flex flex-col gap-2">
                    {formErrors.lastName && <p className="text-center text-red-500">{formErrors.lastName.message}</p>}
                        <label htmlFor="lastName">Last Name: </label>
                        <input id="lastName" className="border border-black rounded" type="text" onChange={handleLastName} value={lastName}/>
                    </div> */}
                    <div className="flex flex-col gap-2">
                    {formErrors.email && <p className="text-center text-red-500">{formErrors.email.message}</p>}
                        <label htmlFor="email">Email: </label>
                        <input id="email" className="border border-black rounded" type="text" onChange={handleEmail} value={email}/>
                    </div>
                    <div className="flex flex-col gap-2">
                    {formErrors.password && <p className="text-center text-red-500">{formErrors.password.message}</p>}
                        <label htmlFor="password">Password: </label>
                        <input id="password" className="border border-black rounded" type="password" onChange={handlePassword} value={password}/>
                    </div>
                    <div className="flex flex-col gap-2">
                    {formErrors.confirmPassword && <p className="text-center text-red-500">{formErrors.confirmPassword.message}</p>}
                        <label htmlFor="confirmPassword">Password: (Confirm) </label>
                        <input id="confirmPassword" className="border border-black rounded" type="password" onChange={handleConfirmPassword} value={confirmPassword}/>
                    </div>
                </section>
            </div>
                <button className="border border-black rounded p-2 m-2 bg-slate-700 hover:bg-slate-600 text-white">Register</button>
        </form>
    </div>
    </div>
  )
}

export default RegistrationForm