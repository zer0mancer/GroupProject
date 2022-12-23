
import React from 'react'
import {Link, useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { AiOutlineEdit, AiOutlineCheckCircle,  } from "react-icons/ai";
import { MdOutlineCancel } from 'react-icons/md';
import DeleteButton from '../components/DeleteButton';


const OnePlayer = (props) => {

    const { id } = useParams();
    const [ username, setUsername ] = useState("");
    const [ email, setEmail ] = useState("");
    // const [platform, setPlatform] = useState('');
    const [ userId, setUserId ] = useState("");
    const [ isEditClicked, setIsEditClicked ] = useState(false);
    const [ formErrors, setFormErrors ] = useState({});
    const [ dataChange, setDataChange ] = useState("");
    const [ accessToken, setAccessToken ] = useState(localStorage.getItem('accessToken'));

    const handleUsername = (e) => {
        setUsername(e.target.value);
    };

    const handleEmail = (e) => {
        setEmail(e.target.value)
    }

    // const handlePlatform = (event)=>{
    //     setPlatform(event.target.value)
    // }

    const handleEditClick = () => {
        setIsEditClicked(!isEditClicked);
    };

    const handleCancelEdit = () => {
        setIsEditClicked(false);
        setDataChange(Math.random());
        setFormErrors({});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8000/api/users/${id}`, {
            username,
            email,
        })
            .then(res => {
                console.log(res);
                setDataChange(Math.random());
                // ^^^ help me understand why we are setting this. 
                setIsEditClicked(false);
            })
            .catch(err => {
                console.log(err);
                const errObj = err.response.data.error.errors;
                setFormErrors(errObj);
            });
    };

    useEffect(()=>{
        axios.get(
            `http://localhost:8000/api/users/${id}`,
            {headers:
            { "Authorization": `Bearer ${accessToken}`}
            },
            {withCredentials: true})
            .then((response)=>{
                console.log(response.data.user);
                setUsername(response.data.user.username);
                setEmail(response.data.user.email);
                setUserId(response.data.user._id);
                // setPlatform(response.data.user.platform);
            })
            .catch((error)=>{
                console.log(error)
            })
    },[dataChange])
    
    return (
        <div className="flex flex-col gap-2 m-10 shadow items-center w-1/2 bg-white p-4">
            {!isEditClicked ? 
            <div className="flex flex-col gap-2 ">
                <div className="flex flex-col text-center">
                    <h1 className="text-3xl">{username}</h1>
                    <small>Username</small>
                </div>
                <div className="flex flex-col text-center">
                    <h1 className="text-3xl">{email}</h1>
                    <small>Email</small>
                </div>
                        {/* <div className="flex flex-col text-center">
                            <h1 className="text-3xl">{platform}</h1>
                            <small>Platform:</small>
                        </div> */}
                <AiOutlineEdit onClick={() => handleEditClick()} color="green" size="25" className="hover:border hover:border-green-500 hover:rounded hover:cursor-pointer"/>
                <DeleteButton dataId={userId}>Delete User</DeleteButton>
            </div>
                :
            <form onSubmit={handleSubmit} className="flex flex-col gap-2 ">
                {formErrors.username && <p className="text-center text-red-500">{formErrors.username.message}</p>}
                <div className="flex flex-col text-center">
                    <input className="text-3xl text-center w-[500px] border border-slate-700 border-b-2 border-l-0 border-t-0 border-r-0" value={username} onChange={handleUsername}/>
                    <small>Username</small>
                </div>
                <div className="flex flex-col text-center">
                {formErrors.email && <p className="text-center text-red-500">{formErrors.email.message}</p>}
                    <input className="text-3xl text-center w-[500px] border border-slate-700 border-b-2 border-l-0 border-t-0 border-r-0" value={email} onChange={handleEmail}/>
                    <small>Email</small>
                </div>
                        {/* ignore for now, just a place holder for later implementations
                        <div className="flex flex-col text-center">
                        {formErrors.platform && <p className="text-center text-red-500">{formErrors.platform.message}</p>}
                            <input className="text-3xl text-center w-[500px] border border-slate-700 border-b-2 border-l-0 border-t-0 border-r-0" value={platform} onChange={handlePlatform}/>
                            <small>platform</small>
                        </div> */}
                <div className="flex gap-2">
                    <button><AiOutlineCheckCircle color="green" size="25" className="hover:border hover:border-green-500 hover:rounded"/></button>
                    <MdOutlineCancel onClick={() => handleCancelEdit()} color="red" size="25" className="cursor-pointer hover:border hover:border-red-500 hover:rounded"/>
                </div>
            </form>
            }
        </div>
        )
    }

export default OnePlayer