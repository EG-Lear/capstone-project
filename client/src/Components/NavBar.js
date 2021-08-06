import React from 'react'
import { NavLink } from 'react-router-dom'
import '../App.css'

const NavBar = ({loggedIn, logout}) => {

  if (loggedIn === false) {
    return (
      <div>  
        <h2>Welcome to EasyWed where we make wedding planning easy.</h2>
      </div>
    )
  } else {
    return (
      <div>
        <NavLink className='App-link' to='/'>Home</NavLink>
        <NavLink className='App-link' to='/receptions'>Reception</NavLink>
        <NavLink className='App-link' to='/guests'>Guest-List</NavLink>
        <button onClick={logout}>Log Out</button>
      </div>
    )
  }
}

export default NavBar