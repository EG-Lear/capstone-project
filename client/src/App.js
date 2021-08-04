import {BrowserRouter as Router, Route, Switch, useHistory} from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import './App.css'
import NavBar from './Components/NavBar'
import Home from './Components/Home'
import SignUp from './Containers/SignUp'

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

  useEffect(() => {
    fetch('/me')
    .then(res => {
      if (res.ok) {
        res.json()
        .then(u => {
          if (u.errors) {
            alert(u.errors)
          } else {
            setLoggedIn(true)
            setUser(u.username) 
          }
        })
      }
    })
  }, [])
  
  return (
    <div className="App">
      <h1>Hello</h1>
      <NavBar loggedIn={loggedIn} logout={logoutUser}/>
      <Switch>
        <Route exact path='/' render={() => <Home loggedIn={loggedIn} loginUser={loginUser} user={user}/>}/>
        <Route exact path='/signup' render={() => <SignUp loginUser={loginUser}/>}/>
      </Switch>
    </div>
  )
}

export default App
