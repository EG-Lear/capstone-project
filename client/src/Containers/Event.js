import React, { useState, useEffect } from 'react'

const Event = () => {
  const [event, setEvent] = useState({})
  const [eventStatus, setEventStatus] = useState(true)
  const [name, setName] = useState('')
  const [budget, setBudget] = useState('')
  const [venueCapacity, setVenueCapacity] = useState('')

  useEffect(() => {
    fetch('/events')
    .then(res => {
      if (res.ok) {
        res.json()
        .then(data => {
          if (data === null) {
            setEventStatus(false)
          } else if (data.errors) {
            alert(data.errors)
          } else {
            console.log(data)
            setEvent(data) 
          }
        })
      }
    })
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault()
    fetch('/events', {
      method: 'POST', 
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        budget: budget,
        venue_capactiy: venueCapacity
      })
    })
  }

  const handleChange = (event) => {
    if (event.target.id === 'N') {
      setName(event.target.value)
    } else if (event.target.id === 'B') {
      setBudget(event.target.value)
    } else if (event.target.id === 'C') {
      setVenueCapacity(event.target.value)
    }
  }

  if (eventStatus === true) {
    return (
      <div>

      </div>
    )
  } else {
    return (
      <div>
        <h3>Thank you for choosing EasyWed to plan your big day. To get started please enter some initial information</h3>
        <form onSubmit={handleSubmit}>
          <label>Name the Occasion </label>
          <input id={'N'} value={name} onChange={handleChange}></input>
          <br/>
          <label>What budget are you working with? </label>
          <input id={'B'} value={budget} onChange={handleChange}></input>
          <br/>
          <label>How many people does your venue hold? </label>
          <input id={'C'} value={venueCapacity} onChange={handleChange}></input>
        </form>
      </div>
    )
  }
}

export default Event