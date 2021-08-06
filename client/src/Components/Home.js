import React from 'react'
import { Link } from 'react-router-dom'
import Login from '../Containers/Login'
import Event from '../Containers/Event'

const Home = ({loggedIn, loginUser, user}) => {
 
  if (loggedIn === false) {
    return(
      <div>
        <Login loginUser={loginUser}/>
        <Link to='/signup'>
          <button>Sign Up</button>
        </Link>
      </div>
    )
  } else if (loggedIn === true) {
    return (
      <div>
        <Event user={user}/>
      </div>
    )
  }
}

export default Home