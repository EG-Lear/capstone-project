import React, { useState, useEffect } from 'react'

const Event = () => {
  const [event, setEvent] = useState({})
  const [eventStatus, setEventStatus] = useState(true)

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

  if (eventStatus === true) {
    return (
      <div>

      </div>
    )
  } else {
    return (
      <div>
        <h3>Thank you for choosing EasyWed to plan your big day. To get started please enter some initial information</h3>
        <form>
          <label>Name the Occasion </label>
          <input></input>
          <br/>
          <label>What budget are you working with? </label>
          <input></input>
          <br/>
          <label>How many people does your venue hold? </label>
          <input></input>
        </form>
      </div>
    )
  }
}

export default Event