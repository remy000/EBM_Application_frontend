import React, { useState } from 'react'
import './signup.css'
import { Link,useNavigate} from 'react-router-dom'
import axios from 'axios';

const SignUp = () => {
  const navigate=useNavigate();
  const [tinNumber,setTinNumber]=useState(undefined);
  const [success,setSuccess]=useState('');
  const [loading,setLoading]=useState(false);
  const [taxPayer,setTaxPayer]=useState({
    firstName:"",
    lastName:"",
    email:"",
    phoneNumber:""
  });
  const [error,setError]=useState('');


  const fetchTaxPayer=async()=>{
    if (tinNumber.trim().length !== 9 || tinNumber.startsWith('0')) {
      setError('Invalid TIN number');
      setTaxPayer({
        firstName:"",
        lastName:"",
        email:"",
        phoneNumber:""
      })
      return;
  }
    try {
      const response=await axios.get(`http://localhost:8080/taxPayer/findPayer/${tinNumber}`);

     if(response.ok){
        const data= await response.json();
        setTaxPayer({
          firstName:data.firstName,
          lastName:data.lastName,
          email:data.email,
          phoneNumber:data.phoneNumber
        });
        setError('');
      }
      else{
        setError('No user Found with that TIN');
        setTaxPayer({
          firstName:"",
          lastName:"",
          email:"",
          phoneNumber:""
        })
      }

    } catch (error) {
      setError(error.message)
      
    }
  }


  const handleBlur=()=>{
    fetchTaxPayer();
  }

  const handleSubmit=async(e)=>{
    const roles="taxpayer";
    const email=taxPayer.email;
    const tin=tinNumber;
    setLoading(true);
    e.preventDefault();
    try{
      const response=await fetch("http://localhost:8080/users/register",{
        method:'POST',
        headers:{
          'Content-Type': 'application/json',
        },
        body:JSON.stringify({tin,email,roles},)
      });
      if(response.ok){
        setSuccess('Account Created Successfully');
      
        setTaxPayer({
          firstName:"",
          lastName:"",
          email:"",
          phoneNumber:""
        })
        navigate('/');

      }
      else{
        setError(response.statusText);
      }

    }
    catch(error){
      setError(error);

    }
  }



  return (
    <div className='signup__container'>
      <div className='signup__content'>
        <h2 className='signup__header'>Create Account</h2>
        {
          error&& <p className='signup__error'>{error}</p>
        }
        {
          success&&<p className='signup__success'>{success}</p>
        }
        <form className='signup__form' onSubmit={handleSubmit}>
          <label className='signup__label'>TIN Number</label>
          <input type='number' placeholder='enter your TIN Number' className='signup__input'
          value={tinNumber}
          onChange={e=>setTinNumber(e.target.value)}
          onBlur={handleBlur}
          
          />
          <label className='signup__label'>First Name</label>
          <input type='text' className='signup__input' disabled  value={taxPayer.firstName}/>
          <label className='signup__label'>Last Name</label>
          <input type='text' className='signup__input' value={taxPayer.lastName} disabled/>
          <label className='signup__label'>Email</label>
          <input type='email' className='signup__input' value={taxPayer.email} disabled/>
          <label className='signup__label'>phone Number</label>
          <input type='text' className='signup__input' disabled value={taxPayer.phoneNumber}/>
          <button className='signup__btn' disabled={loading}>{loading?'Please wait...':'SignUp'}</button>
          <Link to='/' className='signup__link'>Already Have an Account? Login</Link>
        </form>

      </div>
      <div className='signup__message'>
        <h1>EBM Application Portal</h1>
        <p>Let's Build Our Country Together</p>
        
      </div>

    </div>

  
  )
}

export default SignUp
