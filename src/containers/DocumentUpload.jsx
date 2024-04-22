import React, { useEffect, useState } from 'react'
import './global.css'

const DocumentUpload = ({nextStep, prevStep, onChange,formData}) => {
  const [files, setFiles] = useState(formData);
  const [isValid, setIsValid] = useState(false);
  useEffect(() => {
    setFiles(formData);
    validateFiles(formData);
  }, [formData]);
  
  const validateFiles = (formData) => {
    const { letter, certificate, vatCertificate, idCard } = formData;
    const areFilesChosen = letter && certificate && vatCertificate && idCard;
    setIsValid(areFilesChosen);
  };
  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type !== 'application/pdf') {
      alert('Please select a PDF file.');
      return;
    }
  
    const updatedFiles = { ...files, [e.target.name]: file };
    const { name, files: selectedFile } = e.target;
    validateFiles({ ...files, [name]: selectedFile[0] });
    setFiles(updatedFiles);
    onChange(updatedFiles);
  }

  const handleContinue = (e) => {
    e.preventDefault();
    if (isValid) {
      nextStep();
    } else {
      alert("Please select all files to proceed.");
    }
  };

const handleBack = (e) => {
        e.preventDefault();
        prevStep();
      };
  return (
    <div className='container'>
         <h2 className='headerss'>Documents Upload</h2>
      <form className='form__data'>
        <label className='form__label'> Request Letter</label>
          <input
          className='form__input'
            type="file"
            name="letter"
            accept=".pdf"
            onChange={handleChange}
          />
          {files.letter && <p className='document__file'>Selected file: {files.letter.name}</p>}
       
        <br />
        <label className='form__label'> Registration Certificate</label>
          <input
          className='form__input'
            type="file"
            name="certificate"
            accept=".pdf"
            onChange={handleChange}
          />
            {files.certificate && <p className='document__file'>Selected file: {files.certificate.name}</p>}

        <label className='form__label'> VAT Certificate</label>
         
          <input
          className='form__input'
            type="file"
            name="vatCertificate"
            accept=".pdf"
            onChange={handleChange}
          />
          {files.vatCertificate && <p className='document__file'>Selected file: {files.vatCertificate.name}</p>}

        <label className='form__label'> ID Card</label>
          <input
          className='form__input'
            type="file"
            name="idCard"
            accept=".pdf"
            onChange={handleChange}
          />
          {files.idCard && <p className='document__file'>Selected file: {files.idCard.name}</p>}
       <div className='upload__btn'>
       <button className='next__btn' onClick={handleBack}>Back</button>
        <button className='next__btn' onClick={handleContinue}>Next</button>

       </div>
        
      </form>
      
    </div>
  )
}

export default DocumentUpload
