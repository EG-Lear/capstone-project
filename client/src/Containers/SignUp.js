import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const SignUp = ({loginUser}) => {
  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirmation, setPasswordConfirmation] = useState("")

  const handleChange = (event) => { //handles input fields
    if (event.target.id === 'U') {
      setUserName(event.target.value)
    } else if (event.target.id === 'P') {
      setPassword(event.target.value)
    } else if (event.target.id === 'PC') {
      setPasswordConfirmation(event.target.value)
    }
  }

  const handleSubmit = (event) => { //handles sign up request
    event.preventDefault()
    if (password === passwordConfirmation) {
      fetch('/signup', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: userName, 
          password: password,
          password_confirmation: passwordConfirmation
        })
      })
      .then(res => res.json())
      .then(data => {
        if (data.errors) {
          alert(data.errors)
        } else {
          loginUser(data.username)
        }
      })
    } else {
      alert("Passwords do not match")
    }
  }

  return(
    <div>
      <form onSubmit={handleSubmit}>
        <label>Username: </label>
        <input id='U' value={userName} onChange={handleChange}></input>
        <br/>
        <label>Password: </label>
        <input id='P' type='password' value={password} onChange={handleChange}></input>
        <br/>
        <label>Confirm Password: </label>
        <input id='PC' type='password' value={passwordConfirmation} onChange={handleChange}></input>
        <br/>
        <br/>
        <button>Sign up</button>
      </form>
      <Link to='/'>
        <button>Back</button>
      </Link>
    </div>
  )
}

export default SignUp