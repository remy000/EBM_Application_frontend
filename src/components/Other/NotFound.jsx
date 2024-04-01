import React from 'react'
import './other.css'
import {useNavigate } from 'react-router-dom'
const NotFound = () => {
  const navigate=useNavigate();
  const handleLogout=()=>{
    sessionStorage.removeItem("tin");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("auths");
    sessionStorage.removeItem("roles");
    navigate("/")
}
  return (
    <div className='other__container'>
        <h1>404</h1>
        <h2>Page you are trying to access Not Found</h2>

        <button className='btn__btn' onClick={handleLogout}>
          Back
        </button>
    </div>
  )
}

export default NotFound