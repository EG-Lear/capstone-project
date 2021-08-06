import React, { useState, useEffect } from 'react'

const GuestList = () => {
  const [guestList, setGuestList] = useState({})
  const [listStatus, setListStatus] = useState(false)
  const [pOneName, setPOneName] = useState('')
  const [pTwoName, setPTwoName] = useState('')
  const [startUp, setStartUp] = useState(false)
  
  useEffect(() => {
    fetch('/guest_list')
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
          }
        })
      }
    })
  }, [])

  const handleChange = () => {

  }

  const handleStartUp = () => {

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
        <form>
          <label>Partner 1: </label>
          <input id={'P1'} value={pOneName} onChange={handleChange}></input>
          <select></select>
          <br/>
          <label>Partner 2: </label>
          <input id={'P2'} value={pTwoName} onChange={handleChange}></input>
          <select></select>
          <br/>
          <button></button>
        </form>
      </div>
    )
  }
}

export default GuestList