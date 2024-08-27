import { AxiosRequests } from "@/components/utils/axiosRequests";
import { UserInterface, UserRole } from "../../interface"; 
import { useState } from "react";
import { toast } from "react-toastify";

interface getUserProps{
  getUsers: () => void;
}
export const AddUserForm = ({getUsers} : getUserProps) => {
  const protectedRoute = AxiosRequests();
  const [error, setError] = useState("");
  const [newUser, setNewUser] = useState<Partial<UserInterface>>({
    firstName: "",
    lastName: "",
    email: "",
    role: "administrator" as UserRole, 
  });
  const resetNewUser = () => {
    setNewUser({
      firstName: "",
      lastName: "",
      email: "",
      role: "administrator" as UserRole,
    });
    setError("");
  };

  const addUser = async () => {
    const url = `/admin/addUser`;
    try {
      const { firstName, lastName, email, role } = newUser;
      if (!firstName) {
        setError("Please enter a first name");
        return;
      }

      if (!lastName) {
        setError("Please enter a last name");
        return;
      }

      if (!email) {
        setError("Please enter an email");
        return;
      }

      if (!role) {
        setError("Please select a role");
        return;
      }
      const response = await protectedRoute.post(url, newUser);
      if (response.status === 201) {
        toast.success("User added successfully");
        getUsers();
        resetNewUser();
      }
    } catch (error:any) {
      console.log("Error occurred while adding a new user", error);
      if(error.response.data.message === "User already exists"){
        setError("User already exists");
      }
    }
  };
  return (
    <>
      {/* Add New User Form */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-6 w-full max-w-lg mx-auto">
        <div className="text-red-500 text-center">{error}</div>
        <h2 className="text-xl font-medium mb-4 text-gray-800">Add New User</h2>
        <div className="flex flex-col space-y-4 text-gray-900">
          <input
            type="text"
            placeholder="First Name"
            value={newUser.firstName}
            onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })}
            className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Last Name"
            value={newUser.lastName}
            onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })}
            className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            placeholder="Email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            title="Role"
            value={newUser.role}
            onChange={(e) => setNewUser({ ...newUser, role: e.target.value as UserRole })}
            className="bg-gray-200 border border-gray-300 text-gray-800 py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="administrator">Administrator</option>
            <option value="engineeringAdmin">Engineering Admin</option>
            <option value="managementAdmin">Management Admin</option>
            <option value="itAdmin">IT Admin</option>
          </select>
          <button
            onClick={addUser}
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Add User
          </button>
        </div>
      </div>
    </>
  )
}