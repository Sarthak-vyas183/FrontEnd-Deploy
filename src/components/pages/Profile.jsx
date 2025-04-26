/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useAuth } from "../Store/useAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

function Profile() {
  const { user, token, LogoutUser } = useAuth();
   console.log(user);
  const navigate = useNavigate();
  const [defaultavatar, setDefaultavatar] = useState(
    "../../../images/user.png"
  );

  const [DoctorForm, setDoctorForm] = useState(false);
  const [RMP_NO, setRMP_NO] = useState("");
  const [RMP_img, setRMP_img] = useState(null);

  const [deletePassword, setDeletePassword] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const [isEditing, setIsEditing] = useState(false);
  const [fullName, setFullName] = useState(user?.fullName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [location, setLocation] = useState(user?.location || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [ph_no, setPhNo] = useState(user?.ph_no || "");
  const [preferredLanguage, setLanguage] = useState(
    user?.preferredLanguage || ""
  );
  const [avatar, setAvatar] = useState(user?.avatar || defaultavatar);

  useEffect(() => {
    if (user && user.avatar) {
      setAvatar(user.avatar);
    }
  }, [user]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const handleSaveClick = async () => {
    try {
      const response = await fetch(`${baseUrl}/user/editprofile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          fullName,
          email,
          location,
          bio,
          ph_no,
          preferredLanguage,
        }),
      });

      if (!response.ok) {
        throw new Error("Internal Server Error");
      }

      toast.success("Profile Updated");
      setIsEditing(false);
    } catch (error) {
      toast.error("Error: Unable to save profile. Try again later.");
      console.error(error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const UpdateProfile = async () => {
    if (!profileImageFile) {
      toast.error("Please Upload Profile Pic");
      return;
    }

    const formData = new FormData();
    formData.append("profileImage", profileImageFile);

    try {
      const response = await fetch(`${baseUrl}/user/updateProfile`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Internal Server Error");
      }

      const result = await response.json();

      if (result.avatar) {
        setAvatar(result.avatar);
      }

      toast.success("Profile Image Updated");

      setProfileImageFile(null);
    } catch (error) {
      toast.info("Error: Unable to update profile. Try again later.");
      console.error(error);
    }
  };

  const handleDeleteClick = () => {
    setIsDeleting(true);
  };

  const handleDeleteCancelClick = () => {
    setIsDeleting(false);
    setDeletePassword("");
  };

  const handleBecomeDoctorCancelclick = () => {
    setDoctorForm(false);
    setRMP_NO("");
    setRMP_img("");
  };

  const handleReqToBeDoctor = async () => {
    try {
      const formData = new FormData();
      formData.append("RMP_No", RMP_NO);
      formData.append("RMP_img", RMP_img);

      const response = await fetch(`${baseUrl}/auth/become_doctor`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const text = await response.text();
        console.log(text);
        return alert("Failed to send request: " + text);
      }

      const data = await response.json();
      toast.info("Your request to become a doctor has been sent to the admin");
      handleBecomeDoctorCancelclick();
    } catch (error) {
      console.log(`Error occurred: ${error}`);
      toast.error("An error occurred while sending the request.");
    }
  };

  const BecomeDoctor = () => {
    setDoctorForm(true);
  };

  const handleDeleteAccount = async () => {
    try {
      const response = await fetch(`${baseUrl}/auth/delete_account`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ password: deletePassword }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete account.");
      }
      localStorage.removeItem("token");
      toast.success("Account deleted successfully.");
      LogoutUser()
      navigate("/");
    } catch (error) {
      toast.error(
        "Error: Unable to delete account. Please check your password and try again."
      );
      console.error(error);
    }
  };



  return (
    <div className="w-full min-h-screen overflow-x-hidden bg-gradient-to-br from-green-100 via-green-200 to-green-300">
      {/* Hero Section */}
      <div className="w-full flex flex-col items-center justify-center py-10 bg-gradient-to-r from-green-400 via-green-300 to-green-200 shadow-lg mb-8">
        <img
          className="w-28 h-28 rounded-full border-4 border-green-500 shadow-lg mb-4"
          src={avatar || defaultavatar}
          alt="Profile"
        />
        <h1 className="text-3xl font-bold text-green-900">{user?.fullName}</h1>
        <p className="text-green-700">{user?.role}</p>
        <p className="text-gray-600">{user?.email}</p>
        <div className="flex gap-4 mt-4">
          <button
            onClick={UpdateProfile}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full font-semibold shadow transition"
          >
            Update Photo
          </button>
          <label className="cursor-pointer bg-green-100 hover:bg-green-200 text-green-700 px-4 py-2 rounded-full font-semibold shadow transition">
            <input
              className="hidden"
              type="file"
              name="profilePic"
              onChange={handleFileChange}
            />
            Change Photo
          </label>
        </div>
      </div>

      {/* Divider */}
      <div className="w-full flex justify-center mb-10">
        <div className="w-2/3 h-1 bg-gradient-to-r from-green-400 via-green-200 to-green-400 rounded-full opacity-60"></div>
      </div>

      <div className="flex flex-col md:flex-row gap-8 px-4 md:px-12">
        {/* Left Column */}
        <div className="w-full md:w-[60%] flex flex-col gap-8">
          <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition">
            <h2 className="text-2xl font-bold mb-4 text-green-700 flex items-center gap-2">
              <span role="img" aria-label="bio">📝</span> Bio
            </h2>
            <p className="text-gray-600 text-lg">
              {user?.bio ||
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit."}
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition">
            <h2 className="text-2xl font-bold mb-4 text-green-700 flex items-center gap-2">
              <span role="img" aria-label="activity">📊</span> My Activity
            </h2>
            <div className="flex justify-between items-center mb-2">
              <p>Created Remedy</p>
              <span className="bg-green-100 text-green-700 px-4 py-1 rounded-full font-semibold">
                {user?.remedyList?.length || "0"}
              </span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <p>Badge</p>
              <span className="bg-gray-200 text-gray-500 px-4 py-1 rounded-full font-semibold">
                {user?.badge || "Not yet"}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <p>Certificate</p>
              <span className="bg-gray-200 text-gray-500 px-4 py-1 rounded-full font-semibold">
                {user?.badge || "Not yet"}
              </span>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="w-full md:w-[40%] flex flex-col gap-8">
          <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition">
            <h2 className="text-2xl font-bold mb-4 text-green-700 flex items-center gap-2">
              <span role="img" aria-label="details">📋</span> Details
            </h2>
            <div>
              <p className="font-bold text-gray-600">Phone no</p>
              <p>{user?.ph_no || "123-456-7890"}</p>
            </div>
            <div className="mt-4">
              <p className="font-bold text-gray-600">Location</p>
              <p>{user?.location || "Delhi"}</p>
            </div>
            <div className="mt-4">
              <p className="font-bold text-gray-600">Language</p>
              <p>{user?.preferredLanguage || "English"}</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition">
            <h2 className="text-2xl font-bold mb-4 text-green-700 flex items-center gap-2">
              <span role="img" aria-label="controls">⚙️</span> Controls
            </h2>
            <div
              className="flex justify-between items-center mt-4 mb-4 hover:bg-blue-50 rounded-lg px-2 py-1 transition cursor-pointer"
              onClick={() => alert("This panel is in Development")}
            >
              <p>Get Certificate</p>
              <p className="bg-blue-100 px-4 py-1 text-blue-700 rounded-full font-semibold">
                Get Now
              </p>
            </div>
            <div
              className="flex justify-between items-center mt-4 mb-4 hover:bg-green-50 rounded-lg px-2 py-1 transition cursor-pointer"
              onClick={() => alert("This panel is in Development")}
            >
              <p>Reset Password</p>
              <p className="bg-green-100 px-4 py-1 text-green-700 rounded-full font-semibold">
                Reset
              </p>
            </div>
            <div
              className="flex justify-between items-center mt-4 mb-4 hover:bg-yellow-50 rounded-lg px-2 py-1 transition cursor-pointer"
              onClick={handleEditClick}
            >
              <p>Edit Profile</p>
              <p className="bg-yellow-100 px-4 py-1 text-yellow-700 rounded-full font-semibold">
                Edit
              </p>
            </div>
            <div
              className="flex justify-between items-center mt-4 mb-4 hover:bg-red-50 rounded-lg px-2 py-1 transition cursor-pointer"
              onClick={handleDeleteClick}
            >
              <p>Delete Account</p>
              <p className="bg-red-100 px-4 py-1 text-red-700 rounded-full font-semibold">
                Delete
              </p>
            </div>
            {user && user.isDoctor ? (
              ""
            ) : (
              <div
                className="flex justify-between items-center mt-4 mb-4 hover:bg-green-50 rounded-lg px-2 py-1 transition cursor-pointer"
                onClick={BecomeDoctor}
              >
                <div className={` ${user && user.isAdmin ? 'hidden' : 'flex' } justify-between w-full`}>
                  <p>Become a Doctor</p>
                  <p className="bg-green-100 px-4 py-1 text-green-700 rounded-full font-semibold">
                    Doctor
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-xl shadow-2xl w-full h-[95vh] mt-10 overflow-y-auto max-w-md">
            <h2 className="text-2xl font-bold mb-6 text-green-700">Edit Profile</h2>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold">Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full border rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-green-300"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-green-300"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold">Phone No</label>
              <input
                type="tel"
                value={ph_no}
                onChange={(e) => setPhNo(e.target.value)}
                className="w-full border rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-green-300"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold">Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full border rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-green-300"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold">Bio</label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full border rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-green-300"
              ></textarea>
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 font-semibold">Language</label>
              <input
                type="text"
                value={preferredLanguage}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full border rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-green-300"
              />
            </div>
            <div className="flex justify-between">
              <button
                onClick={handleSaveClick}
                className="bg-green-500 text-white px-5 py-2 rounded-full font-semibold hover:bg-green-600 transition"
              >
                Save
              </button>
              <button
                onClick={handleCancelClick}
                className="bg-gray-400 text-white px-5 py-2 rounded-full font-semibold hover:bg-gray-500 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {isDeleting && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6 text-red-600">
              Delete Account
            </h2>
            <p className="text-gray-600 mb-4">
              Please enter your password to confirm.
            </p>
            <input
              type="password"
              value={deletePassword}
              onChange={(e) => setDeletePassword(e.target.value)}
              className="w-full border rounded p-2 mb-6 focus:outline-none focus:ring-2 focus:ring-red-300"
            />
            <div className="flex justify-between">
              <button
                onClick={handleDeleteAccount}
                className="bg-red-500 text-white px-5 py-2 rounded-full font-semibold hover:bg-red-600 transition"
              >
                Delete
              </button>
              <button
                onClick={handleDeleteCancelClick}
                className="bg-gray-400 text-white px-5 py-2 rounded-full font-semibold hover:bg-gray-500 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {DoctorForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6 text-blue-600">
              Verify Yourself
            </h2>
            <p className="text-gray-600 mb-4">
              Please Enter Certificate No. and Upload Certificate
            </p>
            <input
              type="text"
              value={RMP_NO}
              onChange={(e) => setRMP_NO(e.target.value)}
              className="w-full border rounded p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
            />
            <input
              type="file"
              name="RMPCertificate"
              onChange={(e) => setRMP_img(e.target.files[0])}
              className="w-full border rounded p-2 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
            />
            <div className="flex justify-between">
              <button
                onClick={handleReqToBeDoctor}
                className="bg-blue-500 text-white px-5 py-2 rounded-full font-semibold hover:bg-blue-600 transition"
              >
                Request to Admin
              </button>
              <button
                onClick={handleBecomeDoctorCancelclick}
                className="bg-gray-400 text-white px-5 py-2 rounded-full font-semibold hover:bg-gray-500 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Footer */}
      <footer className="w-full text-center text-gray-500 text-sm mt-16 mb-4">
        &copy; {new Date().getFullYear()} HomeRemedy.in &mdash; All rights reserved.
      </footer>
    </div>
  );
}

export default Profile;
