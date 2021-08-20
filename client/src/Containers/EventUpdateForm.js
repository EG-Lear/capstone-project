import React, { useState, useEffect } from 'react'

const EventUpdateForm = ({event}) => {
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [location, setLocation] = useState('')
  const [capacity, setCapacity] = useState('')
  const [budget, setBudget] = useState(event.total_budget)

  const handleSubmit = () => {
    
  }

  const handleChange = () => {

  }

  return (
    <form onSubmit={handleSubmit}>
      <p>Changing Event Information</p>
      <label>Date: </label>
      <input value={date} onChange={handleChange}></input>
      <br/>
      <label>Time: </label>
      <input value={time} onChange={handleChange}></input>
      <br/>
      <label>Location: </label>
      <input value={location} onChange={handleChange}></input>
      <br/>
      <label>Max Capacity: </label>
      <input value={capacity} onChange={handleChange}></input>
      <br/>
      <label>Total Budget: </label>
      <input value={budget} onChange={handleChange}></input>
      <br/>
      <button>Make Changes</button>
    </form>
  )
}

export default EventUpdateForm