import React from 'react'

const NavButton = ({children, onClickHandler}) => {
  return (
    <button onClick={() => onClickHandler()}className="border border-white rounded p-2 hover:bg-white hover:text-slate-700">{children}</button>
  )
}

export default NavButton