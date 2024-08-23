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
    <div className="flex fixed top-[10vh] left-0 w-full bg-gray-800 text-white h-[90vh]">
      <div className="w-[20vw] bg-gray-900 p-4 flex flex-col space-y-6 border-r-2 border-gray-700">
        <NavLink
          className={({ isActive }) =>
            `flex items-center gap-3 text-lg font-bold p-2 rounded-lg 
            ${isActive ? "bg-blue-600" : "hover:bg-gray-700"}`
          }
          to="/user/profile"
        >
          <FaHome className="text-2xl" />
          Profile
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            `flex items-center gap-3 text-lg font-bold p-2 rounded-lg 
            ${isActive ? "bg-blue-600" : "hover:bg-gray-700"}`
          }
          to="/user/create"
        >
          <i class="ri-quill-pen-line"></i>
          Create Remedy
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            `flex items-center gap-3 text-lg font-bold p-2 rounded-lg 
            ${isActive ? "bg-blue-600" : "hover:bg-gray-700"}`
          }
          to="/user/myremedy"
        >
          <IoMdContact className="text-2xl" />
          My Remedies
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            `flex items-center gap-3 text-lg font-bold p-2 rounded-lg 
            ${isActive ? "bg-blue-600" : "hover:bg-gray-700"}`
          }
          to="/user/contact"
        >
          <i class="ri-verified-badge-fill"></i>
          Verify Remedy
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            `flex items-center gap-3 text-lg font-bold p-2 rounded-lg 
            ${isActive ? "bg-blue-600" : "hover:bg-gray-700"}`
          }
          to="/user/bookmarks"
        >
          <i class="ri-save-fill"></i>
           Saved Remedies
        </NavLink>
      </div>

      <div className="w-[80vw] bg-gray-100 text-black  overflow-y-scroll">
        <Outlet />
      </div>
    </div>
  );
}

export default User;
