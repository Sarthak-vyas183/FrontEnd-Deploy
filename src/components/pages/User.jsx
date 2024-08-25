import React from "react";
import { useNavigate, NavLink, Outlet, Navigate } from "react-router-dom";
import { HiUsers } from "react-icons/hi";
import { IoMdContact } from "react-icons/io";
import { MdMiscellaneousServices } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import { useAuth } from "../Store/useAuth";

function User() {
  const { isLoggedin } = useAuth();

  if (!isLoggedin) {
    return <Navigate to="/" />;
  }

  return (
<> 
<div className="max-sm:flex hidden w-full h-[10vh] bg-blue-950  items-center justify-center z-10 relative top-[10vh]">
        Menu
 </div> 
    <div className="flex fixed top-[10vh] max-sm:top-[20vh] left-0 w-[100vw] bg-gray-800 text-white h-[90vh]">
     
      <div className="w-[20vw] max-sm:w-[25vw] max-sm:relative bg-gray-900 p-4 max-sm:p-0 flex max-sm:items-center flex-col space-y-6 border-r-2 border-gray-700">
         
         
        <NavLink
          className={({ isActive }) =>
            `flex max-sm:flex-col items-center max-sm:justify-center  gap-3 max-sm:gap-0 text-lg font-bold p-2 rounded-lg
            ${isActive ? "bg-transparent" : "hover:bg-gray-700"}`
          } 
          to="/user/profile" 
        >
         <i className="ri-profile-line max-sm:text-3xl"></i>
         <p className="max-sm:text-sm">Profile</p>
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            `flex max-sm:flex-col items-center gap-3 text-lg font-bold p-2 rounded-lg 
            ${isActive ? "bg-blue-600" : "hover:bg-gray-700"}`
          }
          to="/user/create"
        >
          <i className="ri-quill-pen-line max-sm:text-3xl"></i>
         <p className="max-sm:text-sm">  Create Remedy</p>
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            `flex max-sm:flex-col items-center gap-3 text-lg font-bold p-2 rounded-lg 
            ${isActive ? "bg-blue-600" : "hover:bg-gray-700"}`
          }
          to="/user/myremedy"
        >
          <i className="ri-inbox-archive-fill max-sm:text-3xl"></i>
          <p className="max-sm:text-sm">My Remedies</p>
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            `flex max-sm:flex-col items-center gap-3 text-lg font-bold p-2 rounded-lg 
            ${isActive ? "bg-blue-600" : "hover:bg-gray-700"}`
          }
          to="/user/contact"
        >
          <i className="ri-verified-badge-fill max-sm:text-3xl"></i>
          <p className="max-sm:text-sm">Verify Remedy</p>
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            `flex max-sm:flex-col items-center gap-3 text-lg font-bold p-2  rounded-lg 
            ${isActive ? "bg-blue-600" : "hover:bg-gray-700"}`
          }
          to="/user/bookmarks"
        >
          <i className="ri-save-fill max-sm:text-3xl"></i>
           <p className="max-sm:text-sm">Saved Remedies</p>
        </NavLink>
      </div> 
     
      
      <div className="w-[80vw] max-sm:w-[100vw] bg-gray-100 text-black   overflow-y-scroll">
        <Outlet/> 
      </div> 

    </div>

</>
  );
}
   
export default User;
