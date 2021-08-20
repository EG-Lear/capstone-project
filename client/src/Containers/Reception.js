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
  const [updateForm, setUpdateForm] = useState(false)
  const [eAmount, setEAmount] = useState('')
  const [eCost, setECost] = useState('')
  const [eName, setEName] = useState('')
  const [eId, setEId] = useState('')
  const [path, setPath] = useState('')
  const [recepUpdate, setRecepUpdate] = useState(false)
  const [rTime, setRTime] = useState('')
  const [rLocation, setRLocation] = useState('')
  const [arrayIndex, setArrayIndex] = useState('')

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

  const handleChange = (event) => { //handles change of input fields 
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
    } else if (event.target.id === 'EA') {
      setEAmount(event.target.value)
    } else if (event.target.id === 'EC') {
      setECost(event.target.value)
    } else if (event.target.id === 'RL') {
      setRLocation(event.target.value)
    } else if (event.target.id === 'RT') {
      setRTime(event.target.value)
    }
  }

  const handleSubmit = (event) => { //handles submit of initial form
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

  const handleFood = (event) => { //handles creation of concession items
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
        setFName('')
        setFCost('')
        setFAmount('')
      }
    })
  }

  const handleDeco = (event) => { //handles creation of decoration items
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
        setDName('')
        setDCost('')
        setDAmount('')
      }
    })
  }

  const renderFood = () => { //handles render of food items
    const lis = []
    if (reception.concessions) {
      let counter = 0
      reception.concessions.forEach((item) => {
        lis.push(<li key={`c${counter}`}>{item.name} <button id={`c-${counter}`} onClick={handleDelete}>Delete</button> <button id={`ce-${counter}`} value={item.name} onClick={handleEdit}>Edit</button><p>
        you are planning to order {item.amount} at a cost per unit of {item.cost}$ for a total cost of {item.total_cost}$
        </p></li>)
        counter++
      })
    }
    return(lis)
  }

  const renderDecorations = () => { //handles render of decorations
    const lis= []
    if (reception.decorations) {
      let counter = 0
      reception.decorations.forEach((deco) => {
        lis.push(<li key={`d${counter}`}>{deco.name} <button id={`d-${counter}`} onClick={handleDelete}>Delete</button> <button id={`de-${counter}`} value={deco.name} onClick={handleEdit}>Edit</button><p>
        you are planning to order {deco.amount} at a cost per unit of {deco.cost}$ for a total cost of {deco.total_cost}$
        </p></li>)
        counter++
      })
    }
    return(lis)
  }

  const handleDelete = (event) => { //handles delete of both concessions and decorations
    const i = event.target.id.split('-')[1]
    const x = event.target.id.split('-')[0]
    let theId
    let choice
    if (x === 'd') {
      choice = 'decorations'
      theId = reception.decorations[i].id
    } else if (x === 'c') {
      choice = 'concessions'
      theId = reception.concessions[i].id
    }
    fetch(`/${choice}/${theId}`, {
      method: "DELETE"
    })
    .then(res => res.json())
    .then(data => {
      if (data.errors) {
        alert(data.errors)
      } else {
        setReception(data)
      }
    })
  }

  const handleEdit = (event) => { //prompts render of update form and loads necessary information
    const i = event.target.id.split('-')[1]
    const x = event.target.id.split('-')[0]
    setArrayIndex(i)
    if (x === 'de') {
      setEId(reception.decorations[i].id)
    } else if (x === 'ce') {
      setEId(reception.concessions[i].id)
    }
    setEName(event.target.value)
    setPath(x)
    setUpdateForm(true)
  }

  const renderUpdateForm = () => { //renders form to update food or decoration
    if (updateForm === true) {
      return(
        <div>
          <form onSubmit={handleUpdate}>
            <p>Your are editting {eName}</p>
            <label>Change amount: </label>
            <input id={'EA'} value={eAmount} onChange={handleChange}></input>
            <br/>
            <label>Change cost: </label>
            <input id={'EC'} value={eCost} onChange={handleChange}></input>
            <br/>
            <button>Change</button>
          </form>
          <button onClick={handleCancelUpdate}>Cancel</button>
        </div>
      )
    }
  }

  const handleUpdate = (event) => { //handles update of food and decorations
    event.preventDefault()
    let a
    let c
    let choice
    if (path === 'de') {
      choice = "decorations"
      a = reception.decorations[arrayIndex].amount
      c = reception.decorations[arrayIndex].cost
    } else if (path === 'ce') {
      choice = "concessions"
      a = reception.concessions[arrayIndex].amount
      c = reception.concessions[arrayIndex].cost
    }
    if (eAmount !== '') { 
      a = parseInt(eAmount)
    } 
    if (eCost !== '') {
      c = parseInt(eCost)
    }
    fetch(`/${choice}/${eId}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: eName,
        amount: a,
        cost: c
      })
    })
    .then(res => res.json())
    .then(data => {
      if (data.errors) {
        alert(data.errors)
      } else {
        setReception(data)
        setUpdateForm(false)
        setEName('')
        setECost('')
        setEAmount('')
        setEId('')
        setPath('')
        setArrayIndex('')
      }
    })
  }

  const handleCancelUpdate = () => { //closes update form for deco/food
    setUpdateForm(false)
    setEName('')
    setECost('')
    setEAmount('')
    setEId('')
    setPath('')
    setArrayIndex('')
  }

  const handleRecepUpdate = () => { //opens for to update reception information
    setRecepUpdate(true)
    setRTime(reception.time)
    setRLocation(reception.location)
  }

  const renderRUpdate = () => { //renders form to update reception
    if (recepUpdate === true) {
      return(
        <div>               
          <form onSubmit={handleRUpdate}>
            <p>Edit Reception</p>
            <label>Change time: </label>
            <input id={'RT'} value={rTime} onChange={handleChange}></input>
            <br/>
            <label>Change location: </label>
            <input id={'RL'} value={rLocation} onChange={handleChange}></input>
            <br/>
            <button>Change</button>
          </form>
          <button onClick={handleRUpdateCancel}>Cancel</button>       
        </div>
      )
    }
  }

  const handleRUpdate = (event) => { //handles update of reception information
    event.preventDefault()
    fetch(`/receptions/${reception.id}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: reception.name,
        time: rTime,
        location: rLocation
      })
    })
    .then(res => res.json())
    .then(data => {
      if (data.errors) {
        alert(data.errors)
      } else {
        setReception(data)
        setRecepUpdate(false)
        setRTime('')
        setRLocation('')
      }
    })
  }

  const handleRUpdateCancel = () => { //prompts cancelling of reception information
    setRecepUpdate(false)
    setRTime('')
    setRLocation('')
  }

  const renderInfo = () => { //handles render of reception information
    let xCost = reception.total_cost
    if (xCost === null) {
      xCost = 0
    }
    return (
      <p>Your Reception is currently planned for {reception.time} at {reception.location} and its total cost is {xCost}$. <button onClick={handleRecepUpdate}>Change time/location</button></p>
    )
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
        {renderInfo()}
        {renderUpdateForm()}
        {renderRUpdate()}
        <div className={'ListBox'}>
          <ul className={'UList'}>
            <h4>Concessions</h4>
            {renderFood()}
          </ul>
          <ul className={'RList'}>
            <h4>Decorations</h4>
            {renderDecorations()}
          </ul>
        </div>
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