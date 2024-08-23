import React from 'react'
import { useNavigate, NavLink, Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../Store/useAuth';

function User() {
  const {user} = useAuth()
  if (user && !user.isAdmin || !user) {
    return <Navigate to="/" />;
  } 
  
  return (
    <div className='flex'>
    <div className='w-48 min-h-[90vh] bg-transparent p-4 flex flex-col border-r-2 mr-4'>
      <div className='flex items-center gap-2'>
        
        <NavLink className="font-bold text-2xl" to="/admin/profile">profile</NavLink> 
      </div>
      <br />
      <div className='flex items-center gap-2'>
        
        <NavLink className="font-bold text-2xl" to="/admin/create">Create</NavLink> 
      </div>
      <br />
      <div className='flex items-center gap-2'>
        <NavLink className="font-bold text-2xl" to="/admin/myremedy">My Remedy</NavLink> 
      </div>
      <br />
      <div className='flex items-center gap-2'>
        <NavLink className="font-bold text-2xl" to="/admin/usermanagement">Users</NavLink> 
      </div>

      <div className='flex items-center gap-2'>
        <NavLink className="font-bold text-2xl" to="/admin/remedymanagement">Manage Remedies</NavLink> 
      </div>

      <div className='flex items-center gap-2'>
        <NavLink className="font-bold text-2xl" to="/admin/bookmarks">Saved</NavLink> 
      </div>
      <br />
    </div>
    <Outlet />
  </div>
  )
}

export default User
