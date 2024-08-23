import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../Store/useAuth';

function Verify_remedy() {
  const { token } = useAuth();
  const [verifiedRem, setVerifiedRem] = useState([]);

  const unVerifyedRemedy = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/doctor/verify", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        return console.log("Response not OK");
      }

      const res = await response.json();
      
      const remediesWithUserDetails = await Promise.all(
        res.data.map(async (remedy) => {
          const userDetailResponse = await fetch(`http://localhost:3000/api/doctor/owner`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json", 
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ userId: remedy.userId })
          });
          console.log(userDetailResponse)
          const userDetail = await userDetailResponse.json();
          return { ...remedy, userDetail: userDetail.user };
        })
      );

      setVerifiedRem(remediesWithUserDetails);
    } catch (error) {
      console.error("Internal server error:", error);
    }
  };
  
  const getImageSrc = (buffer) => {
    if (!buffer) return "";
    const binary = new Uint8Array(buffer.data).reduce(
      (acc, byte) => acc + String.fromCharCode(byte),
      ""
    );
    const base64String = window.btoa(binary);
    return `data:image/jpeg;base64,${base64String}`;
  };

  useEffect(() => {
    unVerifyedRemedy();
  }, []);

  const handleVerify = async (remedyId, userId) => {
    try {
      const response = await fetch("http://localhost:3000/api/doctor/verified", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ remedyId : remedyId}),
      });

      if (!response.ok) {
        return console.log("Failed to verify remedy");
      }

      // Optionally refresh the remedies list or update the state to reflect the verification
      unVerifyedRemedy();
    } catch (error) {
      console.error("Error verifying remedy:", error);
    }
  };
  

  return (
    <div className='w-[78.9vw] h-[90vh] bg-gray-500 p-4 overflow-auto'>
      {verifiedRem.length > 0 ? (
        verifiedRem.map((remedy) => (
          <div key={remedy._id} className='bg-white p-4 mb-4 shadow-lg rounded-lg flex'>
           
            <div className='w-1/3 bg-cover bg-center rounded-lg' 
                style={{ backgroundImage: `url(${getImageSrc(remedy.image)})` }}>

            </div>

            {/* Content Section */}
            <div className='w-2/3 p-4'>
              <h3 className='text-xl font-bold mb-2'>{remedy.title}</h3>
              <p className='text-gray-700 mb-2'>{remedy.description}</p>
              <p className='text-sm cursor-pointer text-gray-500 underline mb-4'>
                Posted by: {remedy.userDetail.fullname}
              </p>
              <div className='flex justify-between items-center'>
                <Link to={`/remedy/${remedy._id}`} className='text-blue-500 hover:underline'>
                  Read More
                </Link>
                <button
                  onClick={() => handleVerify(remedy._id, remedy.userId)}
                  className='bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600'
                >
                  Verify
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No remedies to verify at the moment.</p>
      )}
    </div>
  );
}

export default Verify_remedy;
