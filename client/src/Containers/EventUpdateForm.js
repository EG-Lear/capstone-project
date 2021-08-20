import React, { useState } from 'react'

const EventUpdateForm = ({ourEvent, update}) => {
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [location, setLocation] = useState('')
  const [capacity, setCapacity] = useState('')
  const [budget, setBudget] = useState('')
  const [name, setName] = useState('')

  const handleChange = (event) => {
    if (event.target.id === 'UD') {
      setDate(event.target.value)
    } else if (event.target.id === 'UT') {
      setTime(event.target.value)
    } else if (event.target.id === 'UL') {
      setLocation(event.target.value)
    } else if (event.target.id === 'UC') {
      setCapacity(event.target.value)
    } else if (event.target.id === 'UB') {
      setBudget(event.target.value)
    } else if (event.target.id === 'UN') {
      setName(event.target.value)
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    let uDate = ourEvent.date
    let uTime = ourEvent.time
    let uLocation = ourEvent.location
    let uCapacity = ourEvent.venue_capacity
    let uBudget = ourEvent.total_budget
    let uName = ourEvent.name
    if (date.length > 0) {
      uDate = date
    }
    if (time.length > 0) {
      uTime = time
    }
    if (location.length > 0) {
      uLocation = location
    }
    if (capacity.length > 0) {
      uCapacity = capacity
    }
    if (budget.length > 0) {
      uBudget = budget
    }
    if (name.length > 0) {
      uName = name
    }
    fetch(`/events/${ourEvent.id}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: uName,
        date: uDate,
        time: uTime,
        location: uLocation,
        venue_capacity: uCapacity,
        total_budget: uBudget
      })
    })
    .then(res => res.json())
    .then(data => {
      if (data.errors) {
        alert(data.errors)
      } else {
        update(data)
      }
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <p>Changing Event Information</p>
      <label>Event name: </label>
      <input id={'UN'} value={name} onChange={handleChange}></input>
      <label> Currently - {ourEvent.name}</label>
      <br/>
      <label>Date: </label>
      <input id={'UD'} value={date} onChange={handleChange}></input>
      <label> Currently - {ourEvent.date}</label>
      <br/>
      <label>Time: </label>
      <input id={'UT'} value={time} onChange={handleChange}></input>
      <label> Currently - {ourEvent.time}</label>
      <br/>
      <label>Location: </label>
      <input id={'UL'} value={location} onChange={handleChange}></input>
      <label> Currently - {ourEvent.location}</label>
      <br/>
      <label>Max Capacity: </label>
      <input id={'UC'} value={capacity} onChange={handleChange}></input>
      <label> Currently - {ourEvent.venue_capacity}</label>
      <br/>
      <label>Total Budget: </label>
      <input id={'UB'} value={budget} onChange={handleChange}></input>
      <label> Currently - {ourEvent.total_budget}$</label>
      <br/>
      <button>Make Changes</button>
    </form>
  )
}

export default EventUpdateForm