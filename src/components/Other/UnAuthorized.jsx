import React from 'react'
import './other.css'
import { Link } from 'react-router-dom'
const UnAuthorized = () => {
    const role=sessionStorage.getItem("roles");
  return (
    <div className='other__container'>
        <h1>403</h1>
        <h2>Sorry, You are not Authorized to this page</h2>
        <button className='btn__btn'>
          <Link to={role==="admin"?"/admin":"/home"} className='other__link'> Home</Link>
        </button>
    </div>
  )
}

export default UnAuthorized