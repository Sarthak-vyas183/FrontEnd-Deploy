import React from 'react';
import { useNavigate, NavLink, Outlet, Navigate } from 'react-router-dom';
import { FaUserMd, FaClipboardList, FaCheckCircle, FaClipboardCheck } from 'react-icons/fa';
import { useAuth } from '../Store/useAuth';

function Doctor() {
  const { user } = useAuth();

  if (!user || !user.isDoctor) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex fixed top-[10vh] left-0 w-full bg-gray-800 text-white h-[90vh]">
      <div className="w-[20vw] bg-gray-900 p-4 flex flex-col space-y-6 border-r-2 border-gray-700">
        <NavLink
          className={({ isActive }) =>
            `flex items-center gap-3 text-lg font-bold p-2 rounded-lg 
            ${isActive ? "bg-blue-600" : "hover:bg-gray-700"}`
          }
          to="/doctor/profile"
        >
          <FaUserMd className="text-2xl" />
          Profile
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            `flex items-center gap-3 text-lg font-bold p-2 rounded-lg 
            ${isActive ? "bg-blue-600" : "hover:bg-gray-700"}`
          }
          to="/doctor/create"
        >
          <i className="ri-quill-pen-line"></i>
          Create Remedy
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            `flex items-center gap-3 text-lg font-bold p-2 rounded-lg 
            ${isActive ? "bg-blue-600" : "hover:bg-gray-700"}`
          }
          to="/doctor/myremedy"
        >
          <FaClipboardList className="text-2xl" />
          My Remedies
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            `flex items-center gap-3 text-lg font-bold p-2 rounded-lg 
            ${isActive ? "bg-blue-600" : "hover:bg-gray-700"}`
          }
          to="/doctor/verifyremedy"
        >
          <FaCheckCircle className="text-2xl" />
          Verify Remedies
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            `flex items-center gap-3 text-lg font-bold p-2 rounded-lg 
            ${isActive ? "bg-blue-600" : "hover:bg-gray-700"}`
          }
          to="/doctor/requests"
        >
          <FaClipboardCheck className="text-2xl" />
          User's Requests
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            `flex items-center gap-3 text-lg font-bold p-2 rounded-lg 
            ${isActive ? "bg-blue-600" : "hover:bg-gray-700"}`
          }
          to="/doctor/bookmarks"
        >
          <i class="ri-save-fill"></i>
           Saved Remedies
        </NavLink>
      </div>

      <div className="w-[80vw] bg-gray-100 text-black overflow-y-scroll">
        <Outlet />
      </div>
    </div>
  );
}

export default Doctor;
