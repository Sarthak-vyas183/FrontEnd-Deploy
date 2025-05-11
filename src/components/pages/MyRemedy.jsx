/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useAuth } from '../Store/useAuth';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

function MyRemedy() {
  const { token } = useAuth();
  const [errMsg, setErrMsg] = useState("Loading....");
  const [remedies, setRemedies] = useState([]);

  const fetchRemedy = async () => {
    try {
      const response = await fetch(`${baseUrl}user/getmyremedies`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        setErrMsg("Fetch Failed: Backend Server Error");
        return;
      }

      const data = await response.json();
      setRemedies(data.data || []);
      setErrMsg(data.message || "Remedies fetched successfully");
    } catch (error) {
      setErrMsg("Fetch Failed: Internal Server Error");
    }
  };

  useEffect(() => {
    if (token) {
      fetchRemedy();
    }
    // eslint-disable-next-line
  }, [token]);

  return (
    <div className='w-[full]  h-auto flex flex-wrap justify-center overflow-y-scroll overflow-x-hidden'>
      {remedies.length > 0 ? (
        remedies.map((element, idx) => (
          <motion.div
            key={element._id}
            className="w-[40%] max-sm:w-full max-sm:pb-4  rounded overflow-hidden shadow-lg bg-white m-2 p-4"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >  
            <div
              className="w-full h-48 bg-cover bg-center flex justify-end p-2"
              style={{ backgroundImage: `url(${element.image})` }}>
              {element.isVerified ? (
                <img src="../../../images/verified-icon.png" className='w-8 h-8 bg-green-500 rounded-full' alt="" />
              ) : (
                <img src="../../../images/danger.png" className='w-8 h-8 bg-red-500 rounded-full' alt="" />
              )}
            </div>
            <div className="px-6 py-4 text-black">
              <div className="font-bold text-xl mb-2">{element.title}</div>
              <p className="text-gray-700 text-base">{element.description}</p>
            </div> 
            <div className='w-1/2 flex justify-center items-center'>
              <p className='p-2 bg-blue-600 rounded-md text-white'>
                <Link to={`/remedy/${element._id}`}>Read More</Link>
              </p>
            </div>
          </motion.div>
        ))
      ) : (
        <div className='w-full h-full'>
          <h1 className='w-full h-[5%] px-2'>{errMsg}</h1>
          <div className='w-full h-[95%] flex justify-center items-center'>
            <img src="../../../images/Notfound.png" alt="" />
          </div>
        </div>
      )}
    </div>
  );
}

export default MyRemedy;
