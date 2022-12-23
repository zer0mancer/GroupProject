import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';


const ViewLobby = ({ lobby }) => {

    const [ userId, setUserId ] = useState(localStorage.getItem('userId'));
    const [ accessToken, setAccessToken ] = useState(localStorage.getItem('accessToken'));
    const { id } = useParams();
    const [ title, setTitle ] = useState('');
    const [ platform, setPlatform ] = useState('');
    const [ creatorId, setCreatorId ] = useState('');
    const [ game, setGame ] = useState('');
    const [ limit, setLimit ] = useState('');

    const navigate = useNavigate();

    // const [ playersInLobby, setPlayersInLobby ] = useState(lobby.players);
    // const [ playerCount, setPlayerCount ] = useState(lobby.players.length);
    
    // const filteredPlayer = playersInLobby.filter((lobbyId) => lobbyId === userId)
 
    // const handleJoinLobby = (lobbyId, userId) => {
    //     const newPlayersArr = [...playersInLobby, userId]
    //     axios.put(`http://localhost:8000/api/lobbies/${lobbyId}`,{
    //         players: newPlayersArr
    //     })
    //     .then(res => {
    //         console.log(res);
    //         window.location.reload(false)
    //     })
    //     .catch(err => console.log(err))
    // }

    // const handleLeaveLobby = (lobbyId, userId) => {
    //     const newPlayers = playersInLobby.filter((playerId) => playerId !== userId);
    //     console.log(newPlayers, "newPlayers")
    //     axios.put(`http://localhost:8000/api/lobbies/${lobbyId}`,{
    //         players: newPlayers
    //     })
    //     .then(res => {
    //         console.log(res);
    //         window.location.reload(false)
    //     })
    //     .catch(err => {console.log(err)})
    // }

    


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

    const handleDelete = () => {
      const answer = window.confirm("Are you sure you want to delete this lobby?");
      if(answer) {
          axios.delete(`http://localhost:8000/api/lobbies/${id}`)
              .then(res => {
                  console.log(res);
                  // sessionStorage.removeItem('');
                  navigate("/");
              })
              .catch(err => console.log(err));
      } else {
          return
      }
    };




  return (
    <div className='mb-44 absolute top-[103px] text-white right-10 z-100 bg-slate-700 shadow rounded p-4'>
      <div className='flex flex-col items-center'>

        <h1 className="text-2xl m-3">{title}</h1>

          <h3 className='text-xl m-3'>Game: {game}</h3>
          <h3 className='text-xl m-3'>Platform: {platform}</h3>
          <h3 className='text-xl m-3'>Player Limit: {limit}</h3>

        <div className='flex'>
          <Link to='/'>
            <button className="border border-white font-bold rounded p-2 m-2 bg-slate-700 hover:bg-white hover:text-slate-700 text-white">Return</button>
          </Link>

          {userId == creatorId ?
            <div>
              <Link to={`/lobriary/lobby/edit/${id}`}>
                <button className="border border-white font-bold rounded p-2 m-2 bg-slate-700 hover:bg-white hover:text-slate-700 text-white">Edit Lobby</button>
              </Link>
              <button onClick={() => handleDelete()} className="text-red-500 border border-red-500 rounded p-2 hover:bg-red-500 hover:text-white">Delete Lobby</button>
            </div>
            
          :
            <p></p>
          }

          {/* {!userId ?
              <div></div>
          :
              playerCount === lobby.limit && filteredPlayer == userId  ?
              <button onClick={() => handleLeaveLobby(lobby._id, userId)} className="border border-slate-700 rounded p-2 hover:bg-slate-700 hover:text-white">
                  Leave Lobby
              </button>
          :
              playerCount === lobby.limit?
              <button disabled onClick={() => handleJoinLobby(lobby._id, userId)} className="border bg-gray-400 text-gray-200 border-slate-700 rounded p-2">
                  Join Lobby
              </button>
          :
              filteredPlayer == userId ?
                  <button onClick={() => handleLeaveLobby(lobby._id, userId)} className="border border-slate-700 rounded p-2 hover:bg-slate-700 hover:text-white">
                      Leave Lobby
                  </button>
              :
                  <button  onClick={() => handleJoinLobby(lobby._id, userId)} className="border border-slate-700 rounded p-2 hover:bg-slate-700 hover:text-white">
                      Join Lobby
                  </button>
              
          } */}
        </div>

      </div>
    </div>
  )
}

export default ViewLobby