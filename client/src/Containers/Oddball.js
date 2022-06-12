import React, { useState, useEffect } from 'react'
import Counter from './Counter'

const Oddball = () => {

  return (
    <div>
     {Counter()}
     <div className={'GameBox'}></div>
    </div>
  )
}

export default Oddball