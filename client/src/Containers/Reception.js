import React, { useState, useEffect } from 'react'

const Reception = () => {
  const [location, setLocation] = useState('')
  const [time, setTime] = useState('')
  const [reception, setReception] = useState({})
  const [recepStatus, setRecepStatus] = useState(false)
  const [fName, setFName] = useState('')
  const [fCost, setFCost] = useState('')
  const [fAmount, setFAmount] = useState('')
  const [dName, setDName] = useState('')
  const [dCost, setDCost] = useState('')
  const [dAmount, setDAmount] = useState('')

  useEffect(() => {
    fetch('/receptions')
    .then(res => {
      if (res.ok) {
        res.json()
        .then(data => {
          if (data === null) {
            setRecepStatus(false)
          } else if (data.errors) {
            alert(data.errors)
          } else {
            setReception(data)
            setRecepStatus(true)
          }
        })
      }
    })
  }, [])

  const handleChange = (event) => {
    if (event.target.id === 'L') {
      setLocation(event.target.value)
    } else if (event.target.id === 'T') {
      setTime(event.target.value)
    } else if (event.target.id === 'DA') {
      setDAmount(event.target.value)
    } else if (event.target.id === 'DN') {
      setDName(event.target.value)
    } else if (event.target.id === 'DC') {
      setDCost(event.target.value)
    } else if (event.target.id === 'FN') {
      setFName(event.target.value)
    } else if (event.target.id === 'FA') {
      setFAmount(event.target.value)
    } else if (event.target.id === 'FC') {
      setFCost(event.target.value)
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    fetch('/receptions',{
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        location: location,
        time: time
      }) 
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      if (data.errors) {
        alert(data.errors)
      } else {
        setRecepStatus(true)
        setReception(data)
      }
    })
  }

  const handleFood = (event) => {
    event.preventDefault()
    const a = parseInt(fAmount)
    const c = parseInt(fCost)
    fetch(`/receptions/${reception.id}/concessions`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: fName,
        amount: a,
        cost: c
      })
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      if (data.errors) {
        alert(data.errors)
      } else {
        setReception(data)
      }
    })
  }

  const handleDeco = (event) => {
    event.preventDefault()
    const a = parseInt(dAmount)
    const c = parseInt(dCost)
    fetch(`/receptions/${reception.id}/decorations`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: dName,
        amount: a,
        cost: c
      })
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      if (data.errors) {
        alert(data.errors)
      } else {
        setReception(data)
      }
    })
  }

  const renderFood = () => {
    const lis = []


  }

  const renderDecorations = () => {
    const lis= []
    reception.decorations.forEach((deco, i) => lis.push(<li></li>))
    return(lis)
  }

  if (recepStatus === false) {
    return (
      <div>
        <h4>If you have already set up the initial information on the home page you can go ahead and start organizing the reception. </h4>
        <form onSubmit={handleSubmit}>
          <label>Where will the reception take place? </label>
          <input id={'L'} value={location} onChange={handleChange}></input>
          <br/>
          <label>What time will it be at? (please enter on a 24 hour clock format 00:00-23:59) </label>
          <input id={'T'} value={time} onChange={handleChange}></input>
          <br/>
          <button>Create</button>
        </form>
      </div>
    )
  } else {
    return (
      <div>
        <p>Your Reception is currently planned for {reception.time} at {reception.location}.</p>
        <ul>
          {renderFood()}
        </ul>
        <ul>
          {renderDecorations()}
        </ul>
        <form onSubmit={handleFood}>
          <p>You can add items to your menu here.</p>
          <label>Name: </label>
          <input id={'FN'} value={fName} onChange={handleChange}></input>
          <br/>
          <label>Amount/Units: </label>
          <input id={'FA'} value={fAmount} onChange={handleChange}></input>
          <br/>
          <label>Cost per Unit: </label>
          <input id={'FC'} value={fCost} onChange={handleChange}></input>
          <br/>
          <button>Add Concession</button>
        </form>
        <form onSubmit={handleDeco}>
          <p>You can add decorations such as tablecloths, center pieces, etc. here.</p>
          <label>Name: </label>
          <input id={'DN'} value ={dName} onChange={handleChange}></input>
          <br/>
          <label>Amount/Units: </label>
          <input id={'DA'} value ={dAmount} onChange={handleChange}></input>
          <br/>
          <label>Cost per Unit: </label>
          <input id={'DC'} value ={dCost} onChange={handleChange}></input>
          <br/>
          <button>Add Decoration</button>
        </form>
      </div>
    )
  }
}

export default Reception