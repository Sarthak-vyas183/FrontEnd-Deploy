import React, { useState, useEffect } from 'react';
import { useAuth } from '../Store/useAuth';
import { motion } from 'framer-motion';

function MyRemedy() {
  const { token } = useAuth();
  const [errMsg, setErrMsg] = useState("Loading....");
  const [remedies, setRemedies] = useState([]);

  const fetchRemedy = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/user/myremedy", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        return setErrMsg("Fetch Failed: Backend Server Error");
      }

      const data = await response.json();
      setRemedies(data.data || []);
      setErrMsg(data.msg || "Remedies fetched successfully");
    } catch (error) {
      console.log(`Error occurred: ${error}`);
      setErrMsg("Fetch Failed: Internal Server Error");
    }
  };

  const getImageSrc = (buffer) => {
    if (!buffer) return '';
    const binary = new Uint8Array(buffer.data).reduce((acc, byte) => acc + String.fromCharCode(byte), '');
    const base64String = window.btoa(binary);
    return `data:image/jpeg;base64,${base64String}`;
  };

  useEffect(() => {
    if (token) {
      fetchRemedy();
    }
  }, [token]);

  return (
    <div className='w-[80vw] h-[90vh] flex  overflow-y-scroll overflow-x-hidden ' >
      {remedies.length > 0 ? (
        remedies.map((element, idx) => (
          <motion.div
            key={idx}
            className="max-w-sm rounded overflow-hidden shadow-lg bg-white m-4 p-4"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
           <div
                className="w-full h-48 bg-cover bg-center flex justify-end p-2"
                style={{ backgroundImage: `url(${getImageSrc(element.image)})` }}>
                   {element.isVerified ? (
                     <img src="../../../images/verified-icon.png" className='w-8 h-8 bg-green-500 rounded-full ' alt="" />
                   ) : (
                    <img src="../../../images/danger.png" className='w-8 h-8 bg-red-500 rounded-full ' alt="" />
                   )}
                </div>
            <div className="px-6 py-4 text-black">
              <div className="font-bold text-xl mb-2">{element.title}</div>
              <p className="text-gray-700 text-base">{element.description}</p>
            </div>
          </motion.div>
        )) 
      ) : (
        <div className='w-full h-full'>
           <h1 className='w-full h-[5%] px-2'>No Remedy found</h1>
           <div className='w-full h-[95%] flex justify-center items-center'>
           <img src="../../../images/Notfound.png" alt="" />
           </div>
        </div>
      )}
    </div>
  );
}

export default MyRemedy;
