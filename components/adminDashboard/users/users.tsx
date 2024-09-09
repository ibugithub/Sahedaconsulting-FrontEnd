"use client";
import { useEffect, useState } from "react";
import { AddUserForm } from "./addUserForm";
import { UserPlus, UserMinus, Eye, EyeOff, Trash2, Copy, Plus } from 'lucide-react';
import { fetchUsers } from "@/lib/features/users/userSlice";
import { useAppDispatch } from "@/lib/hooks";
import { UserSection } from "./userSections";
import { SecretCodesSection } from "./secretCodeSection";

export const ShowUsers = () => {
  const [showForm, setShowForm] = useState(false);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div className="container mx-auto p-6  min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">User Management</h1>

      <div className="mb-8">
        <button
          onClick={() => setShowForm((prev) => !prev)}
          className="w-full md:w-auto bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out flex items-center justify-center"
        >
          {showForm ? <UserMinus className="mr-2" /> : <UserPlus className="mr-2" />}
          {showForm ? "Hide Add User Form" : "Show Add User Form"}
        </button>
      </div>

      {showForm && (
        <div className="mb-8 bg-white shadow-lg rounded-lg p-6">
          <AddUserForm />
        </div>
      )}

      <div className="">
        <UserSection
          title="Admin Users"
          isAdmin={true}
        />

        <SecretCodesSection />

        <UserSection
          title="Normal Users"
          isAdmin={false}
        />
      </div>
    </div>
  );

  // return (
  //   <div className="container mx-auto p-6">
  //     <h1 className="text-2xl font-semibold mb-6 text-center text-gray-800">User Management</h1>

  //     {/* Button to toggle Add User Form visibility */}
  //     <div className="text-center mb-6">
  //       <button
  //         onClick={() => setShowForm((prev) => !prev)}
  //         className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
  //       >
  //         {showForm ? "Hide Add User Form" : "Show Add User Form"}
  //       </button>
  //     </div>

  //     {showForm && (
  //       <div className="mb-6 bg-white shadow-md rounded-lg p-6">
  //         <AddUserForm getUsers={getUsers} />
  //       </div>
  //     )}

  //     {/* Display Admin Users */}
  //     <div className="flex flex-col items-center space-y-4">
  //       <h1 className="text-gray-800 mt-10 text-lg font-bold ">Admin Users</h1>
  //       {users && users.filter(user => user.role !== 'freelancer' && user.role !== 'buyer').map((user) => (
  //         <div key={user._id} className="flex flex-col md:flex-row items-center bg-white shadow-md rounded-lg p-4 w-full max-w-3xl">
  //           <div className="flex-shrink-0">
  //             <Image
  //               width={100}
  //               height={100}
  //               src={user.image ? `${cloudinaryUrl}/${user.image}` : defaultAvatar}
  //               alt={`${user.firstName} ${user.lastName}`}
  //               className="w-16 h-16 rounded-full object-cover"
  //             />
  //           </div>
  //           <div className="ml-4 flex-grow">
  //             <div className="text-lg font-medium text-gray-800">{user.firstName} {user.lastName}</div>
  //             <div className="text-sm text-gray-500">{user.email}</div>
  //             <div className="text-sm text-gray-600 mt-1">Role: {user.role}</div>
  //           </div>
  //           <div className="mt-4 md:mt-0 md:ml-4 flex space-x-2">
  //             <select
  //               title="Role"
  //               id={`role-select-${user._id}`}
  //               className="bg-gray-200 border border-gray-300 text-gray-800 py-2 px-4 rounded-md"
  //               value={user.role}
  //               onChange={(e) => changeUserRole(user._id, e.target.value as UserRole)}
  //             >
  //               <option value="administrator">Administrator</option>
  //               <option value="engineeringAdmin">Engineering Admin</option>
  //               <option value="managementAdmin">Management Admin</option>
  //               <option value="itAdmin">IT Admin</option>
  //             </select>
  //             <button
  //               onClick={() => deleteUser(user._id)}
  //               className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
  //             >
  //               Delete
  //             </button>
  //           </div>
  //         </div>
  //       ))}
  //     </div>

  //     {/* Display Normal Users */}
  //     <div className="flex flex-col items-center space-y-4">
  //       <h1 className="text-gray-800 mt-20 text-lg font-bold ">Normal Users</h1>
  //       {users && users.filter(user => user.role === 'freelancer' || user.role === 'buyer').map((user) => (
  //         <div key={user._id} className="flex flex-col md:flex-row items-center bg-white shadow-md rounded-lg p-4 w-full max-w-3xl">
  //           <div className="flex-shrink-0">
  //             <Image
  //               width={100}
  //               height={100}
  //               src={user.image ? `${cloudinaryUrl}/${user.image}` : defaultAvatar}
  //               alt={`${user.firstName} ${user.lastName}`}
  //               className="w-16 h-16 rounded-full object-cover"
  //             />
  //           </div>
  //           <div className="ml-4 flex-grow">
  //             <div className="text-lg font-medium text-gray-800">{user.firstName} {user.lastName}</div>
  //             <div className="text-sm text-gray-500">{user.email}</div>
  //             <div className="text-sm text-gray-600 mt-1">Role: {user.role}</div>
  //           </div>
  //         </div>
  //       ))}
  //     </div>
  //   </div>
  // );
};



