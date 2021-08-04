import React, { useState, useEffect } from 'react'

const Event = () => {
  const [event, setEvent] = useState({})

  useEffect(() => {
    fetch('/events')
    .then(res => {
      if (res.ok) {
        res.json()
        .then(data => {
          if (data.errors) {
            alert(data.errors)
          } else {
            console.log(data)
            setEvent(data) 
          }
        })
      }
    })
  }, [])

  return (
    <div>

    </div>
  )
}

export default Event