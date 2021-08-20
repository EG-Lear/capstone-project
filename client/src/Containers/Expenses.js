import React, { useState, useEffect } from 'react'
import ExpensesUpdateForm from './ExpensesUpdateForm'

const Expenses = () => {
  const [expenses, setExpenses] = useState([])
  const [updateStatus, setUpdateStatus] = useState(false)
  const [name, setName] = useState('')
  const [cost, setCost] = useState('')
  const [description, setDescription] = useState('')
  const [updateExpense, setUpdateExpense] = useState({})


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
      let counter = 0
      expenses.forEach((expense) => {lis.push(
        <li key={counter} className={'ListElement'}><b>{expense.name}</b> <button id={counter} onClick={handleDelete}>Delete</button> <button id={counter} onClick={handleEdit}>Edit</button> <br/> Cost: {expense.cost}$ <br/> {expense.description}</li>)
        counter++
      })
    }
    return(lis)
  }
  
  const handleDelete = (event) => {
    const i = expenses[event.target.id].id
    fetch(`/expenses/${i}`, {
      method: "DELETE"
    })
    .then(res => res.json())
    .then(data => {
      if (data.errors) {
        alert(data.errors)
      } else {
        setExpenses(data)
      }
    })
  }

  const handleEdit = (event) => {
    setUpdateExpense(expenses[event.target.id])
    setUpdateStatus(true)
  }

  const renderUpdate = () => {
    if (updateStatus === false) {
      return(<div></div>)
    } else {
      return(
        <div>
          <ExpensesUpdateForm expense={updateExpense} update={handleUpdate}/>
          <button onClick={handleClick}>Cancel</button>
        </div>
      )
    }
  }

  const handleUpdate = (data) => {
    setUpdateStatus(false)
    setUpdateExpense({})
    setExpenses(data)
  }

  const handleClick = () => {
    setUpdateStatus(false)
    setUpdateExpense({})
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
    const xCost = parseInt(cost)
    fetch('/expenses',{
      method: "POST",
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
      console.log(data)
      if (data.errors) {
        alert(data.errors)
      } else {
        setExpenses(data)
        setName('')
        setCost('')
        setDescription('')
      }
    })
  }

  return (
    <div>
      <h3>Manage your various expenses for the Event.</h3>
      {renderUpdate()}
      <ul>
        {renderExpenses()}
      </ul>
      <form onSubmit={handleSubmit}>
        <h4>Add new expense</h4>
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