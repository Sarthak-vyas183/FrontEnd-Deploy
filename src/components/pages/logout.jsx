import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../Store/useAuth';


function logout() {
    const {LogoutUser} = useAuth()
    useEffect(()=>{
        LogoutUser();
        alert("logout...");
    } , [LogoutUser]);

  return <Navigate to="/login"/>
}

export default logout
