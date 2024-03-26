import React, { useEffect, useState } from 'react'
import './login.css'
import { Link,useNavigate } from 'react-router-dom'
import {jwtDecode} from 'jwt-decode'

const Login = () => {
  const[tin,setTin]=useState();
  const [password, setPassword]=useState('');
  const [token,setToken]=useState('');
  // const [isLoggedIn,setIsLoggedIn]=useState(false);
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState('');
  const navigate=useNavigate();

  const handleLogin=async(e)=>{
    e.preventDefault();
    setLoading(true);
    if (tin.trim().length !== 9 || tin.startsWith('0')) {
      setError('Invalid TIN number');
      return;
  }
  try {
    const response=await fetch('http://localhost:8080/users/authentication',{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({tin,password})

    });
   
    if(response.ok){
      const data=await response.json();
      setToken(data.token);
    }
    else{
      console.log(response.statusText);
      setError("Invalid Credentials");
      setLoading(false)
    }
    
  } catch (error) {
    console.error('Login failed:', error);
    setError('Something went wrong');
    setLoading(false);
  }
  }
  useEffect(()=>{
    if(token){
      const decodedToken=jwtDecode(token);
      const isDefault=decodedToken.isDefault;

      if(isDefault&&isDefault===true){
        sessionStorage.setItem('tin',tin);
        sessionStorage.setItem('token', token);
        navigate("/forgot");
        setLoading(false);
      }
      else{
        sessionStorage.setItem('tin', tin);
        sessionStorage.setItem('token', token);
        navigate('/home')
        setLoading(false);
      }
    }
    
  },[navigate, tin, token]);

  return (
    <div className='login__container'>
        <div className='login__content'>
            <h2 className='login__header'>Login</h2>
            {
               error&& <p className='signup__error'>{error}</p>
            }
            <form className='login__form' onSubmit={handleLogin}>
            <label className='signup__label'>TIN Number</label>
            <input type='number' placeholder='Enter TIN Number' className='signup__input'
            value={tin}
            onChange={(e)=>setTin(e.target.value)}
            
            />
            <label className='signup__label'>Password</label>
            <input type='password' className='signup__input' placeholder='Enter password' 
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
             />

            <Link to="/forgot" className='forgot__link'>Forgot password?</Link>
            <button className='login__btn' disabled={loading}>{loading? 'loading...' : 'Login'}</button>
            <Link to='/signup' className='login__link'> Not a Member? Signup</Link>
            

            </form>
        </div>
      
    </div>
  )
}

export default Login
