import React, { useEffect, useState } from 'react';
import { useAuth } from '../Store/useAuth';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

function VerificationReq() {
  const { token } = useAuth();
  const [requests, setRequests] = useState([]);

  const getDrRequest = async () => {
    try {
      const response = await fetch(`${baseUrl}/admin/verifyReq`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        }, 
      });
      if (!response.ok) {
        alert('Invalid URL!');
        return console.log('Response is not ok');
      }
      const res = await response.json();
      const requests = res.data;

      const requestsWithUserData = await Promise.all(
        requests.map(async (request) => {
          const userResponse = await fetch(`${baseUrl}/admin/applicant`, {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId: request.userId }),
          });

          if (!userResponse.ok) throw new Error('Failed to fetch user data');

          const res = await userResponse.json();
          const userData = res.applicant;
          return {
            ...request,
            applicant: userData, // Assuming user data is in userData.data
          };
        })
      );
      console.log(requestsWithUserData);
      setRequests(requestsWithUserData);
    } catch (error) {
      console.log(`Server side error: ${error}`);
    }
  };

  const getImageSrc = (buffer) => {
    if (!buffer) return '';
    const binary = new Uint8Array(buffer.data).reduce(
      (acc, byte) => acc + String.fromCharCode(byte),
      ''
    );
    const base64String = window.btoa(binary);
    return `data:image/jpeg;base64,${base64String}`;
  };

  useEffect(() => {
    if (token) {
      getDrRequest();
    }
  }, [token]);

  return (
    <div className="w-full min-h-[90vh] bg-red-400 p-4">
      {requests.map((item, index) => (
        <div key={index} className="bg-white p-4 mb-4 rounded shadow"> 

          <h1>Found Data</h1>
          <p>User Name: {item.applicant.fullname}</p>
          <p>Email: {item.applicant.email}</p>
          <p>RMP Number: {item.RMP_No}</p>
          <img src={getImageSrc(item.RMP_img)} alt="RMP Certificate"/>

        </div>
      ))}
    </div>
  );
}

export default VerificationReq;
