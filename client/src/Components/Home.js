import React from 'react'
import { Link } from 'react-router-dom'
import Login from '../Containers/Login'

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
        <h2>Weclome {user}</h2>
      </div>
    )
  }
}

export default Home