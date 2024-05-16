"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Logout } from "../Logout/logout";
import { useAppDispatch } from "@/lib/hooks"
import { BounceLoader, BarLoader } from "react-spinners";
import { AxiosRequests } from "../utils/axiosRequests";


const Profile = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useAppDispatch();
  const protectedRoute = AxiosRequests(router);
  const [imageLoading, setImageLoading] = useState(false);


  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    profileImage: null as File | unknown
  });
  const cloudinaryUrl = "https://res.cloudinary.com/dqxxwptju/image/upload/v1714319969"
  useEffect(() => {
    const fetchInfo = async () => {
      const accessToken = localStorage.getItem("accessToken") ?? "";
      if (accessToken) {
        const url = '/users/profile'
        const formData = { "accessToken": accessToken }
        try {
          const response = await protectedRoute.post(url, formData)
          setIsLoading(false);
          console.log("response: ", response)
          if (response.status === 200) {
            setUserInfo({
              name: response.data.userInfo.fullName,
              email: response.data.userInfo.email,
              profileImage: response.data.userInfo.image
            });
          }
        } catch (err) {
          setIsAuthenticated("notAuthenticated");
          console.error("Error while fetching profile data at profile.tsx", err)
        }
      }
    }
    fetchInfo();
  }, []);

  if (isAuthenticated == "notAuthenticated") {
    return <p> You are not authenticated </p>;
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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <BounceLoader color="#6366f1" size={60} />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Profile</h1>
        {imageLoading ? (
          <div className="flex justify-center items-center h-20">
            <BarLoader color="#6366f1" />
          </div>) : (
          <div className="flex flex-col items-center mb-8">
            {userInfo.profileImage ? (
              <img
                src={`${cloudinaryUrl}/${userInfo.profileImage}`}
                alt="Profile"
                className="w-32 h-32 rounded-full mb-4"
              />
            ) : (
              <div className="w-32 h-32 rounded-full bg-gray-300 mb-4 flex items-center justify-center">
                <svg
                  className="w-16 h-16 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
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
              className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-300 cursor-pointer mb-4"
            >
              Upload Image
            </label>
            <input
              id="profileImage"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>)}

        <div className="mb-8">
          <p className="text-lg text-gray-700 mb-2">
            <span className="font-semibold">Name:</span> {userInfo.name}
          </p>
          <p className="text-lg text-gray-700">
            <span className="font-semibold">Email:</span> {userInfo.email}
          </p>
        </div>
        <button
          type="button"
          className="w-full bg-red-600 text-white font-semibold py-3 px-6 rounded-md hover:bg-red-700 transition-colors duration-300"
          onClick={handleLogoutClick}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
