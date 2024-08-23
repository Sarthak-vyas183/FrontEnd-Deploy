import React, { useState, useEffect } from 'react';
import { useAuth } from "../Store/useAuth";

function Profile() {
  const { user , token } = useAuth();
  const [profileImg, setProfileImg] = useState("../../../images/user.png");
  const [isEditing, setIsEditing] = useState(false);

  const [fullname, setFullname] = useState(user?.fullname || '');
  const [email, setEmail] = useState(user?.email || '');
  const [location, setLocation] = useState(user?.location || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [phNo, setPhNo] = useState(user?.ph_no || '');
  const [language, setLanguage] = useState(user?.preferredLanguage || '');

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
       const response = await fetch("http:/localhost:api/user/editprofile" , {
          method : "POST",
           headers : {
            Authorization :`Bearer ${token}`
           },
           body : JSON.stringify({})
       })
    } catch (error) {
      alert("Internal server error");
      console.log(error)
    }
    //updateUser({ fullname, email, location, bio, ph_no: phNo, preferredLanguage: language });
    setIsEditing(false);
  };

  return (
    <div className="w-[80vw] h-[90vh] overflow-y-scroll overflow-x-hidden p-8 bg-gray-100">
      <div className="bg-white rounded-lg shadow-md p-6 flex items-center justify-between mb-8">
        <div className="flex items-center gap-6">
          <img className="w-24 h-24 rounded-full" src={profileImg} alt="Profile" />
          <div>
            <h1 className="text-2xl font-bold">{user && user.fullname}</h1>
            <p className="text-gray-500">{user && user.role}</p>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <p className="text-gray-600">{user && user.email}</p>
          <div>
            <h2 className="text-sm text-gray-500">Current time</h2>
            <p>{new Date().toLocaleTimeString()}</p>
          </div>
        </div>
      </div>

      <div className="flex gap-8">
        <div className="w-[60%]">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-lg font-semibold mb-4">Bio</h2>
            <p className="text-gray-600">{user && user.bio || "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi dolorum, rerum labore alias placeat dolor molestiae minima ullam totam facere."}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-lg font-semibold mb-4">My Activity</h2>
            <div className="flex justify-between">
              <p>Created Remedy</p>
              <span className="bg-green-100 my-2 text-green-700 px-2 py-1 rounded">{user && user.remedyList.length || "0"}</span>
            </div>

            <div className="flex justify-between">
              <p>Badge</p>
              <span className="bg-gray-200 my-2 text-gray-500 px-2 py-1 rounded">{user && user.badge || "Not yet"}</span>
            </div>

            <div className="flex justify-between">
              <p>Certificate</p>
              <span className="bg-gray-200 my-2 text-gray-500 px-2 py-1 rounded">{user && user.badge || "Not yet"}</span>
            </div>
          </div>
        </div>

        <div className="w-[40%]">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-lg font-semibold mb-4">Details</h2>

            <div>
              <p className="font-bold text-gray-600">Phone no</p>
              <p>{user && user.ph_no || "123-456-7890"}</p>
            </div>

            <div className="mt-4">
              <p className="font-bold text-gray-600">Location</p>
              <p>{user && user.location || "Delhi"}</p>
            </div>

            <div className="mt-4">
              <p className="font-bold text-gray-600">Language</p>
              <p>{user && user.preferredLanguage || "English"}</p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4">Controls</h2>
            <div className="flex justify-between">
              <p>Update Profile</p>
              <span onClick={handleEditClick} className="bg-blue-600 hover:cursor-pointer text-white px-2 py-1 rounded">Edit</span>
            </div>
            <div className="flex justify-between mt-4">
              <p>Delete Account</p>
              <span className="bg-red-600 text-white px-2 py-1 rounded hover:cursor-pointer">Delete</span>
            </div>
          </div>
        </div>
      </div>

      {isEditing && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-lg w-[90%] max-w-lg h-[50vh] overflow-y-scroll relative p-6">
            <h2 className="text-2xl mb-4">Edit Profile</h2>
            <div className="mb-4">
              <label className="block text-gray-700">Full Name</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                className="w-full p-2 border rounded"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Phone No</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={phNo}
                onChange={(e) => setPhNo(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Location</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Language</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Bio</label>
              <textarea
                className="w-full p-2 border rounded"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
            </div>
            <div className="fixed bottom-0 left-0 right-0 p-6 bg-white border-t shadow-lg flex justify-end gap-4">
              <button
                onClick={handleCancelClick}
                className="bg-gray-600 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveClick}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
