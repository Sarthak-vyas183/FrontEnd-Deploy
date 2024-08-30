import React, { useState, useEffect } from "react";
import { useAuth } from "../Store/useAuth";
import { useNavigate } from "react-router-dom";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

function Profile() {
  const { user, token } = useAuth();

  const navigate = useNavigate();
  const [profileImg, setProfileImg] = useState();
  const [defaultProfileImg, setDefaultProfileImg] = useState(
    "../../../images/user.png"
  );

  const [DoctorForm, setDoctorForm] = useState(false);
  const [RMP_NO, setRMP_NO] = useState("");
  const [RMP_img, setRMP_img] = useState(null);

  const [deletePassword, setDeletePassword] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const [isEditing, setIsEditing] = useState(false);
  const [fullname, setFullname] = useState(user?.fullname || "");
  const [email, setEmail] = useState(user?.email || "");
  const [location, setLocation] = useState(user?.location || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [ph_no, setPhNo] = useState(user?.ph_no || "");
  const [preferredLanguage, setLanguage] = useState(
    user?.preferredLanguage || ""
  );
  const [profileImageFile, setProfileImageFile] = useState(null);

  useEffect(() => {
    if (user && user.profileimg) {
      setProfileImg(user.profileimg);
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
          fullname,
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

      alert("Profile Updated");
      setIsEditing(false);
    } catch (error) {
      alert("Error: Unable to save profile. Try again later.");
      console.error(error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImg(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const UpdateProfile = async () => {
    if (!profileImageFile) {
      alert("Please Upload Profile Pic");
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

      if (result.profileimg) {
        setProfileImg(result.profileimg);
      }

      alert("Profile Image Updated");

      setProfileImageFile(null);
    } catch (error) {
      alert("Error: Unable to update profile. Try again later.");
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
      alert("Your request to become a doctor has been sent to the admin");
      handleBecomeDoctorCancelclick();
    } catch (error) {
      console.log(`Error occurred: ${error}`);
      alert("An error occurred while sending the request.");
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
      alert("Account deleted successfully.");
      navigate("/");
    } catch (error) {
      alert(
        "Error: Unable to delete account. Please check your password and try again."
      );
      console.error(error);
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

  return (
    <div className="w-full md:w-[80vw] h-[90vh] overflow-y-scroll overflow-x-hidden p-4 md:p-8 max-sm:pb-32 bg-gray-100">
      <div className="bg-white rounded-lg shadow-md p-6 flex flex-col md:flex-row items-center justify-center md:justify-between mb-8">
        <div className="flex flex-col items-center gap-4 mb-4 md:mb-0 md:flex-row md:items-center md:gap-6">
          <div className="flex flex-col items-center">
            <img
              className="w-20 h-20 md:w-24 md:h-24 rounded-full"
              src={getImageSrc(profileImg) || defaultProfileImg}
              alt="Profile"
            />
            <p className="font-semibold text-blue-600 underline cursor-pointer flex flex-col items-center mt-2">
              <span onClick={UpdateProfile}>Update</span>
              <input
                className="text-[10px]"
                type="file"
                name="profilePic"
                onChange={handleFileChange}
              />
            </p>
          </div>

          <div className="text-center md:text-left">
            <h1 className="text-xl md:text-2xl font-bold">{user?.fullname}</h1>
            <p className="text-gray-500">{user?.role}</p>
          </div>
        </div>

        <div className="flex flex-col items-center md:flex-row md:items-center gap-4 md:gap-6">
          <p className="text-gray-600 text-center">{user?.email}</p>
          <div className="text-center">
            <h2 className="text-sm text-gray-500">Current time</h2>
            <p>
              {new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 md:gap-8">
        <div className="w-full md:w-[60%]">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-lg font-semibold mb-4">Bio</h2>
            <p className="text-gray-600">
              {user?.bio ||
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit."}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-lg font-semibold mb-4">My Activity</h2>
            <div className="flex justify-between">
              <p>Created Remedy</p>
              <span className="bg-green-100 my-2 text-green-700 px-2 py-1 rounded">
                {user?.remedyList.length || "0"}
              </span>
            </div>
            <div className="flex justify-between">
              <p>Badge</p>
              <span className="bg-gray-200 my-2 text-gray-500 px-2 py-1 rounded">
                {user?.badge || "Not yet"}
              </span>
            </div>
            <div className="flex justify-between">
              <p>Certificate</p>
              <span className="bg-gray-200 my-2 text-gray-500 px-2 py-1 rounded">
                {user?.badge || "Not yet"}
              </span>
            </div>
          </div>
        </div>

        <div className="w-full md:w-[40%]">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-lg font-semibold mb-4">Details</h2>
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
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4">Controls</h2>

            <div
              className="flex justify-between mt-4 mb-4"
              onClick={() => alert("This panel is in Development")}
            >
              <p>Get Certificate</p>
              <p className="bg-blue-100 px-2 py-1 text-blue-700 rounded cursor-pointer">
                Get Now
              </p>
            </div>

            <div
              className="flex justify-between mt-4 mb-4"
              onClick={() => alert("This panel is in Development")}
            >
              <p>Reset Password</p>
              <p className="bg-green-100 px-2 py-1 text-green-700 rounded cursor-pointer">
                Reset
              </p>
            </div>

            <div
              className="flex justify-between mt-4 mb-4"
              onClick={handleEditClick}
            >
              <p>Edit Profile</p>
              <p className="bg-yellow-100 px-2 py-1 text-yellow-700 rounded cursor-pointer">
                Edit
              </p>
            </div>

            <div
              className="flex justify-between mt-4 mb-4"
              onClick={handleDeleteClick}
            >
              <p>Delete Account</p>
              <p className="bg-red-100 px-2 py-1 text-red-700 rounded cursor-pointer">
                Delete
              </p>
            </div>
            {user && user.isDoctor ? (
              ""
            ) : (
              <div
                className="flex justify-between mt-4 mb-4"
                onClick={BecomeDoctor}
              >
                <p>Become a Doctor</p>
                <p className="bg-red-100 px-2 py-1 text-green-700 rounded cursor-pointer">
                  Doctor
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full h-[95vh] mt-10 overflow-y-auto max-w-md">
            <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
            <div className="mb-4">
              <label className="block text-gray-700">Full Name</label>
              <input
                type="text"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                className="w-full border rounded p-2"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border rounded p-2"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Phone No</label>
              <input
                type="tel"
                value={ph_no}
                onChange={(e) => setPhNo(e.target.value)}
                className="w-full border rounded p-2"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full border rounded p-2"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Bio</label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full border rounded p-2"
              ></textarea>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Language</label>
              <input
                type="text"
                value={preferredLanguage}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full border rounded p-2"
              />
            </div>
            <div className="flex justify-between">
              <button
                onClick={handleSaveClick}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Save
              </button>
              <button
                onClick={handleCancelClick}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {isDeleting && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4 text-red-600">
              Delete Account
            </h2>
            <p className="text-gray-600 mb-4">
              Please enter your password to confirm.
            </p>
            <input
              type="password"
              value={deletePassword}
              onChange={(e) => setDeletePassword(e.target.value)}
              className="w-full border rounded p-2 mb-4"
            />
            <div className="flex justify-between">
              <button
                onClick={handleDeleteAccount}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
              <button
                onClick={handleDeleteCancelClick}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {DoctorForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4 text-blue-600">
              Verify Yourself
            </h2>
            <p className="text-gray-600 mb-4">Please Enter Certificate No. and Upload Certificate</p>
            <input
              type="text"
              value={RMP_NO}
              onChange={(e) => setRMP_NO(e.target.value)}
              className="w-full border rounded p-2 mb-4"
              required
            />
            <input
              type="file"
              name="RMPCertificate"
              onChange={(e) => setRMP_img(e.target.files[0])}
              className="w-full border rounded p-2 mb-4"
              required
            />

            <div className="flex justify-between">
              <button
                onClick={handleReqToBeDoctor}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Request to Admin
              </button>
              <button
                onClick={handleBecomeDoctorCancelclick}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
