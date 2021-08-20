import React, { useState, useEffect } from 'react'
import ExpensesUpdateForm from './ExpensesUpdateForm'

const Expenses = () => {
  const [expenses, setExpenses] = useState({})
  const [updateStatus, setUpdateStatus] = useState(false)
  const [name, setName] = useState('')
  const [cost, setCost] = useState('')
  const [description, setDescription] = useState('')

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
            setExpenses(data)
          }
        })
      }
    })
  }, [])

  const renderExpenses = () => {
    const lis = []
    if (expenses) {
      expenses.forEach((expense) => lis.push(<li key={`c${expense.id}`}>{expense.name} <button id={`c-${expense.id}`} onClick={handleDelete}>Delete</button> <button id={`ce-${expense.id}`} value={expense.name} onClick={handleEdit}>Edit</button><p>
      
    </p></li>))
    }
    return(lis)
  }
  
  const handleDelete = () => {

  }

  const handleEdit = () => {
    
  }

  const renderUpdate = () => {
    if (updateStatus === false) {
      return(<div></div>)
    } else {
      return(
        <div>
          <ExpensesUpdateForm />
          <button>Cancel</button>
        </div>
      )
    }
  }

  const handleChange = (event) => {
    if (event.target.id === 'expenseName') {
      setName(event.target.value)
    } else if (event.target.id === 'expenseCost') {
      setCost(event.target.value)
    } else if (event.target.id === 'expenseDescription') {
      setDescription(event.target.value)
    }
  }
  const handleSubmit = (event) => {
    event.preventDefault()
  }

  return (
    <div>
      <h3>Manage your various expenses for the Event.</h3>
      {renderUpdate()}
      <ul>
        {renderExpenses()}
      </ul>
      <form onSubmit={handleSubmit}>
        <p>Add new expense</p>
        <label>Name: </label>
        <input id={'expenseName'} value={name} onChange={handleChange}></input>
        <br/>
        <label>Cost: </label>
        <input id={'expenseCost'} value={cost} onChange={handleChange}></input>
        <br/>
        <label>Description: </label>
        <input id={'expenseDescription'} value={description} onChange={handleChange}></input>
        <br/>
        <button>Add</button>
      </form>
    </div>
  )
}

export default Expenses