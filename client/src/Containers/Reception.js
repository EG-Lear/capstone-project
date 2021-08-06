import React, { useState, useEffect } from 'react'

const Reception = () => {
  const [location, setLocation] = useState('')
  const [time, setTime] = useState('')
  const [reception, setReception] = useState({})
  const [recepStatus, setRecepStatus] = useState(false)
  const [,] = useState()

  useEffect(() => {
    fetch('/receptions')
    .then(res => {
      if (res.ok) {
        res.json()
        .then(data => {
          if (data === null) {
            setRecepStatus(false)
          } else if (data.errors) {
            alert(data.errors)
          } else {
            setReception(data)
            setRecepStatus(true)
          }
        })
      }
    })
  }, [])

  const handleChange = (event) => {
    if (event.target.id === 'L') {
      setLocation(event.target.value)
    } else if (event.target.id === 'T') {
      setTime(event.target.value)
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    fetch('/receptions',{
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        location: location,
        time: time
      }) 
    })
    .then(res => res.json())
    .then(data => {
      if (data.errors) {
        alert(data.errors)
      } else {
        setRecepStatus(true)
        setReception(data)
      }
    })
  }

  if (recepStatus === false) {
    return (
      <div>
        <h4>If you have already set up the initial information on the home page you can go ahead and start organizing the reception. </h4>
        <form onSubmit={handleSubmit}>
          <label>Where will the reception take place? </label>
          <input id={'L'} value={location} onChange={handleChange}></input>
          <br/>
          <label>What time will it be at? </label>
          <input id={'T'} value={time} onChange={handleChange}></input>
          <br/>
          <button>Create</button>
        </form>
      </div>
    )
  } else {
    return (
      <div>
        <p>Your Reception is currently planned for {reception.time} at {reception.location}.</p>
      </div>
    )
  }
}

export default Reception