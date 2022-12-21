import { useEffect, useState } from 'react';
import axios from 'axios';
import LobbiesTable from '../components/LobbiesTable';

const HomePage = () => {

    const [ allLobbies, setAllLobbies ] = useState([])
    const [ userId, setUserId ] = useState(sessionStorage.getItem('userId'))

    useEffect(() => {
        axios.get(`http://localhost:8000/api/lobbies`)
            .then(res => {
                console.log(res);
                setAllLobbies(res.data.servers)
            })
            .catch(err => console.log(err))
    }, []);

  return (
    <div className='flex flex-col gap-4'>
    <h1 className="text-3xl font-bold text-center">Welcome!</h1>
    {allLobbies && allLobbies.map((lobby, index) => {
        return(<LobbiesTable lobby={lobby} key={lobby._id}/>)
    })}
    </div>
  )
}

export default HomePage