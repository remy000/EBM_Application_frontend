import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './change.css'
import axios from 'axios';

const ChangePassword = () => {
  const token=sessionStorage.getItem('token');
  const tin=sessionStorage.getItem('tin');
  const [error,setError]=useState('');
  const [oldPassword,setOldPassword]=useState('');
  const [newPassword,setNewPassword]=useState('');
  const [success,setSuccess]=useState('');
  const [loading,setLoading]=useState(false);
  const navigate=useNavigate();


  const handleChange=async(e)=>{
    e.preventDefault();
    const userId=tin;
    setLoading(true);
    try{
    
    const response=await axios.post('http://localhost:8080/users/changePassword',{
      userId,
      oldPassword,
      newPassword
    },{
      headers:{
        'Content-Type':'application/json',
        Authorization: `Bearer ${token}`,
      },

    });
    if(response.status===200){
      setSuccess("password Changed successfully");
      setLoading(false);
      navigate('/');
    }
    else{
      setError('fail to change password! try again later');
      setLoading(false);
    }

    }catch(e){
      setError(e.message);
      setLoading(false);
    }

  }
  return (
    <div className='password__container'>
         <div className='password__content'>
            <h2 className='password__header'>Password Update</h2>
            {
            error&& <p className='signup__error'>{error}</p>
            }
            {
              success&&<p className='signup__success'>{success}</p>
            }
            <form className='password__form' onSubmit={handleChange}>
            <label className='password__label'>TIN Number</label>
            <input type='number' className='password__input' disabled value={tin}/>
            <label className='password__label'>Old Password</label>
            <input type='password' className='password__input' placeholder='Enter password'
            value={oldPassword}
            onChange={(e)=>setOldPassword(e.target.value)}
            />
            <label className='password__label'>New Password</label>
            <input type='password' className='password__input' placeholder='Enter password'
            value={newPassword}
            onChange={(e)=>setNewPassword(e.target.value)}
            />
            <button className='password__btn'>{loading?'changing....':'Change Password'}</button>
            

            </form>
        </div>
    </div>
  )
}

export default ChangePassword
