import React, { useState, useEffect } from 'react';
import { useNavigate, NavLink, Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../Store/useAuth';
import { gsap } from 'gsap';
import { FaUser, FaPlus, FaClipboardList, FaUsers, FaClipboardCheck, FaBookmark, FaCheckCircle } from 'react-icons/fa';

function Admin() {
  const { user } = useAuth();
  const [explore, setExplore] = useState({ hide: "hidden" });

  const toggleExplore = () => {
    setExplore({ hide: explore.hide === "hidden" ? "flex" : "hidden" });
  };

  useEffect(() => {
    if (window.innerWidth < 500) {
      if (explore.hide === "flex") {
        const elements = document.querySelectorAll(".sidebar-item");
        gsap.fromTo(
          elements,
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, stagger: 0.2, duration: 0.5 }
        );
      }
    }
  }, [explore.hide]);

  if (!user || !user.isAdmin) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <div onClick={toggleExplore} className="max-sm:flex gap-3 px-2 font-semibold items-center w-full h-[7vh] mt-[10vh] text-black">
        {explore.hide === "hidden" ? (
          <>
            <i className="ri-menu-line text-4xl"></i>
            <p className="text-2xl">Explore</p>
          </>
        ) : (
          <>
            <i className="ri-close-large-line text-4xl"></i>
            <p className="text-2xl">Close</p>
          </>
        )}
      </div>

      <div className="flex fixed top-[10vh] max-sm:top-[17vh] left-0 w-[100vw] bg-gray-800 text-white h-[90vh]">
        <div className={`w-[20vw] max-sm:w-[25vw] max-sm:relative max-sm:${explore.hide} bg-gray-900 p-4 max-sm:p-0 max-sm:pt-4 flex max-sm:items-center flex-col space-y-6 max-sm:space-y-2 border-r-2 border-gray-700`}>
          <NavLink
            onClick={toggleExplore}
            className={({ isActive }) =>
              `sidebar-item flex max-sm:flex-col rounded-lg max-sm:rounded-none items-center max-sm:justify-center gap-1 max-sm:gap-0 text-lg font-bold p-2 ${isActive ? "bg-blue-600" : "hover:bg-gray-700"}`
            }
            to="/admin/profile"
          >
            <FaUser className="max-sm:text-3xl" />
            <p className="max-sm:text-sm">Profile</p>
          </NavLink>

          <NavLink
            onClick={toggleExplore}
            className={({ isActive }) =>
              `sidebar-item flex max-sm:flex-col rounded-lg max-sm:rounded-none items-center gap-1 max-sm:gap-0 text-lg font-bold p-2 ${isActive ? "bg-blue-600" : "hover:bg-gray-700"}`
            }
            to="/admin/create"
          >
            <FaPlus className="max-sm:text-3xl" />
            <p className="max-sm:text-sm">Create Remedy</p>
          </NavLink>

          <NavLink
            onClick={toggleExplore}
            className={({ isActive }) =>
              `sidebar-item flex max-sm:flex-col rounded-lg max-sm:rounded-none items-center gap-1 max-sm:gap-0 text-lg font-bold p-2 ${isActive ? "bg-blue-600" : "hover:bg-gray-700"}`
            }
            to="/admin/myremedy"
          >
            <FaClipboardList className="max-sm:text-3xl" />
            <p className="max-sm:text-sm">My Remedies</p>
          </NavLink>

          <NavLink
            onClick={toggleExplore}
            className={({ isActive }) =>
              `sidebar-item flex max-sm:flex-col rounded-lg max-sm:rounded-none items-center gap-1 max-sm:gap-0 text-lg font-bold p-2 ${isActive ? "bg-blue-600" : "hover:bg-gray-700"}`
            }
            to="/admin/usermanagement"
          >
            <FaUsers className="max-sm:text-3xl" />
            <p className="max-sm:text-sm">Users</p>
          </NavLink>

          <NavLink
            onClick={toggleExplore}
            className={({ isActive }) =>
              `sidebar-item flex max-sm:flex-col rounded-lg max-sm:rounded-none items-center gap-1 max-sm:gap-0 text-lg font-bold p-2 ${isActive ? "bg-blue-600" : "hover:bg-gray-700"}`
            }
            to="/admin/remedymanagement"
          >
            <FaClipboardCheck className="max-sm:text-3xl" />
            <p className="max-sm:text-sm">Manage Remedies</p>
          </NavLink>

          <NavLink
            onClick={toggleExplore}
            className={({ isActive }) =>
              `sidebar-item flex max-sm:flex-col rounded-lg max-sm:rounded-none items-center gap-1 max-sm:gap-0 text-lg font-bold p-2 ${isActive ? "bg-blue-600" : "hover:bg-gray-700"}`
            }
            to="/admin/verifyReq"
          >
            <FaCheckCircle className="max-sm:text-3xl" />
            <p className="max-sm:text-sm">Verify Dr</p>
          </NavLink>

          <NavLink
            onClick={toggleExplore}
            className={({ isActive }) =>
              `sidebar-item flex max-sm:flex-col rounded-lg max-sm:rounded-none items-center gap-1 max-sm:gap-0 text-lg font-bold p-2 ${isActive ? "bg-blue-600" : "hover:bg-gray-700"}`
            }
            to="/admin/bookmarks"
          >
            <FaBookmark className="max-sm:text-3xl" />
            <p className="max-sm:text-sm">Saved</p>
          </NavLink>
        </div>

        <div className="w-[80vw] max-sm:w-[100vw] bg-gray-100 text-black overflow-y-scroll">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default Admin;
