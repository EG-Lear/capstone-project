import React, { useState, useEffect } from 'react'

const Attendance = () => {
  const [guestList, setGuestList] = useState({})
  const [guestName, setGuestName] = useState('')
  const [listStatus, setListStatus] = useState(false)
  const [isBride, setIsBride] = useState(false)
  const [isGroom, setIsGroom] = useState(true)
  const [pOneEntered, setPOneEntered] = useState(false)

  useEffect(() => {
    fetch('/attendances')
    .then(res => {
      if (res.ok) {
        res.json()
        .then(data => {
          if (data === null) {
            setListStatus(false)
          } else if (data.errors) {
            alert(data.errors)
          } else {
            setGuestList(data)
            setListStatus(true)
            if (data.invited >= 2) {
              setPOneEntered(true)
            }
          }
        })
      }
    })
    .then(data => setGuestList(data))
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
    } else if (event.target.id === 'L') {
      setGuestName(event.target.value)
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
        setListStatus(true)
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
        groom: isGroom,
        invited: true
      })
    })
    .then(res => res.json())
    .then(data => {
      if (data.errors) {
        alert(data.errors)
      } else {
        setGuestList(data)
        alert("successfully added")
        setGuestName('')
        if (data.invited === 2) {
          setPOneEntered(true)
        }
      }
    })
  }

  const renderInvitedGuests = () => {
    const lis = []
    if (guestList) {
      guestList.guests.forEach((guest) => {
        if (guest.invited === true) {
          lis.push(<li key={`${guest.id}`}>{guest.name} <button id={`${guest.id}`} onClick={handleDelete}>Delete</button> <button id={`${guest.id}`} value={guest.name} onClick={handleUnInvite}>Uninvite</button><p>
        </p></li>)
        }
      })
    }
    return(lis)
  }

  const renderNotInvitedGuests = () => {
    const lis = []
    if (guestList) {
      guestList.guests.forEach((guest) => {
        if (guest.invited === false) {
          lis.push(<li key={`${guest.id}`}>{guest.name} <button id={`${guest.id}`} onClick={handleDelete}>Delete</button> <button id={`${guest.id}`} value={guest.name} onClick={handleInvite}>Invite</button><p>
        </p></li>)
        }
      })
    }
    return(lis)
  }

  const handleInvite = (event) => {
    event.preventDefault()
    const i = event.target.id
    const x = event.target.value
    fetch(`/guests/${i}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: x,
        invited: true
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

  const handleUnInvite = (event) => {
    event.preventDefault()
    const i = event.target.id
    const x = event.target.value
    fetch(`/guests/${i}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: x,
        invited: false
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

  const handleDelete = (event) => {
    const i = event.target.id
    console.log(i)
    fetch(`/guests/${i}`, {
      method: "DELETE"
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

  const handleSubmit = (event) => {
    event.preventDefault()
    fetch(`/attendances/${guestList.id}/guests`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: guestName,
        invited: true
      })
    })
    .then(res => res.json())
    .then(data => {
      if (data.errors) {
        alert(data.errors)
      } else {
        setGuestList(data)
        setGuestName('')
      }
    })
  }

  if (listStatus === false) {
    return (
      <div>
        <h4>Lets get started planning your guest list!</h4>
      <button onClick={handleStartUp}>Start!</button>
    </div>
    )
  } else if (pOneEntered === false) {
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
  } else {
    return(
      <div>
        <p>Your list of guests</p>
        <ul>
          <p>Invited</p>
          {renderInvitedGuests()}
        </ul>
        <ul>
          <p>Not Invited</p>
          {renderNotInvitedGuests()}
        </ul>
        <form onSubmit={handleSubmit}>
          <p>add new guests</p>
          <label>Name: </label>
          <input id={'L'} value={guestName} onChange={handleChange}></input>
          <br/>
          <button>Add</button>
        </form>
      </div>
    )
  }
}

export default Attendance