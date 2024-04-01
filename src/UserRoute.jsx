import React from 'react'
import {Navigate} from 'react-router-dom'

const UserRoute = ({children}) => {
    const role=sessionStorage.getItem("roles");
    const auth=sessionStorage.getItem("auths")==="true";

    if(role==="taxpayer"&& auth){
        return children;
    }
    else if(auth && role!=="taxpayer"){
         return <Navigate to="/unauthorized"/>
    }
    else{
        return <Navigate to="/"/>
    }
}

export default UserRoute