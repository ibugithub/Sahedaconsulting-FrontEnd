"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Logout } from "../Logout/logout";
import { useAppDispatch } from "@/lib/hooks"
import { BounceLoader, } from "react-spinners";
import { AxiosRequests } from "../utils/axiosRequests";

const Profile = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useAppDispatch();
  const protectedRoute = AxiosRequests();
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    profileImage: ""
  });

  useEffect(() => {
    const fetchInfo = async () => {
      const accessToken = localStorage.getItem("accessToken") ?? "";
      if (accessToken) {
        const url = '/users/profile'
        const formData = { "accessToken": accessToken }
        try {
          const response = await protectedRoute.post(url, formData)
          setIsLoading(false);
          if (response.status === 200) {
            console.log('the name is ', response.data)
            setUserInfo({
              name: response.data.userInfo.fullName,
              email: response.data.userInfo.email,
              profileImage: ''
            });
            setIsAuthenticated(true);
          }
        } catch (err) {
          console.error("Error while fetching profile data at profile.tsx", err)
        }
      }
    }
    fetchInfo();
  }, []);

  const router = useRouter();

  if (!isAuthenticated) {
    return <p> You are not authenticated </p>;
  }

  const handleLogoutClick = () => {
    Logout(router, dispatch);
  };

  const handleImageUpload = () => {
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
        <div className="flex flex-col items-center mb-8">
          {userInfo.profileImage ? (
            <img
              src={`https://res.cloudinary.com/dqxxwptju/image/upload/v1714319969/${userInfo.profileImage}`}
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
        </div>
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
