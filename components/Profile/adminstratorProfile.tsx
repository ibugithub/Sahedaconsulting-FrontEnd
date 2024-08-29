
"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Logout } from "../Logout/logout";
import { useAppDispatch } from "@/lib/hooks"
import { BounceLoader, BarLoader } from "react-spinners";
import { AxiosRequests } from "../utils/axiosRequests";
import { EditProfile } from "./editProfile";
import { FreelancUserInterface } from "../interface";
import { ChangePassword } from "./changePass";


export const AdministratorProfile = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useAppDispatch();
  const protectedRoute = AxiosRequests(router);
  const [imageLoading, setImageLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [fullView, setFullview] = useState(false);

  const [userInfo, setUserInfo] = useState<FreelancUserInterface>({
    id: "",
    first_name: "",
    last_name: "",
    email: "",
    role: "freelancer" || "buyer" || "administrator",
    profileImage: null as File | unknown,
    profileTitle: "",
    overview: "",
    skills: [],
    address: "",
    phone: "",
    hireCount: 0,
    employmentHistory: []
  });


  const cloudinaryUrl = process.env.NEXT_PUBLIC_CLOUDINARY_URL;
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
              id: response.data.userInfo.id,
              first_name: response.data.userInfo.firstName,
              last_name: response.data.userInfo.lastName,
              email: response.data.userInfo.email,
              role: response.data.userInfo.role,
              profileImage: response.data.userInfo.image,
              profileTitle: response.data.userInfo.profileTitle,
              overview: response.data.userInfo.overview,
              skills: response.data.userInfo.skills,
              address: response.data.userInfo.address,
              phone: response.data.userInfo.phone,
              hireCount: response.data.userInfo.hirecount,
              employmentHistory: response.data.userInfo.employmentHistory
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: name === 'skills' ? value.split(',').map(skill => skill.trim()) : value });
  };


  const HandleView = () => {
    setFullview(!fullView);
  }
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-100">
      <div className="bg-white shadow-xl rounded-3xl p-8 max-w-xl w-full my-3">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-extrabold text-gray-900">Profile</h1>
          <button
            className="text-gray-700 hover:text-gray-900 focus:outline-none"
            onClick={toggleEditMode}
          >
            <span className="sr-only">Edit Profile</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
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
                  className="w-32 h-32 rounded-full border-4 border-purple-500 shadow-lg"
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
                className="absolute bottom-0 right-0 bg-gradient-to-br from-purple-500 to-blue-500 text-white rounded-full p-2 hover:from-purple-600 hover:to-blue-600 transition-colors duration-300 cursor-pointer"
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
            <div className="mb-8 flex flex-col gap-4 w-full">
              <div>
                {isEditMode ? (
                  <input
                    className="text-gray-800 border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-purple-600"
                    name="first_name"
                    type="text"
                    value={userInfo.first_name}
                    placeholder="First Name"
                    onChange={handleInputChange}
                  />
                ) : (
                  <p className="text-lg text-gray-700 mb-2">
                    <span className="font-semibold">First Name:</span> {userInfo.first_name}
                  </p>
                )}
              </div>
              <div>
                {isEditMode ? (
                  <input
                    className="text-gray-800 border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-purple-600"
                    type="text"
                    name="last_name"
                    value={userInfo.last_name}
                    placeholder="Last Name"
                    onChange={handleInputChange}
                  />
                ) : (
                  <p className="text-lg text-gray-700 mb-2">
                    <span className="font-semibold">Last Name:</span> {userInfo.last_name}
                  </p>
                )}
              </div>

              <div>
                <p className="text-lg text-gray-700 mb-2">
                  <span className="font-semibold">Email:</span> {userInfo.email}
                </p>
              </div>
            </div>

            <div className="flex w-full justify-between">
              <div className="w-[40%]">
                <ChangePassword />
              </div>
              
              <div className="w-[30%]">
                {isEditMode ? (
                  <EditProfile handleSaveChanges={handleSaveChanges} toggleEditMode={toggleEditMode} />
                ) : (
                  <button
                    type="button"
                    className="w-full bg-gradient-to-br from-red-500 to-red-700 text-white font-semibold py-2 px-2 rounded-lg hover:from-red-600 hover:to-red-800 transition-colors duration-300"
                    onClick={handleLogoutClick}
                  >
                    Logout
                  </button>
                )}
              </div>
            </div>


          </div>
        )}
      </div>
    </div>
  );
};

