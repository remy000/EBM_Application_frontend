import React from 'react'
import {Navigate} from 'react-router-dom'

const AdminRoute = ({children}) => {
    const role=sessionStorage.getItem("roles");
    const auth=sessionStorage.getItem("auths")==="true";

    if(role==="admin"&& auth){
        return children;
    }
    else if(auth && role!=="admin"){
         return <Navigate to="/unauthorized"/>
    }
    else{
        return <Navigate to="/"/>
  
}
}

export default AdminRoute
