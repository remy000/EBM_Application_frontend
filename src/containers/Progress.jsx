import React from 'react'
import './global.css'

const Progress = ({step,onSubmit}) => {
  return (
    <div>
     <div className="progress-bar">
      <span className={step === 1 ? 'active' : ''}>TaxPayer Info</span>
      <span className={step === 2 ? 'active' : ''}>Documents Upload</span>
      <span className={step === 3 ? 'active' : ''}>Terms & Conditions</span>
    
    </div>
      
    </div>
  )
}

export default Progress
