import React, { useState } from 'react'

const ExpensesUpdateForm = ({expense, update}) => {
  const [name, setName] = useState('')
  const [cost, setCost] = useState('')
  const [description, setDescription] = useState('')

  const handleChange = (event) => { //handles change of input fields
    if (event.target.id === 'expenseUpdateName') {
      setName(event.target.value)
    } else if (event.target.id === 'expenseUpdateCost') {
      setCost(event.target.value)
    } else if (event.target.id === 'expenseUpdateDescription') {
      setDescription(event.target.value)
    }
  }

  const handleSubmit = (event) => { //handles submit of form
    event.preventDefault()
    let xName = expense.name
    let xCost = expense.cost
    let xDescription = expense.description
    if (name.length > 0) {
      xName = name
    }
    if (cost.length > 0) {
      xCost = parseInt(cost)
    }
    if (description.length > 0) {
      xDescription = description
    }  
    fetch(`/expenses/${expense.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: xName,
        cost: xCost,
        description: xDescription
      }) 
    })
    .then(res => res.json())
    .then(data => {
      if (data.errors) {
        alert(data.errors)
      } else {
        update(data)
      }
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <h4>Editing {expense.name}</h4>
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