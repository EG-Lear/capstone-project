import React, { useState, useEffect } from 'react'

const Attendance = () => {
  const [guestList, setGuestList] = useState({})
  const [guestName, setGuestName] = useState('')
  const [listStatus, setListStatus] = useState(false)
  const [isBride, setIsBride] = useState(false)
  const [isGroom, setIsGroom] = useState(true)
  const [pOneEntered, setPOneEntered] = useState(false)
  const [isBridesmaid, setIsBridesmaid] = useState(false)
  const [isGroomsmen, setIsGroomsmen] = useState(false)
  const [isFamily, setIsFamily] = useState(false)
  const [plusOne, setPlusOne] = useState(false)
  const [updating, setUpdating] = useState(false)
  const [upName, setUpName] = useState('')
  const [guestId, setGuestId] = useState(0)
  const [toUpName, setToUpName] = useState('')
  const [uBridesmaid, setUBridesmaid] = useState(false)
  const [uGroomsmen, setUGroomsmen] = useState(false)
  const [uFamily, setUFamily] = useState(false)
  const [uPlusOne, setUPlusOne] = useState(false)
  const [uBride, setUBride] = useState(false)
  const [uGroom, setUGroom] = useState(false)

  useEffect(() => {//loads data when page loads or refreshes
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

  const handleChange = (event) => {//changes state when user interacts with webpage
    // console.log(event.target.value) O BM GM F PF PT
    if (event.target.id === 'P') {
      setGuestName(event.target.value)
    } else if (event.target.value === 'Groom') {
      setIsGroom(true)
      setIsBride(false)
    } else if (event.target.value === 'Bride') {
      setIsGroom(false)
      setIsBride(true)
    } else if (event.target.id === 'L') {
      setGuestName(event.target.value)
    } else if (event.target.value === 'O') {
      setIsGroomsmen(false)
      setIsBridesmaid(false)
      setIsFamily(false)
    } else if (event.target.value === 'BM') {
      setIsGroomsmen(false)
      setIsBridesmaid(true)
      setIsFamily(false)
    } else if (event.target.value === 'GM') {
      setIsGroomsmen(true)
      setIsBridesmaid(false)
      setIsFamily(false)
    } else if (event.target.value === 'F') {
      setIsGroomsmen(false)
      setIsBridesmaid(false)
      setIsFamily(true)
    } else if (event.target.value === 'PT') {
      setPlusOne(true)
    } else if (event.target.value === 'PF') {
      setPlusOne(false)
    } else if (event.target.id === 'UN') {
      setToUpName(event.target.value)
    } else if (event.target.value === 'UPF') {
      setUPlusOne(false)
    } else if (event.target.value === 'UPT') {
      setUPlusOne(true)
    }
  }

  const handleUpdateChange = (event) => {
    setUFamily(false)
    setUGroom(false)
    setUBride(false)
    setUBridesmaid(false)
    setUGroomsmen(false)
    if (event.target.value === 'UF') {
      setUFamily(true)
    } else if (event.target.value === 'UBM') {
      setUBridesmaid(true)
    } else if (event.target.value === 'UGM') {
      setUGroomsmen(true)
    } else if (event.target.value === 'UGroom') {
      setUGroom(true)
    } else if (event.target.value === 'UBride') {
      setUBride(true)
    }
  }

  const handleStartUp = () => {//handles creation of attendance model
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

  const handleCouple = (event) => {//hangles creation of couple on initial set up
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

  const renderInvitedGuests = () => {//renders invited guests
    const lis = []
    if (guestList) {
      guestList.guests.forEach((guest) => {
        let tag = null
        let extra = null
        if (guest.bridesmaid) {
          tag = '(Bridesmaid)'
        } else if (guest.groomsmen) {
          tag = '(Groomsmen)'
        } else if (guest.family) {
          tag = '(Family)'
        } 
        if (guest.plus_one === true) {
          extra = '(+1)'
        }
        if (guest.groom || guest.bride === true) {
        } else if (guest.invited === true) {
          lis.push(<li key={`${guest.id}`}>{guest.name} {tag} {extra} <button id={`${guest.id}`} value={guest.name} onClick={updateActive}>Edit</button> <button id={`${guest.id}`} onClick={handleDelete}>Delete</button> <button id={`${guest.id}`} value={guest.name} onClick={handleUnInvite}>Uninvite</button><p>
        </p></li>)
        }
      })
    }
    return(lis)
  }

  const renderNotInvitedGuests = () => {// renders guest not currently invited
    const lis = []
    if (guestList) {
      guestList.guests.forEach((guest) => {
        let tag = null
        if (guest.groom) {
          tag = '(Groom)'
        } else if (guest.bride) {
          tag = '(Bride)'
        } else if (guest.bridesmaid) {
          tag = '(Bridesmaid)'
        } else if (guest.groomsmen) {
          tag = '(Groomsmen)'
        } else if (guest.family) {
          tag = '(Family)'
        } 
        if (guest.invited === false) {
          lis.push(<li key={`${guest.id}`}>{guest.name} {tag} <button id={`${guest.id}`} value={guest.name} onClick={updateActive}>Edit</button> <button id={`${guest.id}`} onClick={handleDelete}>Delete</button> <button id={`${guest.id}`} value={guest.name} onClick={handleInvite}>Invite</button><p>
        </p></li>)
        }
      })
    }
    return(lis)
  }

  const handleInvite = (event) => { //invites guest
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

  const handleUnInvite = (event) => { //uninvites a guest
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
        invited: false,
        plus_one: false
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

  const handleDelete = (event) => { //deletes a guest from list
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

  const handleSubmit = (event) => { //creates new guest
    event.preventDefault()
    fetch(`/attendances/${guestList.id}/guests`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: guestName,
        invited: true,
        groomsmen: isGroomsmen,
        bridesmaid: isBridesmaid,
        family: isFamily,
        plus_one: plusOne
      })
    })
    .then(res => res.json())
    .then(data => {
      if (data.errors) {
        alert(data.errors)
      } else {
        setGuestList(data)
        setGuestName('')
        setIsGroomsmen(false)
        setIsBridesmaid(false)
        setIsFamily(false)
        setPlusOne(false)
      }
    })
  }

  const renderCouple = () => { //renders the couple
    const lis = []
    if (guestList) {
      let tag = null
      guestList.guests.forEach((guest) => {
        if (guest.bride === true) {
          tag = "(Bride)"
        } else if (guest.groom === true) {
          tag = '(Groom)'
        }
        if (guest.groom || guest.bride === true) {
          lis.push(<li key={`${guest.id}`}>{guest.name} {tag} <button id={`${guest.id}`} value={guest.name} onClick={updateActive}>Edit</button> <button id={`${guest.id}`} onClick={handleDelete}>Delete</button> </li>)
        }
      })
    }
    return(lis)
  }

  const renderUpdateForm = () => { // renders update form
    if (updating === true) {
      return(
        <div>
          <form onSubmit={handleUpdate}>
            <p>Updating {upName}</p>
            <label>Name: </label>
            <input id={'UN'} value={toUpName} onChange={handleChange}></input>
            <br/>
            <label>Affiliation/Wedding Party </label>
            <select onChange={handleUpdateChange}>
              <option value={'UO'}>Other</option>
              <option value={'UBM'}>Bridesmaid</option>
              <option value={'UGM'}>Groomsmen</option>
              <option value={'UF'}>Family</option>
              <option value={"UGroom"} >Groom</option>
              <option value={"UBride"}>Bride</option>
            </select>
            <br/> 
            <label>Give them a plus one? </label>
            <select onChange={handleChange}>
              <option value={'UPF'}>no</option>
              <option value={'UPT'}>yes</option>
            </select>
            <br/>
            <button>Make Change</button>
          </form>
          <button onClick={cancelUpdate}>Cancel</button>
        </div>
      )
    }
  }

  const handleUpdate = (event) => { //updates guest information
    event.preventDefault()
    const i = parseInt(guestId)
    fetch(`/guests/${i}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: toUpName,
        groomsmen: uGroomsmen,
        bridesmaid: uBridesmaid,
        family: uFamily,
        plus_one: uPlusOne,
        groom: uGroom,
        bride: uBride
      })
    })
    .then(res => res.json())
    .then(data => {
      if (data.errors) {
        alert(data.errors)
      } else {
        setGuestList(data)
        cancelUpdate()
      }
    })
  }

  const cancelUpdate = () => { // prompts unrender of update form
    setUpdating(false)
    setUpName('')
    setIsGroomsmen(false)
    setIsBridesmaid(false)
    setIsFamily(false)
    setPlusOne(false)
    setToUpName('')
    setGuestId('')
  }

  const updateActive = (event) => {// prompts update render
    setUpName(event.target.value)
    setToUpName(event.target.value)
    setGuestId(event.target.id)
    if (updating === false) {
      setUpdating(true)
    } 
  }

  const renderCount = () => {
    if (guestList.invited !== undefined) {
      return (
        <p>You have invited {guestList.invited - 2} people.</p> 
      )
    }
  }

  if (listStatus === false) {//renders greeting on first load
    return (
      <div>
        <h4>Lets get started planning your guest list!</h4>
      <button onClick={handleStartUp}>Start!</button>
    </div>
    )
  } else if (pOneEntered === false) {//renders form to create the couple
    return (
      <div>
        <p>For now we recommend you begin by entering the lucky couple</p>
        {renderCouple()}
        {renderUpdateForm()}
        <form onSubmit={handleCouple}>
          <label>Partner: </label>
          <input id={'P'} value={guestName} onChange={handleChange}></input>
          <select onChange={handleChange}>
            <option value={"Groom"} >Groom</option>
            <option value={"Bride"}>Bride</option>
          </select>
          <br/>
          <button>Add Partner</button>
        </form>
      </div>
    ) 
  } else { //renders the main feature of page
    return(
      <div>
        <h3>The lucky couple</h3>
        {renderCouple()}
        <h3>Your list of guests</h3>
        {renderCount()}
        {renderUpdateForm()}
        <ul>
          <h5>Invited</h5>
          {renderInvitedGuests()}
        </ul>
        <ul>
          <h5>Not Invited</h5>
          {renderNotInvitedGuests()}
        </ul>
        <form onSubmit={handleSubmit}>
          <h5>add new guests</h5>
          <label>Name: </label>
          <input id={'L'} value={guestName} onChange={handleChange}></input>
          <br/>
          <label>Affiliation/Wedding Party </label>
          <select onChange={handleChange}>
            <option value={'O'}>Other</option>
            <option value={'BM'}>Bridesmaid</option>
            <option value={'GM'}>Groomsmen</option>
            <option value={'F'}>Family</option>
          </select>  
          <br/>
          <label>Give them a plus one? </label>
          <select onChange={handleChange}>
            <option value={'PF'}>no</option>
            <option value={'PT'}>yes</option>
          </select>
          <br/>
          <button>Add</button>
        </form>
      </div>
    )
  }
}

export default Attendance