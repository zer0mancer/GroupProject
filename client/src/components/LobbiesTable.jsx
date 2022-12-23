import React from 'react'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

const LobbiesTable = ({ lobby }) => {

    const [ userId, setUserId ] = useState(localStorage.getItem('userId'));
    const [ playersInLobby, setPlayersInLobby ] = useState(lobby.players);
    const [ playerCount, setPlayerCount ] = useState(lobby.players.length);
    
    const filteredPlayer = playersInLobby.filter((lobbyId) => lobbyId === userId)
 
    const handleJoinLobby = (lobbyId, userId) => {
        const newPlayersArr = [...playersInLobby, userId]
        axios.put(`http://localhost:8000/api/lobbies/${lobbyId}`,{
            players: newPlayersArr
        })
        .then(res => {
            console.log(res);
            window.location.reload(false)
        })
        .catch(err => console.log(err))
    }

    const handleLeaveLobby = (lobbyId, userId) => {
        const newPlayers = playersInLobby.filter((playerId) => playerId !== userId);
        console.log(newPlayers, "newPlayers")
        axios.put(`http://localhost:8000/api/lobbies/${lobbyId}`,{
            players: newPlayers
        })
        .then(res => {
            console.log(res);
            window.location.reload(false)
        })
        .catch(err => {console.log(err)})
    }

  return (
    <div className='text-slate-700 flex flex-col gap-4 justify-center m-4'>
        <div className='shadow rounded'>
            <table className=''>
                <thead>
                    <tr className='bg-slate-700 text-white'>
                        <td className="border  border-slate-600 p-2">Game: </td>
                        <td className="border border-slate-600 p-2">Players: </td>
                        <td className="border border-slate-600 p-2">Lobby Title: </td>
                        <td className="border border-slate-600 p-2">Platform: </td>
                        <td className="border border-slate-600 p-2">Actions: </td>
                    </tr>
                </thead>
                <tbody className='bg-white'>
                    <tr>
                        <td className="border p-2 w-96">{lobby.game}</td>
                        <td className="border p-2 w-1">{playerCount}/{lobby.limit}</td>
                        <Link to={`http://localhost:8000/api/lobbies/${lobby._id}`}>
                            <td className="border p-2 w-96">{lobby.title}</td>
                        </Link>
                        <td className="border p-2 w-32">{lobby.platform}</td>
                        <td className="border p-2">
                            {!userId ?
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
                                
                            }
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>  )
}

export default LobbiesTable