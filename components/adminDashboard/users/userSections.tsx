import { AxiosRequests } from "../../utils/axiosRequests";
import { UserRole } from "../../interface";
import Image from "next/image";
import { toast } from "react-toastify";
import defaultAvatar from "../../../assets/defaultAvatar.png";
import { Trash2 } from 'lucide-react';
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { fetchUsers } from "@/lib/features/users/userSlice";

interface UserSectionProps {
  title: string;
  isAdmin: boolean;
}


export const UserSection: React.FC<UserSectionProps> = ({
  title,
  isAdmin,
}) => {
  console.log('I am in the user section...')
  const cloudinaryUrl = process.env.NEXT_PUBLIC_CLOUDINARY_URL;
  const protectedRoute = AxiosRequests();
  const users = useAppSelector((state) => state.users.users)
  const dispatch = useAppDispatch();

  const changeUserRole = async (userId: string, newRole: UserRole) => {
    const url = `/admin/changeUserRole`;
    try {
      const response = await protectedRoute.put(url, { role: newRole, user: userId });
      if (response.status === 200) {
        dispatch(fetchUsers());
        toast.success("Role changed successfully");
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
      dispatch(fetchUsers());
    }
  };
  
  return (
    <div>
      <h2 className="text-xl font-bold mb-4 text-gray-800">{title}</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {users.filter((user) => isAdmin ? user.role === 'administrator' || user.role === 'itAdmin' || user.role === 'engineeringAdmin' || user.role === 'managementAdmin' : user.role === 'freelancer' || user.role === 'buyer' ).map((user) => (
          <div key={user._id} className="bg-white shadow-md rounded-lg p-4 transition duration-300 ease-in-out hover:shadow-lg">
            <div className="flex items-center mb-4">
              <Image
                width={64}
                height={64}
                src={user.image ? `${cloudinaryUrl}/${user.image}` : defaultAvatar}
                alt={`${user.firstName} ${user.lastName}`}
                className="w-16 h-16 rounded-full object-cover mr-4"
              />
              <div>
                <h3 className="text-lg font-medium text-gray-800">{user.firstName} {user.lastName}</h3>
                <p className="text-sm text-gray-600">{user.email}</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-4">Role: {user.role}</p>
            {isAdmin && (
              <div className="flex justify-between items-center">
                <select
                  title="Role"
                  id={`role-select-${user._id}`}
                  className="bg-gray-100 border border-gray-300 text-gray-700 py-2 px-3 rounded-md pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
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
                  className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300 ease-in-out"
                  aria-label="Delete user"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};