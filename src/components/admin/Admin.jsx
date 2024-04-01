import React from 'react'
import './admin.css'
import axios from 'axios';
import { InfinitySpin} from 'react-loader-spinner'

const Admin = () => {



  return (
    <div className='admin__container'>
        <div>
        <div className='home__contain'>
            <p className='home__p'>Welcome, Admin</p>
            <button className='home__btn' onClick={()=>{}}>
             Logout
            </button>
        </div>
            <div className='admin__home'>
                <table>

                </table>
            </div>
        </div>
      
    </div>
  )
}

export default Admin
