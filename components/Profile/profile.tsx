"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Logout } from "../Logout/logout";
import { useAppDispatch } from "@/lib/hooks"
import { BounceLoader, BarLoader } from "react-spinners";
import { AxiosRequests } from "../utils/axiosRequests";
import { EditProfile } from "./editProfile";

const Profile = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useAppDispatch();
  const protectedRoute = AxiosRequests(router);
  const [imageLoading, setImageLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const [userInfo, setUserInfo] = useState({
    first_name: "",
    last_name: "",
    email: "",
    profileImage: null as File | unknown
  });
  const cloudinaryUrl = "https://res.cloudinary.com/dqxxwptju/image/upload/v1714319969"
  useEffect(() => {
    const fetchInfo = async () => {
      const accessToken = localStorage.getItem("accessToken") ?? "";
      if (accessToken) {
        const url = '/users/profile'
        try {
          const response = await protectedRoute.post(url)
          setIsLoading(false);
          if (response.status === 200) {
            setUserInfo({
              first_name: response.data.userInfo.firstName,
              last_name: response.data.userInfo.lastName,
              email: response.data.userInfo.email,
              profileImage: response.data.userInfo.image
            });
          } else {
            setIsAuthenticated('notAuthenticated');
          }
        } catch (err) {
          setIsAuthenticated('notAuthenticated');
          console.error("Error while fetching profile data at profile.tsx", err)
        }
      }
      else {
        setIsAuthenticated('notAuthenticated');
      }
    }
    fetchInfo();
  }, []);

  if (isAuthenticated == "notAuthenticated") {
    router.push('/signin')
  }

  const handleLogoutClick = () => {
    Logout(router, dispatch);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageLoading(true);
    const file = e.target.files?.[0]
    if (file) {
      const url = '/users/setImage'
      const formData = { "image": file, "oldImage": userInfo.profileImage }
      try {
        const response = await protectedRoute.post(url, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        if (response.status === 200) {
          setUserInfo({ ...userInfo, profileImage: response.data.imgPath });
          setImageLoading(false)
        }
      } catch (error) {
        console.log('Error while uploading user image', error)
      }
    }
  }

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo({ ...userInfo, first_name: e.target.value });
  };

  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo({ ...userInfo, last_name: e.target.value });
  };

  const handleSaveChanges = async () => {
    toggleEditMode();
    const url = "/users/saveUserData";
    const userData = userInfo;
    const response = await protectedRoute.post(url, userData);

  };


  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <BounceLoader color="#6366f1" size={60} />
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Profile</h1>
          <button
            className="text-gray-600 hover:text-gray-800 focus:outline-none"
            onClick={toggleEditMode}
          >
            <span className="sr-only">Edit Profile</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </button>
        </div>
        {imageLoading ? (
          <div className="flex justify-center items-center h-20">
            <BarLoader color="#6366f1" />
          </div>
        ) : (
          <div className="flex flex-col items-center mb-8">
            <div className="relative mb-4">
              {userInfo.profileImage ? (
                <img
                  src={`${cloudinaryUrl}/${userInfo.profileImage}`}
                  alt="Profile"
                  className="w-32 h-32 rounded-full"
                />
              ) : (
                <div className="w-32 h-32 rounded-full bg-gray-300 flex items-center justify-center text-gray-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-16 h-16"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
              )}
              <label
                htmlFor="profileImage"
                className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600 transition-colors duration-300 cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </label>
              <input
                placeholder="image"
                id="profileImage"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>


            <div className="mb-8 flex flex-col gap-3">

              <div>
                {isEditMode ? (
                  <div className="flex flex-col gap-3">
                    <input className="text-gray-800" type="text" value={userInfo.first_name} placeholder="name" onChange={handleFirstNameChange} />
                  </div>
                ) : (
                  <div className="flex gap-3 items-start">
                    <p className="text-lg text-gray-700 mb-2">
                      <span className="font-semibold">First Name:</span> {userInfo.first_name}
                    </p>
                  </div>
                )}

              </div>

              <div>
                {isEditMode ? (
                  <div className="flex flex-col gap-3">

                    <input className="text-gray-800" type="text" value={userInfo.last_name} placeholder="name" onChange={handleLastNameChange} />
                  </div>
                ) : (
                  <div className="flex gap-3 items-start">
                    <p className="text-lg text-gray-700 mb-2">
                      <span className="font-semibold">Last Name:</span> {userInfo.last_name}
                    </p>
                  </div>
                )}

              </div>

              <p className="text-lg text-gray-700">
                <span className="font-semibold">Email:</span> {userInfo.email}
              </p>

            </div>

            {isEditMode ? (<EditProfile handleSaveChanges={handleSaveChanges} toggleEditMode={toggleEditMode} />) : (
              <button
                type="button"
                className="w-full bg-red-600 text-white font-semibold py-3 px-6 rounded-md hover:bg-red-700 transition-colors duration-300"
                onClick={handleLogoutClick}
              >
                Logout
              </button>
            )}
          </div >
        )}
      </div >
    </div >
  );
};

export default Profile;
