import React, { useState, useEffect } from 'react'

const Event = () => {
  const [event, setEvent] = useState({})
  const [eventStatus, setEventStatus] = useState(true)
  const [name, setName] = useState('')
  const [budget, setBudget] = useState('')
  const [dateSelected, setDateSelected] = useState(false)
  const [date, setDate] = useState('')

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
            setEventStatus(true) 
          }
        })
      }
    })
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault()
    if (dateSelected === false) {
      fetch('/events', {
        method: 'POST', 
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: name,
          total_budget: budget
        })
      })
      .then(res => res.json())
      .then(data => console.log(data))
    } else {
      fetch('/events', {
        method: 'POST', 
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: name,
          total_budget: budget,
          date: date
        })
      })
      .then(res => res.json())
      .then(data => console.log(data))
    }
  }

  const handleChange = (event) => {
    if (event.target.id === 'N') {
      setName(event.target.value)
    } else if (event.target.id === 'B') {
      setBudget(event.target.value)
    } else if (event.target.id === 'D') {
      setDate(event.target.value)
    }
  }

  const handleSelect = (event) => {
    // console.log(event.target.value)
    if (event.target.value === 'false') {
      setDateSelected(false)
      setDate('')
    } else if (event.target.value === 'true') {
      setDateSelected(true)
    }
  }

  const renderDateInput = () => {
    if (dateSelected === true) {
      return(
        <div>
          <label>When is the big day? </label>
          <input id={'D'} value={date} onChange={handleChange}></input>
        </div>
      )
    }
  }

  const renderDate = () => {
    let xDate = event.date
    let xLocation = event.location
    if (xDate === null) {
      xDate = "(the date has not been set)"
    }
    if (xLocation === null) {
      xLocation = "(location to be determined)"
    }
    return (
      <p>The big day is planned for {xDate} and will be located at {xLocation}.</p>
    )
  }

  const renderReceptionCost = () => {

    return (
      <p>Your reception costs (to be implemented) and you have (TBI) other expenses costing (TBI).</p>
    )
  }

  const renderReceptionDate = () => {

    return (
      <p>The reception is scheduled to start at (TBI) and located at (TBI).</p>
    )
  }

  const renderPeople = () => {
    let xCount = event.head_count
    let xCapacity = event.venue_capacity
    if (xCount === null) {
      xCount = "(people have not yet been invited)"
    }
    if (xCapacity === null) {
      xCapacity = "(a maximum capacity has not been set)"
    }
    return (
      <p>The total number of people you have invited to the wedding is {xCount} and you have a max capacity of {xCapacity}.</p>
    )
  }

  if (eventStatus === true) {
    return (
      <div>
        <h4>{event.name}</h4>
        {renderDate()}
        <p>You have alloted a total budget of {event.total_budget}$ and have {event.available_budget}$ left to spend.</p>
        {renderPeople()}
        {renderReceptionCost()}
        {renderReceptionDate()}
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
          <label>What budget are you working with? $</label>
          <input id={'B'} value={budget} onChange={handleChange}></input>
          <br/>
          <label>Have you already decided on a day? </label>
          <select onChange={handleSelect}>
            <option key={'no'} value={false}>No</option>
            <option key={'yes'} value={true}>Yes</option>
          </select>
          <br/>
          {renderDateInput()}
          <button>Create</button>
        </form>
      </div>
    )
  }
}

export default Event