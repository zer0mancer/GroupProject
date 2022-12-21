import { useEffect, useState } from 'react';
import axios from 'axios';

const HomePage = () => {

    const [ currentUser, setCurrentUser ] = useState({})
    const [ userId, setUserId ] = useState(sessionStorage.getItem('userId'))

    useEffect(() => {
        // Connor: hardcoding my userId into this to try and bypass error when attempting to navigate to create lobby page
        axios.get(`http://localhost:8000/api/users/${userId}`)
            .then(res => {
                console.log(res);
                setCurrentUser(res.data.user)
            })
            .catch(err => console.log(err))
    }, []);

  return (
    <div className='text-slate-700 flex flex-col gap-4 justify-center'>
        <h1 className="text-3xl font-bold text-center">Welcome {currentUser.username}</h1>
        <div className='shadow rounded'>
            <table>
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
                        <td className="border p-2">GAME TITLE</td>
                        <td className="border p-2">PLAYER COUNT</td>
                        <td className="border p-2">LOBBY TITLE</td>
                        <td className="border p-2">GAMING PLATFORM</td>
                        <td className="border p-2">
                            <button className="border border-slate-700 rounded p-2 hover:bg-slate-700 hover:text-white">Join Lobby</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default HomePage