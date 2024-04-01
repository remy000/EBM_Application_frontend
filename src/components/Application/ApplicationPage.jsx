import React, { useState } from 'react'
import PersonalInformation from '../../containers/PersonalInformation'
import DocumentUpload from '../../containers/DocumentUpload'
import TermsCondition from '../../containers/TermsCondition'
import Progress from '../../containers/Progress'
import './application.css'
import axios from 'axios';
import { Link,useNavigate } from 'react-router-dom'

const 
ApplicationPage = () => {
  const tin= sessionStorage.getItem("tin");
  const token=sessionStorage.getItem("token");
  const [loading, setLoading]=useState(false);
    const [step, setStep] = useState(1);
    const navigate=useNavigate();
    const [formData, setFormData] = useState({
      personalInfo: {
        tinNumber:tin,
        serialNumber:'',
        owner:'',
        ebmType:'',
        status:'pending',
      },
      documents: {
        letter: null,
        certificate: null,
        vatCertificate: null,
        idCard: null
      },
      termsAccepted:{
        term1: false,
        term2: false,
        term3: false,
        term4:false
      }
    });
    const data={
      tinNumber:formData.personalInfo.tinNumber,
      serialNumber:formData.personalInfo.serialNumber,
      owner:formData.personalInfo.owner,
      ebmType:formData.personalInfo.ebmType,
      status:formData.personalInfo.status,
      letter:formData.documents.letter,
      certificate:formData.documents.certificate,
      vatCertificate:formData.documents.vatCertificate,
      idCard:formData.documents.idCard
    }
    const nextStep = () => {
        setStep(step + 1);
      };
    
      const prevStep = () => {
        setStep(step - 1);
      };
    
      const handlePersonalInfoChange = (data) => {
        setFormData({ ...formData, personalInfo: data });
      };
    
      const handleDocumentsChange = (data) => {
        setFormData({ ...formData, documents: data });
      };
      const handleTermsChange = (accepted) => {
        setFormData({ ...formData, termsAccepted: accepted });
      };
      const handleSubmit =async () => {
        setLoading(true);
        if (!formData.termsAccepted) {
          alert("Please accept the terms and conditions to submit the application.");
          return;
        }
        try {
          const response= await axios.post("http://localhost:8080/applications/saveApplication", data, {
            headers: {
              Authorization: `Bearer ${token}`,
               'Content-Type': 'multipart/form-data',
            }
          });
          if(response.status===200){
            setLoading(false);
            console.log("application saved");
            navigate('/home');
          }
          else{
            setLoading(false);
            console.log("something went wrong")
          }
        } catch (error) {
          setLoading(false);
          console.log(error);
          
        }
        
      };
  return (
    <div className='home__container'>
      <button className='home__btns'><Link to="/home"  className='home__link'>Back</Link></button>
    
         {step === 1 && (
        <PersonalInformation
        formData={formData.personalInfo}
          nextStep={nextStep}
          onChange={handlePersonalInfoChange}
        />
      )}
      {step === 2 && (
        <DocumentUpload
         formData={formData.documents}
          nextStep={nextStep}
          prevStep={prevStep}
          onChange={handleDocumentsChange}
        />
      )}
      {step === 3 && (
        <TermsCondition
          formData={formData.termsAccepted}
          nextStep={nextStep}
          prevStep={prevStep}
          onChange={handleTermsChange}
          onSubmit={handleSubmit}
          isLoading={loading}
        />
      )}
      <Progress step={step} />
      
    </div>
  )
}

export default ApplicationPage
