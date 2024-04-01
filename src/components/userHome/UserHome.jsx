import React, { useEffect, useState } from 'react'
import { Link,useNavigate} from 'react-router-dom'
import axios from 'axios';
import { InfinitySpin} from 'react-loader-spinner'
import './user.css'
const UserHome = () => {
    const [loading, setLoading]=useState(false);
    const tin=sessionStorage.getItem("tin");
    const token=sessionStorage.getItem("token");
    const [application, setApplication] = useState({
        type: '',
        status: '',
        date: ''
    });
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
                    setApplication({
                        type: data.ebmType,
                        status: data.status,
                        date: data.requestDate
                    });
                    setLoading(false);
                }
                
            } catch (error) {
                setLoading(false);
                
                
            }
        }
        fetchRequest();
    },[tin, token]);

    const handleLogout=()=>{
        sessionStorage.removeItem("tin");
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("auths");
        sessionStorage.removeItem("roles");
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
        {loading?(<>
        <div className='loading'>
            <InfinitySpin color='white'/>
            <h2 className='loading__header'>Loading</h2>
        </div>
        </>
        ):(
        <div className='home__content'>
            <h3 className='content__h3'>
                My Application
            </h3>
            {
                application.type || application.status || application.date?(
            <div className='home__app'>
                <h2 className='app__header'>EBM Type: {application.type}</h2>
                <h3 className='app__header'>Status: {application.status}</h3>
                <h5 className='app__header'>Date: {application.date}</h5>
                <Link to={`/applicationDetail/${tin}`} className='app__link'>Open Application</Link>
            </div>
                ):(
                    <h2 className='not__found'>No Application Found</h2>
                )
}
         
            
        </div>
        )}
       
        <div className='home__footer'>
                <button className='footer__btn'><Link className='footer__link' to="/application">Start New Application</Link></button>  
            </div>

    </div>
  )
}

export default UserHome