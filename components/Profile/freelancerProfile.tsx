
"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Logout } from "../Logout/logout";
import { useAppDispatch } from "@/lib/hooks"
import { BounceLoader, BarLoader, HashLoader } from "react-spinners";
import { AxiosRequests } from "../utils/axiosRequests";
import { FreelancUserInterface } from "../interface";
import { EmploymentHistory } from "./employmentHistory";
import { ChangePassword } from "./changePass";
import { toast } from "react-toastify";
import { LogOutIcon } from "lucide-react";
import axios from "axios";


export const FreelancerProfile = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isVerificationLoading, setIsVerificationLoading] = useState(false);
  const dispatch = useAppDispatch();
  const protectedRoute = AxiosRequests(router);
  const [imageLoading, setImageLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [fullView, setFullview] = useState(false);

  const [userInfo, setUserInfo] = useState<FreelancUserInterface>({
    _id: "",
    firstName: "",
    lastName: "",
    email: "",
    role: "freelancer" || "buyer" || "administrator",
    profileImage: null as File | unknown,
    profileTitle: "",
    overview: "",
    skills: [],
    address: "",
    phone: "",
    hireCount: 0,
    employmentHistory: [],
    isVerified: false
  });

  const fetchInfo = async () => {
    const accessToken = localStorage.getItem("accessToken") ?? "";
    if (accessToken) {
      const url = '/users/profile'
      try {
        const response = await protectedRoute.post(url)
        setIsLoading(false);
        if (response.status === 200) {

          setUserInfo({
            _id: response.data.userInfo.id,
            firstName: response.data.userInfo.firstName,
            lastName: response.data.userInfo.lastName,
            email: response.data.userInfo.email,
            role: response.data.userInfo.role,
            profileImage: response.data.userInfo.image,
            profileTitle: response.data.userInfo.profileTitle,
            overview: response.data.userInfo.overview,
            skills: response.data.userInfo.skills,
            address: response.data.userInfo.address,
            phone: response.data.userInfo.phone,
            hireCount: response.data.userInfo.hirecount,
            employmentHistory: response.data.userInfo.employmentHistory,
            isVerified: response.data.userInfo.isVerified
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

  const cloudinaryUrl = process.env.NEXT_PUBLIC_CLOUDINARY_URL;
  useEffect(() => {
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
    const response = await protectedRoute.post(url, { userInfo });
    if (response.status === 201) {
      toast.success("User data saved successfully");
      fetchInfo();
    }
  };

  const handleEmailVerification = async () => {
    setIsVerificationLoading(true);
    const url = `${process.env.NEXT_PUBLIC_baseApiUrl}/api/buyer/sendMail`
    const domain = window.location.origin 
    if (!domain) {
      toast.error("frontend Domain not found");
      console.error('frontend domain not found at administrator.tsx file');
      return
    }
    const response = await axios.post(url,{formData: userInfo, type: 'emailVerification', frontEndDomain: domain});
    if (response.status === 200) {
      toast.success('A confirmation email has been sent to your email address');
      setIsVerificationLoading(false);
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-100">
      <div className="bg-white shadow-xl rounded-3xl p-8 max-w-[900px] w-full my-3">
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
                    name="firstName"
                    type="text"
                    value={userInfo.firstName}
                    placeholder="First Name"
                    onChange={handleInputChange}
                  />
                ) : (
                  <p className="text-lg text-gray-700 mb-2">
                    <span className="font-semibold">First Name:</span> {userInfo.firstName}
                  </p>
                )}
              </div>
              <div>
                {isEditMode ? (
                  <input
                    className="text-gray-800 border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-purple-600"
                    type="text"
                    name="last_name"
                    value={userInfo.lastName}
                    placeholder="Last Name"
                    onChange={handleInputChange}
                  />
                ) : (
                  <p className="text-lg text-gray-700 mb-2">
                    <span className="font-semibold">Last Name:</span> {userInfo.lastName}
                  </p>
                )}
              </div>
              <div>
                {isEditMode ? (
                  <textarea
                    className="text-gray-800 border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-purple-600"
                    name="overview"
                    value={userInfo.overview}
                    placeholder="Overview"
                    onChange={handleInputChange}
                  />
                ) : fullView ? (
                  <p className="text-lg text-gray-700 mb-2">
                    <span className="font-semibold">Overview:</span> {userInfo.overview}...<span className="text-green-500 text-sm cursor-pointer" onClick={HandleView}>Show Less</span>
                  </p>
                ) : userInfo.overview?.length && userInfo.overview?.length > 200 ? (
                  <p className="text-lg text-gray-700 mb-2">
                    <span className="font-semibold">Overview:</span> {userInfo.overview?.slice(0, 200)}...<span className="text-green-500 text-sm cursor-pointer" onClick={HandleView}>Show More</span>
                  </p>
                ) : (
                  <p className="text-lg text-gray-700 mb-2">
                    <span className="font-semibold">Overview:</span> {userInfo.overview}
                  </p>)
                }
              </div>

              <div>
                {isEditMode ? (
                  <input
                    className="text-gray-800 border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-purple-600"
                    type="text"
                    name="profileTitle"
                    value={userInfo.profileTitle}
                    placeholder="Profile Title"
                    onChange={handleInputChange}
                  />
                ) : (
                  <p className="text-lg text-gray-700 mb-2">
                    <span className="font-semibold">Profile Title:</span> {userInfo.profileTitle}
                  </p>
                )}
              </div>

              <div>
                {isEditMode ? (
                  <input
                    className="text-gray-800 border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-purple-600"
                    type="text"
                    name="skills"
                    value={userInfo.skills}
                    placeholder="Skills"
                    onChange={handleInputChange}
                  />
                ) : (
                  <p className="text-lg text-gray-700 mb-2">
                    <span className="font-semibold">Skills:</span> {userInfo.skills?.join(', ')}
                  </p>
                )}
              </div>
              <div>
                {isEditMode ? (
                  <input
                    className="text-gray-800 border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-purple-600"
                    type="text"
                    name="address"
                    value={userInfo.address}
                    placeholder="Address"
                    onChange={handleInputChange}
                  />
                ) : (
                  <p className="text-lg text-gray-700 mb-2">
                    <span className="font-semibold">Address:</span> {userInfo.address}
                  </p>
                )}
              </div>
              <div>
                {isEditMode ? (
                  <input
                    className="text-gray-800 border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-purple-600"
                    type="text"
                    name="phone"
                    value={userInfo.phone}
                    placeholder="Phone"
                    onChange={handleInputChange}
                  />
                ) : (
                  <p className="text-lg text-gray-700 mb-2">
                    <span className="font-semibold">Phone:</span> {userInfo.phone}
                  </p>
                )}
              </div>
              <div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Email</label>
                  <p className="mt-1 text-lg text-gray-800">{userInfo.email}</p>
                </div>
                <div className="mt-1">
                  {userInfo.isVerified ? (
                    <span className="text-sm bg-green-500 text-white cursor-pointer border border-gray-300 p-1 rounded-lg">verified</span>
                  ) : (
                    <div className="flex gap-2">
                      <p className="mt-1 text-sm text-white bg-red-500  border-gray-300 rounded-lg p-1">unverified email</p>
                      {isVerificationLoading ? <HashLoader size={20} className="mt-2" color="#f43f5e" /> : (
                        <p className="mt-1 text-sm text-blue-600 cursor-pointer border border-sky-500 p-1 rounded-lg" onClick={handleEmailVerification}>verify</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
              <div>
                <p className="text-lg text-gray-700 mb-2">
                  <span className="font-semibold">Hire Count:</span> {userInfo.hireCount}
                </p>
              </div>
              {userInfo.role === 'freelancer' && (
                <EmploymentHistory userInfo={userInfo} setUserInfo={setUserInfo} isEditMode={isEditMode} protectedRoute={protectedRoute} />
              )}

            </div>

            <div className="flex flex-col sm:flex-row justify-end items-center gap-4 pt-6 border-t border-gray-200">
              <div className="w-full sm:w-auto">
                <ChangePassword />
              </div>
              {isEditMode ? (
                <button
                  onClick={handleSaveChanges}
                  className="w-full sm:w-auto bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold py-2 px-6 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-md"
                >
                  Save Changes
                </button>
              ) : (
                <button
                  onClick={handleLogoutClick}
                  className="w-full sm:w-auto bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold py-2 px-6 rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-md flex items-center justify-center"
                >
                  <LogOutIcon className="mr-2 h-4 w-4" /> Logout
                </button>
              )}
            </div>

          </div>
        )}
      </div>
    </div>
  );
};
