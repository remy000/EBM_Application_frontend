import React, { useEffect, useState } from 'react'
import { Link,useNavigate} from 'react-router-dom'
import axios from 'axios';
import './user.css'
const UserHome = () => {
    const [loading, setLoading]=useState(false);
    const tin=sessionStorage.getItem("tin");
    const token=sessionStorage.getItem("token");
    const [type, setType]=useState('')
    const [status, setStatus]=useState('');
    const [date, setDate]=useState('');
    const navigate=useNavigate();
    useEffect(()=>{
        const fetchRequest=async()=>{
            setLoading(true);
            try {
                const response=await axios.get(`http://localhost:8080/applications/findApplication/${tin}`,{
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
    
                })
                if(response.status===200){
                    const data=response.data;
                    setType(data.ebmType);
                    setStatus(data.status);
                    setDate(data.requestDate);
                    setLoading(false);
                }
                
            } catch (error) {
                setLoading(false);
                console.log(error);
                
            }
        }
        fetchRequest();
    },[tin, token]);
    const handleLogout=()=>{
        sessionStorage.removeItem("tin");
        sessionStorage.removeItem("token");
        navigate("/")
    }
  return (
    <div className='home'>
        <div className='home__contain'>
            <p className='home__p'>Welcome, {tin}</p>
            <button className='home__btn' onClick={handleLogout}>
             Logout
            </button>
        </div>
        {loading?(<h2>Loading</h2>):(
        <div className='home__content'>
            <h3 className='content__h3'>
                My Applications
            </h3>
            <div className='home__app'>
                <h2 className='app__header'>EBM Type: {type}</h2>
                <h3 className='app__header'>Status: {status}</h3>
                <h5 className='app__header'>Date: {date}</h5>
                <Link to='#' className='app__link'>Open Application</Link>
            </div>
         
            
        </div>
        )}
        <div className='home__footer'>
                <button className='footer__btn'><Link className='footer__link' to="/application">Start New Application</Link></button>  
            </div>

    </div>
  )
}

export default UserHome