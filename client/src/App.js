import {BrowserRouter as Route, Switch, useHistory} from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import './App.css';

function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [user, setUser] = useState(null)
  const history = useHistory()

  const loginUser = (u, a) => {
    setLoggedIn(true)
    setUser(u)
    console.log(a)
    history.push('/')
  }

  const logoutUser = () => {
    fetch('/logout', {
      method: 'DELETE'
    })
    .then(() => {
      setLoggedIn(false)
      setUser(null)
    })
    history.push('/')
  }

  // useEffect(() => {
  //   fetch('/me')
  //   .then(res => {
  //     if (res.ok) {
  //       res.json()
  //       .then(u => {
  //         if (u.errors) {
  //           alert(u.errors)
  //         } else {
  //           setLoggedIn(true)
  //           setUser(u.username)
  //           setAdmin(u.admin) 
  //         }
  //       })
  //     }
  //   })
  // }, [])
  
  return (
    <div className="App">
      <h1>Hello</h1>
    </div>
  )
}

export default App;
