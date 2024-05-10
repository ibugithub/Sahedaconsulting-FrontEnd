"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Logout } from "../Logout/logout";
import { useAppDispatch } from "@/lib/hooks"
import { BounceLoader, } from "react-spinners";

const Profile = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useAppDispatch();
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    const storedName = localStorage.getItem("name") ?? "";
    const storedEmail = localStorage.getItem("email") ?? "";
    if (storedName && storedEmail) {
      setIsAuthenticated(true);
      setIsLoading(false);
    }
    setUserInfo({
      name: storedName,
      email: storedEmail,
    });
  }, []);

  const router = useRouter();

  if (!isAuthenticated) {
    return <p>Loading....</p>;
  }

  const handleLogoutClick = () => {
    Logout(router, dispatch);
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
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Profile</h1>
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
