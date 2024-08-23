import React, { useEffect, useState } from 'react';
import { useAuth } from '../Store/useAuth'; 
import { Link } from 'react-router-dom';

function Users_Requests() {
  const [userRequests, setUserRequests] = useState([]);
  const { token } = useAuth();

  const UserRequests = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/doctor/requests", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        console.error("Response not OK");
        return;
      }

      const res = await response.json();

      if (!Array.isArray(res.data)) {
        console.error("Unexpected data format");
        return;
      }

      const requestsWithUserDetails = await Promise.all(
        res.data.map(async (request) => {
          const userDetailResponse = await fetch(`http://localhost:3000/api/doctor/owner`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ userId: request.userId })
          });

          if (!userDetailResponse.ok) {
            console.error("Failed to fetch user details");
            return request;
          }

          const userDetail = await userDetailResponse.json();
          return { ...request, userDetail: userDetail.user };
        })
      );

      setUserRequests(requestsWithUserDetails);
    } catch (error) {
      console.error("Internal server error:", error);
    }
  };

  useEffect(() => {
    if (token) {
      UserRequests();
    }
  }, [token]);
  return (
    <div>
       {userRequests.length > 0 ? (
        userRequests.map((request , idx) => (
          <div key={idx} className='bg-white p-4 mb-4 shadow-lg rounded-lg flex'>
           

            {/* Content Section */}
            <div className='w-2/3 p-4'>
              <h3 className='text-xl font-bold mb-2'>{request.queryType}</h3>
              <p className='text-gray-700 mb-2'>{request.reqDescription}</p>
              <p className='text-sm cursor-pointer text-gray-500 underline mb-4'>
                Posted by: {request.userDetail.fullname} <br /> {request.userDetail.email}
              </p>
              <div className='flex justify-between items-center'>
                <Link to={`/viewuser/${request.userDetail._id}`} className='text-blue-500 hover:underline'>
                  View User Analystics
                </Link>
                <button
                  onClick={() => handleIgnore(request._id)}
                  className='bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600'
                >
                 Ignore
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No user requests available.</p>
      )}
    </div>

);
}
export default Users_Requests;