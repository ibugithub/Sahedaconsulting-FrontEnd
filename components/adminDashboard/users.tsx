"use client";
import { useEffect, useState } from "react";
import { AxiosRequests } from "../utils/axiosRequests";
import { UserInterface, UserRole } from "../interface";
import defaultAvatar from "../../assets/defaultAvatar.png";
import Image from "next/image";


export const ShowUsers = () => {
  const cloudinaryUrl = "https://res.cloudinary.com/dqxxwptju/image/upload/v1714319969";
  const [users, setUsers] = useState<UserInterface[]>([]);
  const protectedRoute = AxiosRequests();

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
    const url = `/admin/changeUserRole/${userId}`;
    try {
      const response = await protectedRoute.put(url, { role: newRole });
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

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6 text-center text-gray-800">User Management</h1>
      <div className="flex flex-col items-center space-y-4">
        {users && users.map((user) => (
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
            <div className="mt-4 md:mt-0 md:ml-4">
              <label htmlFor={`role-select-${user._id}`} className="sr-only">Change Role for {user.firstName} {user.lastName}</label>
              <select
                id={`role-select-${user._id}`}
                className="bg-gray-200 border border-gray-300 text-gray-800 py-2 px-4 rounded-md"
                value={user.role}
                onChange={(e) => changeUserRole(user._id, e.target.value as UserRole)}
              >
                <option value="buyer">Buyer</option>
                <option value="freelancer">Freelancer</option>
                <option value="administrator">Administrator</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
