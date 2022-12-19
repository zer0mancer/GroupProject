
import React from 'react'
import {Link, useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const OnePlayer = (props) => {

    const navigate = useNavigate();
    const {id} = useParams();
    const [user, setUser] = useState({});
    const [joinedOn, setJoinOn] = useState([]);

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/users/${id}`)
            .then((response)=>{
                // I might have this set as player so double check model.
                console.log(response.data.user[0])
                setUser(response.data.user[0])
            })
            .catch((error)=>{
                console.log(error)
            })
    },[id])
    
    return (
        <div>
            <div>
                <h1>Username:{user.username}</h1>
                <h2>Email:  {user.email}</h2>
            </div>
                <h4>What platform are you playing on?</h4>
            <div>
                <div>
                    <p>
                        {
                            user.playstation ===true? <input type="checkbox" defaultChecked="true"></input>:<input type="checkbox" defaultChecked="false"></input>
                        }
                    </p>
                    <p>
                        {
                            user.xbox ===true? <input type="checkbox" defaultChecked="true"></input>:<input type="checkbox" defaultChecked="false"></input>
                        }
                    </p>
                    <p>
                        {
                            user.switch ===true? <input type="checkbox" defaultChecked="true"></input>:<input type="checkbox" defaultChecked="false"></input>
                        }
                    </p>
                    <p>
                        {
                            user.pc ===true? <input type="checkbox" defaultChecked="true"></input>:<input type="checkbox" defaultChecked="false"></input>
                        }
                    </p>
                    <p>
                        {
                            user.mac ===true? <input type="checkbox" defaultChecked="true"></input>:<input type="checkbox" defaultChecked="false"></input>
                        }
                    </p>
                    <p>
                        {
                            user.steamdeck ===true? <input type="checkbox" defaultChecked="true"></input>:<input type="checkbox" defaultChecked="false"></input>
                        }
                    </p>
                </div>
            </div>
        </div>
        )
    }

export default OnePlayer