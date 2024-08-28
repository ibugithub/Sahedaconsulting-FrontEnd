"use client";
import { useEffect, useState } from "react";
import { AxiosRequests } from "../../utils/axiosRequests";
import { UserInterface, UserRole } from "../../interface";
import defaultAvatar from "../../../assets/defaultAvatar.png";
import Image from "next/image";
import { toast } from "react-toastify";
import { AddUserForm } from "./addUserForm";

export const ShowUsers = () => {
  const cloudinaryUrl = process.env.NEXT_PUBLIC_CLOUDINARY_URL;
  const [users, setUsers] = useState<UserInterface[]>([]);
  const protectedRoute = AxiosRequests();
  const [showForm, setShowForm] = useState(false);

  const getUsers = async () => {
    const url = '/admin/showUsers/';
    try {
      const response = await protectedRoute.get(url);
      if (response.status === 200) {
        const fetchedUsers = response.data.map((user: any) => ({
          ...user,
          role: user.role as UserRole,
        }));
        setUsers(fetchedUsers);
      }
    } catch (error) {
      console.log("Error occurred while fetching the users at users.tsx", error);
    }
  };

  const changeUserRole = async (userId: string, newRole: UserRole) => {
    const url = `/admin/changeUserRole`;
    try {
      const response = await protectedRoute.put(url, { role: newRole, user: userId });
      if (response.status === 200) {
        setUsers(prevUsers =>
          prevUsers.map(user =>
            user._id === userId ? { ...user, role: newRole } : user
          )
        );
      }
    } catch (error) {
      console.log("Error occurred while changing user role", error);
    }
  };

  const deleteUser = async (id: string) => {
    const url = `/admin/deleteUser/${id}`;
    const response = await protectedRoute.delete(url);
    if (response.status === 201) {
      toast.success("User deleted successfully");
      getUsers();
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6 text-center text-gray-800">User Management</h1>

      {/* Button to toggle Add User Form visibility */}
      <div className="text-center mb-6">
        <button
          onClick={() => setShowForm((prev) => !prev)} // Toggle form visibility
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {showForm ? "Hide Add User Form" : "Show Add User Form"}
        </button>
      </div>

      {/* Conditionally render the Add User Form based on showForm state */}
      {showForm && (
        <div className="mb-6 bg-white shadow-md rounded-lg p-6">
          <AddUserForm getUsers={getUsers} />
        </div>
      )}

      {/* Display Admin Users */}
      <div className="flex flex-col items-center space-y-4">
        <h1 className="text-white mt-10 text-md bg-yellow-600 p-2">Admin Users</h1>
        {users && users.filter(user => user.role !== 'freelancer' && user.role !== 'buyer').map((user) => (
          <div key={user._id} className="flex flex-col md:flex-row items-center bg-white shadow-md rounded-lg p-4 w-full max-w-3xl">
            <div className="flex-shrink-0">
              <Image
                width={100}
                height={100}
                src={user.image ? `${cloudinaryUrl}/${user.image}` : defaultAvatar}
                alt={`${user.firstName} ${user.lastName}`}
                className="w-16 h-16 rounded-full object-cover"
              />
            </div>
            <div className="ml-4 flex-grow">
              <div className="text-lg font-medium text-gray-800">{user.firstName} {user.lastName}</div>
              <div className="text-sm text-gray-500">{user.email}</div>
              <div className="text-sm text-gray-600 mt-1">Role: {user.role}</div>
            </div>
            <div className="mt-4 md:mt-0 md:ml-4 flex space-x-2">
              <select
                title="Role"
                id={`role-select-${user._id}`}
                className="bg-gray-200 border border-gray-300 text-gray-800 py-2 px-4 rounded-md"
                value={user.role}
                onChange={(e) => changeUserRole(user._id, e.target.value as UserRole)}
              >
                <option value="administrator">Administrator</option>
                <option value="engineeringAdmin">Engineering Admin</option>
                <option value="managementAdmin">Management Admin</option>
                <option value="itAdmin">IT Admin</option>
              </select>
              <button
                onClick={() => deleteUser(user._id)}
                className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Display Normal Users */}
      <div className="flex flex-col items-center space-y-4">
        <h1 className="text-white mt-10 text-md bg-green-600 p-2">Normal Users</h1>
        {users && users.filter(user => user.role === 'freelancer' || user.role === 'buyer').map((user) => (
          <div key={user._id} className="flex flex-col md:flex-row items-center bg-white shadow-md rounded-lg p-4 w-full max-w-3xl">
            <div className="flex-shrink-0">
              <Image
                width={100}
                height={100}
                src={user.image ? `${cloudinaryUrl}/${user.image}` : defaultAvatar}
                alt={`${user.firstName} ${user.lastName}`}
                className="w-16 h-16 rounded-full object-cover"
              />
            </div>
            <div className="ml-4 flex-grow">
              <div className="text-lg font-medium text-gray-800">{user.firstName} {user.lastName}</div>
              <div className="text-sm text-gray-500">{user.email}</div>
              <div className="text-sm text-gray-600 mt-1">Role: {user.role}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
