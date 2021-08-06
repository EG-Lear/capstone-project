import React, { useState, useEffect } from 'react'

const Attendance = () => {
  const [guestList, setGuestList] = useState({})
  const [guestName, setGuestName] = useState('')
  const [listStatus, setListStatus] = useState(false)
  const [isBride, setIsBride] = useState(false)
  const [isGroom, setIsGroom] = useState(true)

  useEffect(() => {
    fetch('/attendances')
    .then(res => {
      if (res.ok) {
        res.json()
        .then(data => {
          console.log(data)
          if (data === null) {
            setListStatus(false)
          } else if (data.errors) {
            alert(data.errors)
          } else {
            console.log("here")
            setGuestList(data)
            setListStatus(true)
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
      }
    })
  }

  if (listStatus === true) {
    return (
    <div>
      <p>couple completed</p>
    </div>
    )
  } else if (listStatus === false) {
      <div>
        <h4>Lets get started planning your guest list!</h4>
        <button onClick={handleStartUp}>Start!</button>
      </div>
  } else {
    return (
      <div>
        <p>For now we recommend you begin by entering the lucky couple</p>
        <form onSubmit={handleCouple}>
          <label>Partner: </label>
          <input id={'P'} value={guestName} onChange={handleChange}></input>
          <select onChange={handleChange}>
            <option id={'G'}>Groom</option>
            <option id={'B'}>Bride</option>
          </select>
          <br/>
          <button>Add Partner</button>
        </form>
      </div>
    )
  }
}

export default Attendance