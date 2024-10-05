"use client"
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Logout } from "../Logout/logout";
import { useAppDispatch } from "@/lib/hooks";
import { BounceLoader, HashLoader} from "react-spinners";
import { AxiosRequests } from "../utils/axiosRequests";
import { BuyerUserInterface } from "../interface";
import { ChangePassword } from "./changePass";
import { PencilIcon, CameraIcon, LogOutIcon } from "lucide-react";
import { toast } from "react-toastify";
import axios from "axios";
import Image from "next/image";


export const BuyerProfile = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const protectedRoute = AxiosRequests(router);
  const [isLoading, setIsLoading] = useState(true);
  const [isVerificationLoading, setIsVerificationLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [userInfo, setUserInfo] = useState<BuyerUserInterface>({
    userId: "",
    buyerId: "",
    firstName: "",
    lastName: "",
    email: "",
    role: "buyer",
    image: null,
    address: "",
    phone: "",
    companyName: "",
    companyDescription: "",
    isVerified: false
  });

  const cloudinaryUrl = process.env.NEXT_PUBLIC_CLOUDINARY_URL;
  const fetchInfo = async () => {
    const accessToken = localStorage.getItem("accessToken") ?? "";
    if (accessToken) {
      try {
        const response = await protectedRoute.post('/users/profile');
        console.log('the response is', response)
        if (response.status === 200) {
          setUserInfo({
            ...response.data.userInfo,
            userId: response.data.userInfo.userId,
            buyerId: response.data.userInfo.buyerId,
            firstName: response.data.userInfo.firstName,
            lastName: response.data.userInfo.lastName,
            image: response.data.userInfo.image,
            address: response.data.userInfo.address,
            phone: response.data.userInfo.phone,
            companyName: response.data.userInfo.companyName,
            companyDescription: response.data.userInfo.companyDescription,
            role: response.data.userInfo.role,
            isVerified: response.data.userInfo.isVerified
          });
        } else {
          router.push('/signin');
        }
      } catch (err) {
        console.error("Error while fetching profile data", err);
        router.push('/signin');
      } finally {
        setIsLoading(false);
      }
    } else {
      router.push('/signin');
    }
  };

  useEffect(() => {
    fetchInfo();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogoutClick = () => {
    Logout(router, dispatch);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageLoading(true);
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("oldImage", userInfo.image as string);
      try {
        const response = await protectedRoute.post('/users/setImage', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        if (response.status === 200) {
          setUserInfo({ ...userInfo, image: response.data.imgPath });
        }
      } catch (error) {
        console.log('Error while uploading user image', error);
      } finally {
        setImageLoading(false);
      }
    }
  };

  const toggleEditMode = () => {
    fetchInfo();
    setIsEditMode(!isEditMode)
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSaveChanges = async () => {
    toggleEditMode();
    try {
      const response = await protectedRoute.post("/users/saveUserData", { userInfo });
      if (response.status === 201) {
        toast.success("User data saved successfully");
        fetchInfo();
      }
    } catch (error) {
      console.error("Error saving user data", error);
      toast.error("Error saving user data");
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
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-4 sm:p-8 md:pt-[5rem] lg:pt-[7rem]">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 text-white flex justify-between pr-10">
          <h1 className="text-3xl font-bold">Profile</h1>
          <PencilIcon className="h-6 w-6 text-white cursor-pointer" onClick={toggleEditMode} />
        </div>
        <div className="p-6 space-y-6">
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
            <div className="flex flex-col items-center space-y-4">
              <div className="relative group">
                <div className="w-32 h-32 rounded-full overflow-hidden ring-4 ring-indigo-500 ring-opacity-50">
                  {userInfo.image ? (
                    <Image
                      src={`${cloudinaryUrl}/${userInfo.image}`}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white text-2xl font-bold">
                      {userInfo.firstName[0]}{userInfo.lastName[0]}
                    </div>
                  )}
                </div>
                <label
                  htmlFor="profileImage"
                  className="absolute bottom-0 right-0 bg-white text-indigo-600 rounded-full p-2 cursor-pointer hover:bg-indigo-100 transition-colors duration-300 shadow-md"
                >
                  <CameraIcon className="h-5 w-5" />
                </label>
                <input
                  title="image upload"
                  id="profileImage"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
              {imageLoading && <p className="text-sm text-gray-500">Uploading...</p>}
            </div>
            <div className="flex-1 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">


                <div>
                  <label className="text-sm font-medium text-gray-600">First Name</label>
                  {isEditMode ? (
                    <input
                      name="firstName"
                      value={userInfo.firstName}
                      onChange={handleInputChange}
                      placeholder="First Name"
                      className="text-gray-800 p-1 mt-1 block w-full rounded-md ring-1 focus:ring-1 ring-red-200 focus:ring-red-700  outline-none"
                    />
                  ) : (
                    <p className="mt-1 text-lg text-gray-800">{userInfo.firstName}</p>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Last Name</label>
                  {isEditMode ? (
                    <input
                      name="lastName"
                      value={userInfo.lastName}
                      onChange={handleInputChange}
                      placeholder="Last Name"
                      className="text-gray-800 p-1 mt-1 block w-full rounded-md ring-1 focus:ring-1 ring-red-200 focus:ring-red-700  outline-none"
                    />
                  ) : (
                    <p className="mt-1 text-lg text-gray-800">{userInfo.lastName}</p>
                  )}
                </div>


                <div>
                  <label className="text-sm font-medium text-gray-600">Address</label>
                  {isEditMode ? (
                    <input
                      name="address"
                      value={userInfo.address}
                      onChange={handleInputChange}
                      placeholder="First Name"
                      className="text-gray-800 p-1 mt-1 block w-full rounded-md ring-1 focus:ring-1 ring-red-200 focus:ring-red-700  outline-none"
                    />
                  ) : (
                    <div className="text-gray-800">
                      <p className="mt-1 text-lg text-gray-800">{userInfo.address}</p>
                      {userInfo.address == "" && <p>  --- ---</p>}
                    </div>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Phone</label>
                  {isEditMode ? (
                    <input
                      name="phone"
                      value={userInfo.phone}
                      onChange={handleInputChange}
                      placeholder="Last Name"
                      className="text-gray-800 p-1 mt-1 block w-full rounded-md ring-1 focus:ring-1 ring-red-200 focus:ring-red-700  outline-none"
                    />
                  ) : (

                    <div className="text-gray-800">
                      <p className="mt-1 text-lg text-gray-800">{userInfo.phone}</p>
                      {userInfo.phone == "" && <p>  --- ---</p>}
                    </div>
                  )}
                </div>


                <div>
                  <label className="text-sm font-medium text-gray-600">Company Name</label>
                  {isEditMode ? (
                    <input
                      name="companyName"
                      value={userInfo.companyName}
                      onChange={handleInputChange}
                      placeholder="First Name"
                      className="text-gray-800 p-1 mt-1 block w-full rounded-md ring-1 focus:ring-1 ring-red-200 focus:ring-red-700  outline-none"
                    />
                  ) : (
                    <div className="text-gray-800">
                      <p className="mt-1 text-lg text-gray-800">{userInfo.companyName}</p>
                      {userInfo.companyName == "" && <p>  --- ---</p>}
                    </div>

                  )}
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Company Description</label>
                  {isEditMode ? (
                    <input
                      name="companyDescription"
                      value={userInfo.companyDescription}
                      onChange={handleInputChange}
                      placeholder="Last Name"
                      className="text-gray-800 p-1 mt-1 block w-full rounded-md ring-1 focus:ring-1 ring-red-200 focus:ring-red-700  outline-none"
                    />
                  ) : (
                    <div className="text-gray-800">
                      <p className="mt-1 text-lg ">{userInfo.companyDescription}</p>
                      {userInfo.companyDescription == "" && <p>  --- ---</p>}
                    </div>
                  )}
                </div>


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
                      {isVerificationLoading ? <HashLoader size={20}  className="mt-2" color="#f43f5e"/> : (
                        <p className="mt-1 text-sm text-blue-600 cursor-pointer border border-sky-500 p-1 rounded-lg" onClick={handleEmailVerification}>verify</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Role</label>
                <p className="mt-1 text-lg text-gray-800 capitalize">{userInfo.role}</p>
              </div>
            </div>
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
      </div>
    </div>
  );
};