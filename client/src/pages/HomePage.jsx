import React from 'react'

const HomePage = () => {
  return (
    <div className='text-slate-700 flex flex-col gap-4 justify-center'>
        <h1 className="text-3xl font-bold text-center">Welcome USERNAME</h1>
        <div>
            <table className='border'>
                <thead className='border'>
                    <tr className='bg-slate-700 text-white'>
                        <td className="border p-2">Game: </td>
                        <td className="border p-2">Players: </td>
                        <td className="border p-2">Lobby Title: </td>
                        <td className="border p-2">Platform: </td>
                        <td className="border p-2">Actions: </td>
                    </tr>
                </thead>
                <tbody>
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