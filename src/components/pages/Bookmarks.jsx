import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../Store/useAuth'; 

function Bookmarks() { 
  const [saved, setSaved] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  const bookmarks = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/user/mybookmarks", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch bookmarks");
      }

      const res = await response.json(); 
      const remedyIDs = res.data || [];

      const remedyDetails = await Promise.all(
        remedyIDs.map(async (ID) => {
          const remedyResponse = await fetch("http://localhost:3000/api/user/mybookmarksdetail", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ remedyId: ID }),
          });

          if (!remedyResponse.ok) throw new Error("Failed to fetch remedy data");

          const remedyDetail = await remedyResponse.json();
          return remedyDetail.remedydetail;
        })
      );

      setSaved(remedyDetails);
    } catch (error) {
      console.error(`Server error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      bookmarks();
    }
  }, [token]);

  const getImageSrc = (buffer) => {
    if (!buffer) return "";
    const binary = new Uint8Array(buffer.data).reduce(
      (acc, byte) => acc + String.fromCharCode(byte),
      ""
    );
    const base64String = window.btoa(binary);
    return `data:image/jpeg;base64,${base64String}`;
  };

  return (
    <div className='w-[80vw] h-[90vh] overflow-y-scroll overflow-x-hidden px-4 py-8'>
      <h1 className='text-2xl font-bold mb-4'>Saved Remedies</h1>
      {loading ? (
        <div className='flex justify-center items-center h-full'>
          <p className='text-lg text-gray-100'>Loading...</p> {/* Loading message */}
        </div>
      ) : (
        <div id="container" className='w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {saved.length > 0 ? (
            saved.map((remedy, index) => (
              <div key={index} id="box" className='w-full bg-white shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105'>
                <img className="w-full h-48 object-cover" src={getImageSrc(remedy.img)} alt={remedy.title} />
                <div className="p-4">
                  <h2 className="text-lg font-semibold text-gray-800">{remedy.title}</h2>
                  <p className="mt-2 text-gray-600 text-sm">{remedy.desc}</p>
                </div> 
                <div className='p-4'>
                  <Link to={`/remedy/${remedy.Id}`} className='inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors'>
                    Read More
                  </Link>
                </div>
              </div>
            ))
          ) : (
          <div className='w-full h-full'>
            <h1 className='w-full h-[5%] px-2'>No Remedy found</h1>
            <div className='w-full h-[95%] flex justify-center items-center'>
            <img src="../../../images/Notfound.png" alt="" />
            </div>
         </div>          )}
        </div>
      )}
    </div>
  );
}

export default Bookmarks;
