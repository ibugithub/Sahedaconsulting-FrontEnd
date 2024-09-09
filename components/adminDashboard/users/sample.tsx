import React from 'react';
import Image from 'next/image';
import { UserPlus, UserMinus, Eye, EyeOff, Trash2, Copy, Plus } from 'lucide-react';
import { UserInterface } from '@/components/interface';


type SecretCode = {
  _id: string;
  code: string;
};

type UserRole = 'administrator' | 'engineeringAdmin' | 'managementAdmin' | 'itAdmin' | 'freelancer' | 'buyer';

interface UserManagementProps {
  users: UserInterface[];
  showForm: boolean;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
  changeUserRole: (userId: string, newRole: UserRole) => void;
  deleteUser: (userId: string) => void;
  showSecretCodes: boolean;
  showAllCodes: () => void;
  allSecretCodes: SecretCode[];
  deleteSecretCode: (codeId: string) => void;
  generateSecretCode: () => void;
  cloudinaryUrl: string;
  defaultAvatar: string;
  getUsers: () => void;
}

interface UserSectionProps {
  title: string;
  users: UserInterface[];
  cloudinaryUrl: string;
  defaultAvatar: string;
  changeUserRole?: (userId: string, newRole: UserRole) => void;
  deleteUser?: (userId: string) => void;
  isAdmin: boolean;
}

interface SecretCodesSectionProps {
  showSecretCodes: boolean;
  showAllCodes: () => void;
  allSecretCodes: SecretCode[];
  deleteSecretCode: (codeId: string) => void;
  generateSecretCode: () => void;
}

const UserManagement = ({
  users,
  showForm,
  setShowForm,
  changeUserRole,
  deleteUser,
  showSecretCodes,
  showAllCodes,
  allSecretCodes,
  deleteSecretCode,
  generateSecretCode,
  cloudinaryUrl,
  defaultAvatar,
  getUsers
} :  UserManagementProps) => {
  return (
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
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
          <AddUserForm getUsers={getUsers} />
        </div>
      )}

      <div className="space-y-8">
        <UserSection
          title="Admin Users"
          users={users.filter(user => user.role !== 'freelancer' && user.role !== 'buyer')}
          cloudinaryUrl={cloudinaryUrl}
          defaultAvatar={defaultAvatar}
          changeUserRole={changeUserRole}
          deleteUser={deleteUser}
          isAdmin={true}
        />

        <UserSection
          title="Normal Users"
          users={users.filter(user => user.role === 'freelancer' || user.role === 'buyer')}
          cloudinaryUrl={cloudinaryUrl}
          defaultAvatar={defaultAvatar}
          isAdmin={false}
        />
      </div>

      <SecretCodesSection
        showSecretCodes={showSecretCodes}
        showAllCodes={showAllCodes}
        allSecretCodes={allSecretCodes}
        deleteSecretCode={deleteSecretCode}
        generateSecretCode={generateSecretCode}
      />
    </div>
  );
};

const UserSection: React.FC<UserSectionProps> = ({
  title,
  users,
  cloudinaryUrl,
  defaultAvatar,
  changeUserRole,
  deleteUser,
  isAdmin
}) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">{title}</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {users.map((user) => (
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
            {isAdmin && changeUserRole && deleteUser && (
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

const SecretCodesSection: React.FC<SecretCodesSectionProps> = ({
  showSecretCodes,
  showAllCodes,
  allSecretCodes,
  deleteSecretCode,
  generateSecretCode
}) => {
  return (
    <div className="mt-12">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Secret Codes</h2>
      <button
        className="bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition duration-300 ease-in-out flex items-center mb-4"
        onClick={showAllCodes}
      >
        {showSecretCodes ? <EyeOff className="mr-2" /> : <Eye className="mr-2" />}
        {showSecretCodes ? "Hide Secret Codes" : "Show Secret Codes"}
      </button>

      {showSecretCodes && (
        <div className="bg-white shadow-md rounded-lg p-6">
          {allSecretCodes.length > 0 ? (
            <div className="space-y-4">
              {allSecretCodes.map((secretCode) => (
                <div key={secretCode._id} className="flex items-center justify-between bg-gray-100 p-3 rounded-lg">
                  <span className="text-gray-700 font-mono">{secretCode.code}</span>
                  <div className="space-x-2">
                    <button
                      className="text-blue-600 hover:text-blue-800 transition duration-300 ease-in-out"
                      onClick={() => navigator.clipboard.writeText(secretCode.code)}
                    >
                      <Copy size={20} />
                    </button>
                    <button
                      className="text-red-600 hover:text-red-800 transition duration-300 ease-in-out"
                      onClick={() => deleteSecretCode(secretCode._id)}
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No secret codes available.</p>
          )}
          <button
            onClick={generateSecretCode}
            className="mt-4 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300 ease-in-out flex items-center"
          >
            <Plus className="mr-2" /> Generate New Secret Code
          </button>
        </div>
      )}
    </div>
  );
};

export default UserManagement;