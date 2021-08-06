import React, { useState, useEffect } from 'react'

const Attendance = () => {
  const [guestList, setGuestList] = useState({})
  const [listStatus, setListStatus] = useState(false)
  const [guestName, setGuestName] = useState('')
  const [startUp, setStartUp] = useState(false)
  const [pOneEntered, setPOneEntered] = useState('')
  const [isBride, setIsBride] = useState(false)
  const [isGroom, setIsGroom] = useState(true)
  
  useEffect(() => {
    fetch('/attendances')
    .then(res => {
      if (res.ok) {
        res.json()
        .then(data => {
          if (data === null) {
            setStartUp(false)
          } else if (data.errors) {
            alert(data.errors)
          } else {
            setGuestList(data)
            setStartUp(true)
            if (data.guests[0] === undefined) {
              setListStatus(false)
            } else if (data.errors) {
              alert(data.errors)
            } else {
              setListStatus(true)
            }
          }
        })
      }
    })
  }, [])

  const handleChange = (event) => {
    if (event.target.id === 'P') {
      setGuestName(event.target.value)
    } else if (event.target.id === 'G') {
      setIsGroom(true)
      setIsBride(false)
    } else if (event.target.id === 'B') {
      setIsGroom(false)
      setIsBride(true)
    }
  }

  const handleStartUp = () => {
    fetch('/attendances', {
      method: 'POST', 
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        invited: 0
      })
    })
    .then(res => res.json())
    .then(data => {
      if (data.errors) {
        alert(data.errors)
      } else {
        setStartUp(true)
        setGuestList(data)
      }
    })
  }

  const handleCouple = (event) => {
    event.preventDefault()
    fetch(`/attendances/${guestList.id}/guests`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: guestName,
        bride: isBride,
        groom: isGroom
      })
    })
    .then(res => res.json())
    .then(data => {
      if (data.errors) {
        alert(data.errors)
      } else {
        setGuestList(data)
        if (pOneEntered === false) {
          setPOneEntered(true)
        } else {
          setListStatus(true)
        }
      }
    })
  }

  if (startUp === false) {
    return (
      <div>
        <h4>Lets get started planning your guest list!</h4>
        <button onClick={handleStartUp}>Start!</button>
      </div>
    )
  } else if (listStatus === false) {
    return (
      <div>
        <p>For now lets begin by entering our lucky couple</p>
        <form onSubmit={handleCouple}>
          <label>Partner 1: </label>
          <input id={'P'} value={guestName} onChange={handleChange}></input>
          <select onChange={handleChange}>
            <option id={'G'}>Groom</option>
            <option id={'B'}>Bride</option>
          </select>
          <br/>
          <button>Add our first Partner</button>
        </form>
      </div>
    )
  } else if (pOneEntered === false) {
    <form onSubmit={handleCouple}>
      <label>Partner 2: </label>
      <input id={'P'} value={guestName} onChange={handleChange}></input>
      <select onChange={handleChange}>
        <option id={'G'}>Groom</option>
        <option id={'B'}>Bride</option>
      </select>
      <br/>
      <button>Add the second Partner</button>
    </form>
  }
}

export default Attendance