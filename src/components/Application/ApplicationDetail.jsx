import React,{useState,useEffect} from 'react'
import {useParams } from 'react-router-dom';
import './application.css'
import axios from 'axios';



const ApplicationDetail = () => {
    const { tinNumber }=useParams();
    const token=sessionStorage.getItem("token");
    const [application, setApplication] = useState({
        type: '',
        status: '',
        date: '',
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
                        ebmType:data.ebmType,
                        date:data.requestDate,
                        status:data.status,
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
    <div>
        <h2>Application Details</h2>
        <div>
            <h2>{application.type}</h2>
            <h3>{application.date}</h3>
            <h3>{application.status}</h3>
            <iframe src={application.letter} title='letter'></iframe>
            <iframe src={application.certificate} title='certificate'></iframe>
            <iframe src={application.vatCertificate} title='catCertificate'></iframe>
            <iframe src={application.idCard} title='idCard'></iframe>
        </div>
    </div>
  )
}

export default ApplicationDetail