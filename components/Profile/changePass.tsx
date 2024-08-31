import React, { useState } from 'react';
import { AxiosRequests } from '../utils/axiosRequests';
import { toast } from 'react-toastify';
import { EyeIcon, EyeOffIcon, LockIcon } from 'lucide-react';

export const ChangePassword = () => {
  const protectedRoute = AxiosRequests();
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [passwordInfo, setPasswordInfo] = useState({
    oldPassword: '',
    newPassword: '',
  });
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordInfo({ ...passwordInfo, [name]: value });
  };

  const changePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = '/users/changePassword';
    try {
      const response = await protectedRoute.post(url, passwordInfo);
      if (response.status === 201) {
        toast.success("Password changed successfully");
        setIsFormVisible(false);
        setPasswordInfo({ oldPassword: '', newPassword: '' });
      }
    } catch (err: any) {
      console.error("Error while changing password", err);
      if (err.response?.data?.message === "Old password is incorrect") {
        toast.error('Old password is incorrect');
      } else {
        toast.error('Failed to change password. Please try again.');
      }
    }
  };

  return (
    <div className="w-full sm:w-auto">
      {!isFormVisible ? (
        <button
          onClick={() => setIsFormVisible(true)}
          className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold py-2 px-6 rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 shadow-md flex items-center justify-center"
        >
          <LockIcon className="mr-2 h-4 w-4" /> Change Password
        </button>
      ) : (
        <form onSubmit={changePassword} className="space-y-4 bg-white p-6 rounded-lg shadow-md text-gray-800">
          <div className="relative">
            <input
              type={showOldPassword ? "text" : "password"}
              name="oldPassword"
              value={passwordInfo.oldPassword}
              onChange={handleInputChange}
              placeholder="Old Password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
              required
            />
            <button
              type="button"
              onClick={() => setShowOldPassword(!showOldPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
            >
              {showOldPassword ? (
                <EyeOffIcon className="h-5 w-5" />
              ) : (
                <EyeIcon className="h-5 w-5" />
              )}
            </button>
          </div>
          <div className="relative">
            <input
              type={showNewPassword ? "text" : "password"}
              name="newPassword"
              value={passwordInfo.newPassword}
              onChange={handleInputChange}
              placeholder="New Password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
              required
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
            >
              {showNewPassword ? (
                <EyeOffIcon className="h-5 w-5" />
              ) : (
                <EyeIcon className="h-5 w-5" />
              )}
            </button>
          </div>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
            <button
              type="submit"
              className="w-full sm:w-auto bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold py-2 px-4 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-md"
            >
              Confirm
            </button>
            <button
              type="button"
              onClick={() => setIsFormVisible(false)}
              className="w-full sm:w-auto bg-gradient-to-r from-gray-400 to-gray-500 text-white font-semibold py-2 px-4 rounded-lg hover:from-gray-500 hover:to-gray-600 transition-all duration-300 shadow-md"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};