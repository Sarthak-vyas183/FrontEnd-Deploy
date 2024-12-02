/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useAuth } from "../Store/useAuth";
import { toast } from "react-toastify";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

function VerificationReq() {
  const { token } = useAuth();
  const [requests, setRequests] = useState([]);
  const [openDocIndex, setOpenDocIndex] = useState(null); // Tracks which item's document is open

  const getDrRequest = async () => {
    try {
      const response = await fetch(`${baseUrl}/admin/verifyReq`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        alert("Invalid URL!");
        return console.log("Response is not ok");
      }
      const res = await response.json();
      const requests = res.data;

      const requestsWithUserData = await Promise.all(
        requests.map(async (request) => {
          const userResponse = await fetch(`${baseUrl}/admin/applicant`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId: request.userId }),
          });

          if (!userResponse.ok) throw new Error("Failed to fetch user data");

          const res = await userResponse.json();
          const userData = res.applicant;
          return {
            ...request,
            applicant: userData,
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
    if (!buffer) return "";
    const binary = new Uint8Array(buffer.data).reduce(
      (acc, byte) => acc + String.fromCharCode(byte),
      ""
    );
    const base64String = window.btoa(binary);
    return `data:image/jpeg;base64,${base64String}`;
  };

  useEffect(() => {
    if (token) {
      getDrRequest();
    }
  }, [token]);

  const handleVerify = async (userId, _id) => {
    try {
      const response = await fetch(`${baseUrl}/admin/verify-applicant`, {
        method: "POST",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          _id,
        }),
      });
      if (!response.ok) {
        return toast.error("Verification Failed");
      }
      getDrRequest();
      toast.success("Doctor verification done");
    } catch (error) {
      console.log(error);
      toast.error("vefication Failed");
    }
  };

  const handleDecline = async (_id) => {
    try {
      const response = await fetch(`${baseUrl}/admin/decline-applicant`, {
        method: "POST",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id,
        }),
      });

      if (!response.ok) {
        return toast.error("decline Failed!");
      }

      toast.info("You have Decline the Application");
      getDrRequest();
    } catch (error) {
      console.log(error);
      toast.error("Internal server error");
    }
  };

  return (
    <div className="w-full min-h-[90vh] bg-red-400 p-4">
      {requests.map((item, index) => (
        <div key={index} className="bg-white p-4 mb-4 rounded shadow">
          <h1>Found Requests</h1>
          <p>
            <span className="font-semibold">User Name :</span>{" "}
            {item.applicant.fullname}
          </p>
          <p>
            <span className="font-semibold">Email :</span>{" "}
            {item.applicant.email}
          </p>
          <p>
            <span className="font-semibold">RMP Number :</span> {item.RMP_No}
          </p>
          <div className="flex justify-between text-white">
            <p
              className="text-blue-900 underline hover:cursor-pointer pt-2"
              onClick={() =>
                setOpenDocIndex(openDocIndex === index ? null : index)
              }
            >
              {openDocIndex === index ? "hide" : "view"} Document --&gt;
            </p>
            <div className="flex gap-2">
              <button
                className="flex py-1 px-4 rounded-md bg-green-600"
                onClick={() => handleVerify(item.userId, item._id)}
              >
                Accept
              </button>

              <button
                className="py-1 px-4 rounded-md bg-red-600"
                onClick={() => handleDecline(item._id)}
              >
                Decline
              </button>
            </div>
          </div>
          {openDocIndex === index && (
            <div className="flex justify-center pt-2">
              <img
                className="w-[50vw] h-auto rounded-md"
                src={getImageSrc(item.RMP_img)}
                alt="RMP Certificate"
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default VerificationReq;
