import React from 'react';

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* Users Section */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Users</h2>
            <p className="text-gray-600">Manage users, view user statistics, and more.</p>
          </div>

          {/* Post Service Section */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Post Service</h2>
            <p className="text-gray-600">Upload services so that freelancers can apply on them.</p>
          </div>


          {/* Manage Services Section */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Manage Services</h2>
            <p className="text-gray-600">View, manage, edit, and delete services. See who applied on which service.</p>
          </div>

          {/* Overview Section */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Overview</h2>
            <p className="text-gray-600">Details about the current status and overview of the system.</p>
          </div>

          {/* Settings Section */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Settings</h2>
            <p className="text-gray-600">Configure system settings and preferences.</p>
          </div>

          {/* Notifications Section */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Notifications</h2>
            <p className="text-gray-600">Review recent Notifications. Check all the new applications sent by buyer and freelancer</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
