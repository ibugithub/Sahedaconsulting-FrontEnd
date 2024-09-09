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
};



