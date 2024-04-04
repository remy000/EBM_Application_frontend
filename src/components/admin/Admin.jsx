import React, { useEffect, useState } from 'react'
import './admin.css'
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
import { InfinitySpin} from 'react-loader-spinner'

const Admin = () => {
    const token=sessionStorage.getItem("token");
    const [applications,setApplications]=useState([]);
    const [loading,setLoading]=useState(false);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [feedback,setFeedback]=useState('');
    const[sending,setSending]=useState(false);
    const [userTin, setUserTin]=useState(null);
    const navigate=useNavigate();
    useEffect(()=>{
        const fetchRequests=async()=>{
            try {
                const response=await axios.get(`http://localhost:8080/applications/allApplications`,{
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
    
                })
                if(response.status===200){
                    const data=response.data;
                    setApplications(data);
                    setLoading(false);
                }
                else{
                    console.log(response.status);
                }

                
            } catch (error) {
                console.log(error);
                
            }
        }
        fetchRequests();
    },[token]);

    const handleLogout=()=>{
        sessionStorage.removeItem("tin");
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("auths");
        sessionStorage.removeItem("roles");
        navigate("/")
    }
    
    const fetchData=async(tinNumber)=>{
        try {
            const response=await axios.get(`http://localhost:8080/applications/findApplication/${tinNumber}`,{
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
    
                })
                if(response.status===200){
                    const data=response.data;
                    setSelectedRequest(data);
                    setIsModalOpen(true); 
                }
                else{
                    console.log(response.status);
                }
            
        } catch (error) {
            console.log(error)
            
        }

    }
    const handleCloseModal = () => {
        setSelectedRequest(null);
        setIsModalOpen(false); 
    };
     
    const filterByTin=userTin?
    applications.filter((application)=>application.tinNumber.includes(userTin))
    :applications;




    const approveRequest=async(tinNumber)=>{
        setSending(true);
        try {
            const response=await axios.post(`http://localhost:8080/applications/approve/${tinNumber}`,{feedback},{
                headers:{
                    Authorization:`Bearer ${token}`,
                    'Content-Type': 'application/json'
                }

            })
            if(response.status===200){
                console.log("application approved");
                setSending(false);
                setFeedback('');

            }
            else{
                console.log(response.status);
                setSending(false);
           
            }
            
        } catch (error) {
            console.log(error);
            setSending(false);
            
            
        }

    }









  return (
    <div className='admin__container'>
        <div>
        <div className='home__contain'>
            <p className='home__p'>Welcome, Admin</p>
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
            <div className='admin__home'>
                    <h1 className='admin__header'>All Applications</h1>
              
                <div className='search__div'>
                    <input placeholder='search' type='text' className='search__input'
                     value={userTin}
                     onChange={(e)=>setUserTin(e.target.value)}
                     onKeyDown={()=>filterByTin}
                    
                    />
                    <buttton className='search__btn'>Sort by Date</buttton>
                </div>
              <table>
                 <thead>
                    <tr>
                    <th className='header__th'>#</th>
                    <th className='header__th'>Tin Number</th>
                    <th className='header__th'>EBM Type</th>
                    <th className='header__th'>Owner</th>
                    <th className='header__th'>Request Date</th>
                    <th className='header__th'>Status</th>
                    <th className='header__th'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        applications.map((req)=>(
                            <tr key={req.id}>
                                <td>{req.id}</td>
                                <td>{req.tinNumber}</td>
                                <td>{req.ebmType}</td>
                                <td>{req.owner}</td>
                                <td>{req.requestDate}</td>
                                <td>{req.status}</td>
                                <td>
                                    <button className='view__btn' onClick={()=>fetchData(req.tinNumber)}>
                                        View
                                    </button>
                                    <button className='delete__btn'>
                                        Delete
                                    </button>
                                </td>
                            

                            </tr>
                        ))
                    }

                </tbody>

             </table>
             {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={handleCloseModal}>×</span>
                        <div>
           <h2 className='app__heads'> Tax Payer Information</h2>
            <div className='app__contents'>
            <h2 className='content__headers'>TIN Number: {selectedRequest.tinNumber}</h2>
            <h2 className='content__headers'>EBM Type: {selectedRequest.ebmType}</h2>
            <h3 className='content__headers'>EBM Owner: {selectedRequest.owner}</h3>
            <h3 className='content__headers'>serial Number: {selectedRequest.serialNumber}</h3>
            <h3 className='content__headers'>Request Date: {selectedRequest.requestDate}</h3>
            <h3 className='content__headers'> Application Status: {selectedRequest.status}</h3>
          

            </div>
            <div className='app__filess'>
            <h2 className='app__heads'> Confirmation letter</h2>
            <iframe className='filess' src={selectedRequest.letterPath} title='letter'></iframe>
            <h2 className='app__heads'> RDB Certificate</h2>
            <iframe className='filess' src={selectedRequest.certPath} title='certificate'></iframe>
            <h2 className='app__heads'> VAT Certificate</h2>
            <iframe className='filess' src={selectedRequest.vatPath} title='catCertificate'></iframe>
            <h2 className='app__heads'> ID Card</h2>
            <iframe className='filess' src={selectedRequest.idPath} title='idCard'></iframe>
            </div>
           
           
            </div>
            {selectedRequest.status==="pending"?(
                <>
            <h4 className='feedback__header'>Feedback</h4>
             <div className="feedback__input">
                <textarea type='text' multiple className='inputs'
                value={feedback}
                onChange={(e)=>setFeedback(e.target.value)}
                />
             </div>
           
             <div className="feedback__btn">
                <button className='approve__btn' 
                onClick={()=>{approveRequest(selectedRequest.tinNumber)}
                } 
                >
                    {
                        sending?"sending...":
                        "Approve"
                    }
                </button>
                <button className='decline__btn'>Decline</button>
             </div>
             </>
            ):(
                <>
                <div className='empty__div'></div>
                </>
            )
                }
                        
                    </div>
                </div>
            )}
            </div>
        )
                }
        </div>
      
    </div>
  )
}

export default Admin
