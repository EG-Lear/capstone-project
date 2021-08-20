import React, { useState, useEffect } from 'react'

const Expenses = () => {

  useEffect(() => {
    fetch('/expenses')
    .then(res => {
      if (res.ok) {
        res.json()
        .then(data => {
          if (data === null) {
          } else if (data.errors) {
            alert(data.errors)
          } else {

          }
        })
      }
    })
  }, [])

  return (
    <div>
      <h3>Manage your various expenses for the Event.</h3>
    </div>
  )
}

export default Expenses