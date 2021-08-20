import React, { useState, useEffect } from 'react'

const ExpensesUpdateForm = ({expense, update}) => {
  const [name, setName] = useState('')
  const [cost, setCost] = useState('')
  const [description, setDescription] = useState('')

  const handleChange = (event) => {
    if (event.target.id === 'expenseUpdateName') {
      setName(event.target.value)
    } else if (event.target.id === 'expenseUpdateCost') {
      setCost(event.target.value)
    } else if (event.target.id === 'expenseUpdateDescription') {
      setDescription(event.target.value)
    }
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    const xCost = parseInt(cost)
    fetch(`/expenses/${expense.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        cost: xCost,
        description: description
      }) 
    })
    .then(res => res.json())
    .then(data => {
      if (data.errors) {
        alert(data.errors)
      } else {
        update(data)
        setName('')
        setCost('')
        setDescription('')
      }
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <h4>Editing</h4>
      <p>{expense.name}</p>
      <label>Name: </label>
      <input id={'expenseUpdateName'} value={name} onChange={handleChange}></input>
      <br/>
      <label>Cost: </label>
      <input id={'expenseUpdateCost'} value={cost} onChange={handleChange}></input>
      <br/>
      <label>Description: </label>
      <input id={'expenseUpdateDescription'} value={description} onChange={handleChange}></input>
      <br/>
      <button>Edit</button>
    </form>
  )
}

export default ExpensesUpdateForm