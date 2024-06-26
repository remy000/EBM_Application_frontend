import React, { useEffect, useState } from 'react'
import './login.css'
import { Link,useNavigate } from 'react-router-dom'
import {jwtDecode} from 'jwt-decode'
import axios from 'axios';

const Login = () => {
  const[tin,setTin]=useState();
  const [password, setPassword]=useState('');
  const [token,setToken]=useState('');
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState('');
  const navigate=useNavigate();

  const handleLogin=async(e)=>{
    e.preventDefault();
    setLoading(true);
    if (tin.trim().length !== 9 || tin.startsWith('0')) {
      setError('Invalid TIN number');
      setLoading(false);
      return;
  }
  try {
    const response=await axios.post('http://localhost:8080/users/authentication',{
      tin,
      password
    },{
      headers:{
        'Content-Type':'application/json',
        Authorization: `Bearer ${token}`,
      },

    });
   
    if(response.status===200){
      const data=await response.data;
      setToken(data.token);
    }
    else{
      if(response.status===403 || response.status===400){
      setError("Invalid Credentials");
      setLoading(false)
      }
    }
    
  } catch (error) {
    if (error.response) {
      if (error.response.status === 400) {
        setError("Invalid Credentials");
      } else if (error.response.status === 403) {
        setError("Forbidden");
      }
    } else if (error.request) {
      setError("No response received from server");
    } else {
      setError("Something went wrong");
    }
    setLoading(false);
  }
  }
  useEffect(()=>{
    if(token){
      const decodedToken=jwtDecode(token);
      const isDefault=decodedToken.isDefault;
      const role=decodedToken.roles;
      if(role.includes && role.includes('taxpayer')){
      if(isDefault&&isDefault===true){
        sessionStorage.setItem('tin',tin);
        sessionStorage.setItem('token', token);
        sessionStorage.setItem("auths", true);
        sessionStorage.setItem("roles",role);
        navigate("/forgot");
        setLoading(false);
      }
      else{
        
        sessionStorage.setItem('tin', tin);
        sessionStorage.setItem('token', token);
        sessionStorage.setItem("auths", true);
        sessionStorage.setItem("roles",role);
        navigate('/home')
        setLoading(false);
      }
    }
    if(role.includes && role.includes('admin')){
      sessionStorage.setItem('tin',tin);
        sessionStorage.setItem('token', token);
        sessionStorage.setItem("auths", true);
        sessionStorage.setItem("roles",role);
        navigate("/admin");

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
            <label className='signup__label'>TIN  or Username</label>
            <input type='number' placeholder='Enter tin or username' className='signup__input'
            value={tin}
            onChange={(e)=>setTin(e.target.value)}
            
            />
            <label className='signup__label'>Password</label>
            <input type='password' className='signup__input' placeholder='Enter password' 
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
             />

            <Link to="#" className='forgot__link'>Forgot password?</Link>
            <button className='login__btn' disabled={loading}>{loading? 'loading...' : 'Login'}</button>
            <Link to='/signup' className='login__link'> Not a Member? Signup</Link>
            

            </form>
        </div>
      
    </div>
  )
}

export default Login
