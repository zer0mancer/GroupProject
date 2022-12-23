import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';


const EditLobby = (props) => {

    const [ userId, setUserId ] = useState(localStorage.getItem('userId'));
    const [ accessToken, setAccessToken ] = useState(localStorage.getItem('accessToken'));
    const { id } = useParams();
    const [ title, setTitle ] = useState('');
    const [ platform, setPlatform ] = useState('');
    const [ creatorId, setCreatorId ] = useState('');
    const [ game, setGame ] = useState('');
    const [ limit, setLimit ] = useState('');
    const [ formErrors, setFormErrors ] = useState({});

    const navigate = useNavigate();

    const handleGame = (e) => {
        setGame(e.target.value)
    };

    const handleTitle = (e) => {
        setTitle(e.target.value)
    }; 

    const handleLimit = (e) => {
        setLimit(e.target.value)
    }; 

    const handlePlatform = (e) => {
        setPlatform(e.target.value)
    }; 

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

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8000/api/lobbies/${id}`, {
            game, 
            title, 
            limit, 
            platform,
        })
        .then((response) => {
            console.log(response);
            console.log(response.data);
            setGame("");
            setTitle("");
            setLimit("");
            setPlatform("");
            navigate("/");
        })
        .catch((err) => {
            console.log(err);
            const errObj = err.response.data.error.errors;
            setFormErrors(errObj);
        });

    }


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
            <form onSubmit={handleSubmit} className="w-[500px] flex flex-col">
                <section className='m-4'>

                    <div className="flex flex-col gap-2">
                        {formErrors.game && <p className="text-center text-red-500">{formErrors.game.message}</p>}
                        <label htmlFor="game">Update Game: </label>
                        <input id="game" className="border border-black rounded w-[400px] text-red-600" type="text" onChange={handleGame} value={game}/>
                    </div>
            
                    <div className="flex flex-col gap-2">
                        {formErrors.title && <p className="text-center text-red-500">{formErrors.title.message}</p>}
                        <label htmlFor="title">Update Lobby Name: </label>
                        <input id="title" className="border border-black rounded text-red-600" type="text" onChange={handleTitle} value={title}/>
                    </div>

                    <div className="flex flex-col gap-2">
                        {formErrors.limit && <p className="text-center text-red-500">{formErrors.limit.message}</p>}
                        <label htmlFor="limit">Update Max Players: </label>
                        <input id="limit" className="border border-black rounded text-red-600" type="Number" onChange={handleLimit} value={limit}/>
                    </div>

                    <div className="flex flex-col gap-2">
                        {formErrors.platform && <p className="text-center text-red-500">{formErrors.platform.message}</p>}
                        <label htmlFor="platform">Update platfrom: (Console) </label>
                        <input id="platform" className="border border-black rounded text-red-600" type="text" onChange={handlePlatform} value={platform}/>
                    </div>

            </section>
            

            <button className="border border-white font-bold rounded p-2 m-2 bg-slate-700 hover:bg-white hover:text-slate-700 text-white" value='update' type='submit'> Save </button>

          {/* {userId == creatorId ?
            <div>
              <Link to={`/lobriary/lobby/edit/${id}`}>
                <button className="border border-white font-bold rounded p-2 m-2 bg-slate-700 hover:bg-white hover:text-slate-700 text-white">Edit Lobby</button>
              </Link>
              <button onClick={() => handleDelete()} className="text-red-500 border border-red-500 rounded p-2 hover:bg-red-500 hover:text-white">Delete Lobby</button>
            </div>
            
          :
            <p></p>
          } */}

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
            </form>
        </div>          
    </div>




  )
}

export default EditLobby