import React, { useState, useEffect } from 'react'

const Oddball = () => {
  const [counter, setCounter] = useState(0)

  const handleIncrease = () => {// increases counter by 1
    setCounter(counter + 1)
  }

  const handleDecrease = () => {// decreases counter by 1
    setCounter(counter - 1)
  }

  return (
    <div>
      <p>This is a random counter, you can increase or decrease it's count using the buttons below {counter}</p>
      <button onClick={handleIncrease}>Plus 1</button> <button onClick={handleDecrease}>Minus 1</button>
    </div>
  )
}

export default Oddball