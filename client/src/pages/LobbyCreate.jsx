import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LobbyCreate = () => {

    const [ title, setTitle ] = useState("");
    const [ game, setGame ] = useState("");
    const [ limit, setLimit ] = useState("");
    const [ platform, setPlatform ] = useState("");
    const [ formErrors, setFormErrors ] = useState({});

    const userId = "63a1869e75f4263c7fc1dc2b"

    const navigate = useNavigate();

    const handleTitle = (e) => {
        setTitle(e.target.value);
    };

    const handleGame = (e) => {
        setGame(e.target.value);
    };

    const handleLimit = (e) => {
        setLimit(e.target.value);
    };

    const handlePlatform = (e) => {
        setPlatform(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/api/lobbies", {
            game,
            title,
            limit,
            platform,
            creator: userId,
            players:[ userId]
        })
        .then(res => {
            console.log(res);
            navigate("/")
        })
        .catch(err => {
            console.log(err);
            const errObj = err.response.data.error.errors;
            setFormErrors(errObj)
        })
    }


  return (
    <div className='flex flex-col gap-3 bg-white p-4 shadow rounded mt-10 w-1/3'>
        <h1 className="text-center text-3xl font-bold text-slate-700">Create a new Lobby!</h1>
        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-1 items-center">
            {formErrors.game && <p className="text-center text-red-500">{formErrors.game.message}</p>}
                <label htmlFor="game">What game are you running?:</label>
                <input onChange={handleGame}className="border w-[350px] border-b-2 border-t-0 border-r-0 border-l-0 border-slate-700" type="text" />
            </div>
            <div className="flex flex-col gap-1 items-center">
            {formErrors.title && <p className="text-center text-red-500">{formErrors.title.message}</p>}
                <label htmlFor="title">Lobby Title:</label>
                <input onChange={handleTitle}className="border w-[350px] border-b-2 border-t-0 border-r-0 border-l-0 border-slate-700" type="text" />
            </div>
            <div className="flex flex-col gap-1 items-center">
            {formErrors.limit && <p className="text-center text-red-500">{formErrors.limit.message}</p>}
                <label htmlFor="limit">Max Players:</label>
                <input onChange={handleLimit}className="border border-slate-700 w-1/4 text-center" type="number" />
            </div>
            <div className="flex flex-col gap-1 items-center">
            {formErrors.platform && <p className="text-center text-red-500">{formErrors.platform.message}</p>}
                <label htmlFor="platform">Platform:</label>
                <input onChange={handlePlatform}className="border w-[350px] border-b-2 border-t-0 border-r-0 border-l-0 border-slate-700" type="text" />
            </div>
            <button className="text-slate-700 font-bold border border-slate-700 rounded p-2 hover:bg-slate-700 hover:text-white hover:font-bold">Host</button>
        </form>
    </div>
  )
}

export default LobbyCreate