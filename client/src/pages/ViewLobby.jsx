import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';


const ViewLobby = () => {

    const [ userId, setUserId ] = useState(localStorage.getItem('userId'));
    const [ accessToken, setAccessToken ] = useState(localStorage.getItem('accessToken'));
    const { id } = useParams();
    const [ title, setTitle ] = useState('');
    const [ platform, setPlatform ] = useState('');
    const [ creatorId, setCreatorId ] = useState('');
    const [ game, setGame ] = useState('');
    const [ limit, setLimit ] = useState('');


    useEffect(() => {
        axios.get(`http://localhost:8000/api/lobbies/${id}`)
            .then((response)=>{
                console.log(response.data.server, "server response");
                setTitle(response.data.server.title);
                setPlatform(response.data.server.platform);
                setCreatorId(response.data.server.creatorId);
                setGame(response.data.server.game);
                setLimit(response.data.server.limit);
            })
            .catch((error)=>{
                console.log(error)
            })
    },[]);




  return (
    <div className='mb-44 absolute top-[103px] text-white right-10 z-100 bg-slate-700 shadow rounded p-4'>
      <div className='flex flex-col items-center'>
      <h1 className="text-2xl m-3">{title}</h1>
        <div className='flex'>
          <h1>{id}</h1>
          <h3 className='text-xl m-3 text-red-500'>Game: {game}</h3>
          <h3 className='text-xl m-3'>Platform: {platform}</h3>
          <h3 className='text-xl m-3'>Player Limit: {limit}</h3>

        </div>
        <button className="border border-white font-bold rounded p-2 m-2 bg-slate-700 hover:bg-white hover:text-slate-700 text-white">Return</button>
      </div>
    </div>
  )
}

export default ViewLobby