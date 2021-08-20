import React, { useState, useEffect } from 'react'
import EventUpdateForm from './EventUpdateForm'

const Event = ({user}) => {
  const [event, setEvent] = useState({})
  const [eventStatus, setEventStatus] = useState(true)
  const [name, setName] = useState('')
  const [budget, setBudget] = useState('')
  const [dateSelected, setDateSelected] = useState(false)
  const [date, setDate] = useState('')
  const [updateStatus, setUpdateStatus] = useState(false)

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
      .then(data => {
        if (data.errors) {
          alert(data.errors)
        } else {
          setEventStatus(true)
          setEvent(data)
        }
      })
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
      .then(data => {
        if (data.errors) {
          alert(data.errors)
        } else {
          setEventStatus(true)
          setEvent(data)
        }
      })
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

  const renderDateInput = () => { //renders field to set date
    if (dateSelected === true) {
      return(
        <div>
          <label>When is the big day? </label>
          <input id={'D'} value={date} onChange={handleChange}></input>
        </div>
      )
    }
  }

  const renderDate = () => { //renders date/location
    let xDate = event.date
    let xLocation = event.location
    let xTime = event.time
    if (xDate === null) {
      xDate = "(the date has not been set)"
    }
    if (xLocation === null) {
      xLocation = "(location to be determined)"
    }
    if (xTime === null) {
      xTime = "(Time has not been set)"
    }
    return (
      <p>The big day is planned for {xDate} at {xTime} and will be located at {xLocation}.</p>
    )
  }

  const renderAllCost = () => { //renders budget information
    let rCost
    let rExpenses
    let rTotal
    if (event.reception) {
      rCost = event.reception.total_cost
      if (rCost === null) {
        rCost = '(reception has not been given any budget)'
      }
    } else {
      rCost = '(reception has not been given any budget)'
    }
    if (event.expenses) {
      rExpenses = event.expenses.length
      if (rExpenses === null) {
        rExpenses = 0
        rTotal = 0
      } else {
        rTotal = event.expenses.reduce((total, expense) => total + expense.cost, 0)
      }
    } else {
      rExpenses = 0
      rTotal = 0
    }
    return (
      <p>Your reception costs {rCost}$ and you have {rExpenses} other expenses costing {rTotal}$.</p>
    )
  }

  const renderReceptionDate = () => { //renders reception information
    let rTime
    let rLocation
    if (event.reception) {
      rTime = event.reception.time
      rLocation = event.reception.location
      if (rTime === null) {
        rTime = '(no time has been set)'
      }
      if (rLocation === null) {
        rLocation = '(no location has been set)'
      }
    } else {
      rTime = '(no time has been set)'
      rLocation = '(no location has been set)'
    }
    return (
      <p>The reception is scheduled to start at {rTime} and located at {rLocation}.</p>
    )
  }

  const renderPeople = () => { //renders number of invited people
    let xCount 
    let xCapacity = event.venue_capacity
    if (event.attendance) {
      xCount = event.attendance.invited
      if (xCount === null) {
        xCount = "(people have not yet been invited)"
      }
    } else {
      xCount = "(people have not yet been invited)"
    }
    if (xCapacity === null) {
      xCapacity = "(a maximum capacity has not been set)"
    }
    return (
      <p>The total number of people you are expecting at the event is {xCount} and you have a max capacity of {xCapacity}.</p>
    )
  }
  
  const handleClick = () => {
    if (updateStatus === false) {
      setUpdateStatus(true)
    } else {
      setUpdateStatus(false)
    }
  }

  const renderUpdate = () => {
    if (updateStatus === false) {

      return (
        <button onClick={handleClick}>Edit Event</button>
      )
    } else {
      return (
        <div>
          <EventUpdateForm ourEvent={event} update={handleUpdate}/>
          <button onClick={handleClick}>Cancel</button>
        </div>
      )
    }
  }

  const handleUpdate = (data) => {
    setUpdateStatus(false)
    setEvent(data)
  }

  if (eventStatus === true) {
    return (
      <div>
        <h4>{event.name}</h4>
        {renderDate()}
        {renderPeople()}
        <p>You have alloted a total budget of {event.total_budget}$ and have {event.available_budget}$ left to spend.</p>
        {renderAllCost()}
        {renderReceptionDate()}
        {renderUpdate()}
      </div>
    )
  } else {
    return (
      <div>
        <h2>Welcome {user}</h2>
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