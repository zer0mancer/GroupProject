import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

// need to pass in validations 
const CreateNewLobby = () => {

    const [ game, setGame ] = useState("");
    const [ title, setTitle ] = useState("");
    const [ limit, setLimit ] = useState(0);
    const [ platform, setPlatform ] = useState("");
    const [ creatorId, setCreatorId ] = useState(localStorage.getItem('userId'));
    const [ accessToken, setAccessToken ] = useState(localStorage.getItem('accessToken'));
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

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/api/lobbies", {
            game, 
            title, 
            limit, 
            platform,
            creatorId,
        })
        .then((res) => {
            console.log(res);
            console.log(res.data);
            setGame("");
            setTitle("");
            setLimit("");
            setPlatform("");
            navigate("/")
        })
        .catch((err) => {
            console.log(err);
            const errObj = err.response.data.error.errors;
            setFormErrors(errObj);
        });

    }

  return (
    <div className='m-4 flex flex-col items-center mb-44  text-black z-100 bg-white border border-black p-4'>
        <div className='flex flex-col items-center'>
            <h1 className="text-2xl m-3">Create a new Lobby!</h1>
        <form onSubmit={handleSubmit} className="w-[500px] flex flex-col">
            <div className='flex'>
                <section className='m-4'>

                <div className="flex flex-col gap-2">

                    {formErrors.game && <p className="text-center text-red-500">{formErrors.game.message}</p>}
                        <label htmlFor="game">What game are you running?</label>
                        <input id="game" className="border border-black rounded w-[400px]" type="text" onChange={handleGame} value={game}/>
                    </div>
                    
                    <div className="flex flex-col gap-2">
                    {formErrors.title && <p className="text-center text-red-500">{formErrors.title.message}</p>}
                        <label htmlFor="title">Lobby Name: </label>
                        <input id="title" className="border border-black rounded" type="text" onChange={handleTitle} value={title}/>
                    </div>

                    <div className="flex flex-col gap-2">
                    {formErrors.limit && <p className="text-center text-red-500">{formErrors.limit.message}</p>}
                        <label htmlFor="limit">Max Players: </label>
                        <input id="limit" className="border border-black rounded" type="Number" onChange={handleLimit} value={limit}/>
                    </div>

                    <div className="flex flex-col gap-2">
                    {formErrors.platform && <p className="text-center text-red-500">{formErrors.platform.message}</p>}
                        <label htmlFor="platform">Joinable on: (Console) </label>
                        <input id="platform" className="border border-black rounded" type="text" onChange={handlePlatform} value={platform}/>
                    </div>

                </section>
            </div>
                <button className="border border-black rounded p-2 m-2 bg-slate-700 hover:bg-slate-600 text-white" value='submit'> Host </button>
        </form>
    </div>
    </div>
  )
}

export default CreateNewLobby