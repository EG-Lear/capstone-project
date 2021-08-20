import React, { useState } from 'react'

const ExpensesUpdateForm = () => {
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
  }

  return (
    <form onSubmit={handleSubmit}>
      <p>Add new expense</p>
      <label>Name: </label>
      <input id={'expenseUpdateName'} value={name} onChange={handleChange}></input>
      <br/>
      <label>Cost: </label>
      <input id={'expenseUpdateCost'} value={cost} onChange={handleChange}></input>
      <br/>
      <label>Description: </label>
      <input id={'expenseUpdateDescription'} value={description} onChange={handleChange}></input>
      <br/>
      <button>Add</button>
    </form>
  )
}

export default ExpensesUpdateForm