import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";

const UpdateProduct = ({ onSubmitHandler, formErrors}) => {
    const { id } = useParams();
    const [game, setGame] = useState("");
    const [title, setTitle] = useState("");
    const [limit, setLimit] = useState(0);
    const [platform, setPlatform] = useState("");

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

    const [headerTitle, setHeaderTitle] = useState("");

    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/lobbies/${id}`)
            .then((res) => {
                console.log(res.data);
                setGame(res.data.game);
                setTitle(res.data.title);
                setLimit(res.data.limit);
                setPlatform(res.data.platform);
            })
            .catch((err) => console.log(err));
    }, []);


    const handleSubmit = (e) => {
        e.preventDefault();

        axios.put(`http://localhost:8000/api/lobbies/${id}`, { 
                game,
                title, 
                limit,
                platform,
            })
            .then((res) => {
                console.log(res);
                console.log(res.data);
                navigate("/"); 
            })
            .catch((err) => {
                console.log(err);
            });
    };

    

//     return (
//         <div>
//             <header>Edit {headerTitle}</header>

//             <form onSubmit={handleSubmit}>
//                 <div className="form-fields">
//                     <label>Title</label>
//                     <input
//                         onChange={(e) => setTitle(e.target.value)}
//                         value={title}
//                         name="title"
//                         type="text"
//                     />
//                 </div>

//                 <br />

//                 <div className="form-fields">
//                     <label>Price</label>
//                     <input
//                         onChange={(e) => setPrice(e.target.value)}
//                         value={price}
//                         name="price"
//                         type="number"
//                     />
//                 </div>

//                 <br />

//                 <div className="form-fields">
//                     <label>Description</label>
//                     <input
//                         onChange={(e) => setDescription(e.target.value)}
//                         value={description}
//                         name="description"
//                         type="text"
//                     />
//                 </div>

//                 <br />

//                 <input class="submit-input" type="submit" value="Update" />
//             </form>
//         </div>
//     );
// };

return (
    <div className='mb-44 absolute top-[103px] text-black right-10 z-100 bg-white border border-black p-4'>
        <div className='flex flex-col items-center'>
            <h1 className="text-2xl m-3">Edit your Lobby!</h1>
        <form onSubmit={handleSubmit} className="w-[500px] flex flex-col">
            <div className='flex'>
                <section className='m-4'>

                <div className="flex flex-col gap-2">

                    {formErrors.game && <p className="text-center text-red-500">
                        {formErrors.game.message}</p>}

                        <label htmlFor="game">What game are you running?</label>

                        <input id="game" className="border border-black rounded w-[400px]" 
                        type="text" onChange={handleGame} value={game}/>

                    </div>
                    
                    <div className="flex flex-col gap-2">
                    {formErrors.title && <p className="text-center text-red-500">
                        {formErrors.title.message}</p>}

                        <label htmlFor="title">Lobby Name: </label>

                        <input id="title" className="border border-black rounded" 
                        type="text" onChange={handleTitle} value={title}/>

                    </div>

                    <div className="flex flex-col gap-2">
                    {formErrors.limit && <p className="text-center text-red-500">
                        {formErrors.limit.message}</p>}

                        <label htmlFor="limit">Max Players: </label>

                        <input id="limit" className="border border-black rounded" 
                        type="Number" onChange={handleLimit} value={limit}/>

                    </div>

                    <div className="flex flex-col gap-2">
                    {formErrors.platform && <p className="text-center text-red-500">
                        {formErrors.platform.message}</p>}

                        <label htmlFor="platform">Joinable on: (Console) </label>

                        <input id="platform" className="border border-black rounded" 
                        type="text" onChange={handlePlatform} value={platform}/>
                        
                    </div>

                </section>
            </div>
                <button className="border border-black rounded p-2 m-2 bg-slate-700 hover:bg-slate-600 text-white"> Host </button>
        </form>
    </div>
        <button className="border border-black rounded p-2 m-2 bg-slate-700 hover:bg-slate-600 text-white"> Return </button>
    </div>
  );
};

export default UpdateProduct;