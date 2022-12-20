import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const DeleteButton = ({ children, dataId }) => {

    const navigate = useNavigate();

    const handleDelete = () => {

        const answer = window.confirm("Are you sure you want to delete this user?");

        if(answer) {
            axios.delete(`http://localhost:8000/api/users/${dataId}`)
                .then(res => {
                    console.log(res);
                    sessionStorage.removeItem('userId');
                    navigate("/");
                })
                .catch(err => console.log(err));
        } else {
            return
        }
    };

  return (
    <button onClick={() => handleDelete()} className="text-red-500 border border-red-500 rounded p-2 hover:bg-red-500 hover:text-white">{children}</button>
    )
}

export default DeleteButton