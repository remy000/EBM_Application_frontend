import React, { useState } from 'react'

const TermsCondition = ({prevStep, onChange,onSubmit,formData,isLoading }) => {
    const [acceptedTerms, setAcceptedTerms] = useState(formData);
    
      const handleTermAcceptance = (term) => {
        setAcceptedTerms({ ...acceptedTerms, [term]: true });
        onChange({ ...acceptedTerms, [term]: true }); 
      };
    
      const handleTermDeselect = (term) => {
        setAcceptedTerms({ ...acceptedTerms, [term]: false });
      };
    
      const handleBack = () => {
        prevStep();
      };
    
      const handleSubmit = () => {
        if (Object.values(acceptedTerms).every(term => term === true)) {
          onSubmit();
        } else {
          alert("Please accept all terms to proceed.");
        }
      };
    
      return (
        <div className='container'>
          <h2 className='headers'>Terms & Conditions</h2>
          <p className='parag'>Please read and accept the terms and conditions to proceed.</p>
          
          <div className='content'>
          <div className='check__box'>
            <input
              type="checkbox"
              id="term1"
              checked={acceptedTerms.term1}
              onChange={() => {
                acceptedTerms.term1 ? handleTermDeselect("term1") : handleTermAcceptance("term1");
              }}
            />
            <label htmlFor="term1">On Behalf of Recepient Company, I here By Confirm that I have received EBM software on good
            <br/>conditions</label>
          </div>
          
          <div className='check__box'>
            <input
              type="checkbox"
              id="term2"
              checked={acceptedTerms.term2}
              onChange={() => {
                acceptedTerms.term2 ? handleTermDeselect("term2") : handleTermAcceptance("term2");
              }}
            />
            <label htmlFor="term2">I understand that I have to bring RRA EBM back version 1 (if any), <b>not later 
              than 30 days,</b><br/>from the date of EBM Software Installation</label>
          </div>
          
          <div className='check__box'>
            <input
              type="checkbox"
              id="term3"
              checked={acceptedTerms.term3}
              onChange={() => {
                acceptedTerms.term3 ? handleTermDeselect("term3") : handleTermAcceptance("term3");
              }}
            />
            <label htmlFor="term3">I will not proceeding with <b>formatting</b> this computer 
            until i get written authorization from RRA <br/>
            upon an official submitted request</label>
          </div>
          <div className='check__box'>
            <input
              type="checkbox"
              id="term4"
              checked={acceptedTerms.term4}
              onChange={() => {
                acceptedTerms.term4 ? handleTermDeselect("term4") : handleTermAcceptance("term4");
              }}
            />
            <label htmlFor="term4">I understand that this computing device can not be formatted with out RRA 
            written authorization <br/>Otherwise, this action will be considered as
             <b>violation of provisions of the article 18 (5) of the law No 
              026/2019 of 18/09/2019</b> and 
              <b>penalties provided for by the article 86 of same law</b><br/>
              will be applicable</label>
          </div>
          
          {/* Conditional rendering of buttons */}
          <div className='terms__btn'>
            <button className='term__btn' onClick={handleBack}>Previous</button>
            <button className='submit__btn' onClick={handleSubmit}>{isLoading&&isLoading?'submitting...':'submit'}</button>
          </div>
          </div>
        </div>
      );
    };
export default TermsCondition