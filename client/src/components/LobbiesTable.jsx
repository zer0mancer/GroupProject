import React from 'react'

const LobbiesTable = ({ lobby }) => {

  return (
    <div className='text-slate-700 flex flex-col gap-4 justify-center'>
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
                        <td className="border p-2 w-1">1/{lobby.limit}</td>
                        <td className="border p-2 w-96">{lobby.title}</td>
                        <td className="border p-2">{lobby.platform}</td>
                        <td className="border p-2">
                            <button className="border border-slate-700 rounded p-2 hover:bg-slate-700 hover:text-white">Join Lobby</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>  )
}

export default LobbiesTable