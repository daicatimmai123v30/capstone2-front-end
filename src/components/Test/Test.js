import React from 'react'
import { useHistory } from 'react-router-dom'
const Test = (abc) => {
  
  const onHandle = ()=>{
    
  }

  return (
    <div>
      <p>sadkhsaf</p>
      <button onClick={()=>{
        abc.history.push('/Home')
      }}></button>
    </div>
  )
}

export default Test