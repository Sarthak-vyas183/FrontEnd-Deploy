import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../Store/useAuth';
const baseUrl = import.meta.env.VITE_API_BASE_URL; 

function Verify_remedy() {
  const { token } = useAuth();
  const [verifiedRem, setVerifiedRem] = useState([]);
  const [loading, setLoading] = useState(true); // Added loading state

  const unVerifyedRemedy = async () => {
    try {
      setLoading(true); // Start loading
      const response = await fetch(`${baseUrl}/doctor/verify`, {
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
          const userDetailResponse = await fetch(`${baseUrl}/doctor/owner`, {
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

      // Sort remedies by creation date (most recent first)
      remediesWithUserDetails.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      setVerifiedRem(remediesWithUserDetails);
    } catch (error) {
      console.error("Internal server error:", error);
    } finally {
      setLoading(false); 
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
      const response = await fetch(`${baseUrl}/doctor/verified`, {
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

      alert("verification done")

      // Optionally refresh the remedies list or update the state to reflect the verification
      unVerifyedRemedy();
    } catch (error) {
      console.error("Error verifying remedy:", error);
    }
  };

  return (
    <>
     <div className='w-full h-[80vh] max-sm:h-[75vh] bg-gray-400 p-4  overflow-auto'>
      {loading ? (
        <p className='w-full h-full bg-white  flex justify-center items-center'><img className='w-[10%] h-auto' src="../images/loadingIcon.gif" alt="" /></p>
      ) : verifiedRem.length > 0 ? (
        verifiedRem.map((remedy) => (
          <div key={remedy._id} className='bg-white p-4 mb-4 shadow-lg rounded-lg flex flex-col md:flex-row'>
           
            <div className='w-full md:w-1/3 bg-cover bg-center rounded-lg h-48 md:h-auto'
                style={{ backgroundImage: `url(${getImageSrc(remedy.image)})` }}>
            </div>

            {/* Content Section */}
            <div className='w-full md:w-2/3 p-4'>
              <h3 className='text-xl font-bold mb-2'>{remedy.title}</h3>
              <p className='text-gray-700 mb-2'>{remedy.description}</p>
              <p className='text-sm cursor-pointer text-gray-500 underline mb-4 flex justify-between'>
                <span>Posted by: {remedy.userDetail.fullname}</span>
                <span>{new Date(remedy.createdAt).toLocaleDateString()}</span>
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
        <p className='w-full h-full flex justify-center items-center'><span>No remedies to verify at the moment.</span></p>
      )} 
     
     </div> 

     <div className='w-full h-[10vh] max-sm:h-[15vh]   bg-gray-400 flex justify-start px-4 items-center max-sm:items-start'>
       <button onClick={ ()=>{alert("Feature is not develop yet : coming soon")} } className='p-2 bg-blue-500 rounded-md max-sm:mt-2 '>My Verification</button>
     </div>
    </>
  );
}

export default Verify_remedy;
