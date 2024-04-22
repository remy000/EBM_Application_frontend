import React,{useState,useEffect} from 'react'
import {Link, useParams } from 'react-router-dom';
import './application.css'
import axios from 'axios';
import { InfinitySpin} from 'react-loader-spinner'



const ApplicationDetail = () => {
    const { tinNumber }=useParams();
    const token=sessionStorage.getItem("token");
    const [application, setApplication] = useState({
        type: '',
        status: '',
        date: '',
        owner:'',
        serialNumber:'',
        letter: null,
        certificate: null,
        vatCertificate:null,
        idCard:null,
    });
    const [loading,setLoading]=useState(false);

    useEffect(()=>{
        const fetchRequest=async()=>{
            setLoading(true);
            try {
                const response=await axios.get(`http://localhost:8080/applications/findApplication/${tinNumber}`,{
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
    
                })
                if(response.status===200){
                    const data=response.data;
                    setApplication({
                        type:data.ebmType,
                        date:data.requestDate,
                        status:data.status,
                        owner:data.owner,
                        serialNumber:data.serialNumber,
                        letter:data.letterPath,
                        certificate:data.certPath,
                        vatCertificate:data.vatPath,
                        idCard:data.idPath


                    });
                    setLoading(false);
                }
                
            } catch (error) {
                setLoading(false);
                
                
            }
        }
        fetchRequest();
    },[tinNumber,token]);



  return (
    <div className='contain'>
        <button className='home__btns'><Link to="/home"  className='home__link'>Back</Link></button>
        <h2 className='app__headers'>Application Details</h2>
        {loading?(
            <>
            <div className='loading'>
            <InfinitySpin color='white'/>
            <h2 className='loading__header'>Loading</h2>
        </div>
            </>
        ):(
        <div>
           <h2 className='app__head'> Tax Payer Information</h2>
            <div className='app__content'>
            <h2 className='content__header'>EBM Type: {application.type}</h2>
            <h3 className='content__header'>EBM Owner: {application.owner}</h3>
            <h3 className='content__header'>serial Number: {application.serialNumber}</h3>
            <h3 className='content__header'>Request Date: {application.date}</h3>
            <h3 className='content__header'> Application Status: <span style={{color:application.status==="approved"?"green"
                 :application.status==="rejected"?"red":"black"}}
            >{application.status}</span></h3>
          

            </div>
            <div className='app__files'>
            <h2 className='app__head'> RRA Confirmation letter</h2>
            <iframe className='files' src={application.letter} title='letter'></iframe>
            <h2 className='app__head'> Registration Certificate</h2>
            <iframe className='files' src={application.certificate} title='certificate'></iframe>
            <h2 className='app__head'> VAT Certificate</h2>
            <iframe className='files' src={application.vatCertificate} title='catCertificate'></iframe>
            <h2 className='app__head'> ID Card</h2>
            <iframe className='files' src={application.idCard} title='idCard'></iframe>
            </div>
           
           
        </div>
        )
      }
    </div>
  )
}

export default ApplicationDetail