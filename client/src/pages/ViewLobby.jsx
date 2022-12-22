import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';


const ViewLobby = ({ lobby }) => {

    const [ userId, setUserId ] = useState(localStorage.getItem('userId'));
    const [ accessToken, setAccessToken ] = useState(localStorage.getItem('accessToken'));
    const { id } = useParams();
    const [ title, setTitle ] = useState('');
    const [ platform, setPlatform ] = useState('');
    const [ creatorId, setCreatorId ] = useState('');


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
    },[])




  return (
    <div className='mb-44 absolute top-[103px] text-white right-10 z-100 bg-slate-700 shadow rounded p-4'>
      <div className='flex flex-col items-center'>
      <h1 className="text-2xl m-3">{lobby.title}</h1>
        <div className='flex'>
          <h3 className='text-xl m-3'>Game: {lobby.game}</h3>
          <h3 className='text-xl m-3'>Platform: {lobby.platform}</h3>
          <h3 className='text-xl m-3'>Player Limit: {lobby.limit}</h3>
          // use populate function on back end to display users name
        </div>
        <button className="border border-white font-bold rounded p-2 m-2 bg-slate-700 hover:bg-white hover:text-slate-700 text-white">Return</button>
      </div>
    </div>
  )
}

export default ViewLobby