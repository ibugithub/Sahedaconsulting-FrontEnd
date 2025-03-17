import React, { ReactNode } from 'react';
import Link from 'next/link';
import { 
  Users, FileText, PlusCircle, 
  BarChart2, Settings, Bell
} from 'lucide-react';

const AdminDashboard = () => {
  const cardHoverClass = "transition-all duration-300 hover:shadow-lg hover:transform hover:scale-[1.02] cursor-pointer";
  
  const cards = [
    {
      title: "Users",
      description: "Manage users, view user statistics, and more.",
      icon: <Users size={24} className="text-blue-600" />,
      href: 'adminDashboard/users',
      stats: "1,248 registered users"
    },
    {
      title: "Post Service",
      description: "Upload services so that freelancers can apply on them.",
      icon: <PlusCircle size={24} className="text-green-600" />,
      href: 'adminDashboard/uploadService',
      stats: "34 services this month"
    },
    {
      title: "Manage Services",
      description: "View, manage, edit, and delete services. See who applied on which service.",
      icon: <FileText size={24} className="text-purple-600" />,
      href: 'adminDashboard/activeServices',
      stats: "426 active services"
    },
    {
      title: "Overview",
      description: "Details about the current status and overview of the system.",
      icon: <BarChart2 size={24} className="text-orange-600" />,
      stats: "System running for 124 days"
    },
    {
      title: "Settings",
      description: "Configure system settings and preferences.",
      icon: <Settings size={24} className="text-gray-600" />,
      stats: "Last updated: 2 days ago"
    },
    {
      title: "Notifications",
      description: "Review recent Notifications. Check all the new applications sent by buyer and freelancer.",
      icon: <Bell size={24} className="text-red-600" />,
      stats: "5 unread notifications"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header with stats summary */}
      <div className="bg-white shadow-md border-b border-gray-200">
        <div className="container mx-auto py-6 px-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
              <p className="text-gray-500 mt-1">Welcome back, Admin</p>
            </div>
            <div className="mt-4 md:mt-0 flex space-x-2">
              <span className="bg-green-100 text-green-800 text-xs font-medium px-3 py-1.5 rounded-full">System Online</span>
              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1.5 rounded-full">5 Users Active</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto py-8 px-6">
        {/* Quick stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Users", value: "1,248", change: "+12%" },
            { label: "Active Services", value: "426", change: "+8%" },
            { label: "New Applications", value: "37", change: "+24%" },
            { label: "Success Rate", value: "94%", change: "+2%" }
          ].map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-4 border-l-4 border-blue-500">
              <p className="text-sm text-gray-500">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
              <p className="text-xs text-green-600">{stat.change} this month</p>
            </div>
          ))}
        </div>

        {/* Main cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, index) => {
            // Fix: Properly type the children prop
            type CardWrapperProps = {
              children: ReactNode;
            };
            
            const CardWrapper = card.href ? 
              ({children}: CardWrapperProps) => <Link href={card.href}>{children}</Link> : 
              ({children}: CardWrapperProps) => <div>{children}</div>;
            
            return (
              <CardWrapper key={index}>
                <div className={`bg-white border border-gray-200 rounded-xl shadow-md p-6 h-full ${cardHoverClass}`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 rounded-lg bg-gray-50">{card.icon}</div>
                    <span className="text-xs text-gray-500">{card.stats}</span>
                  </div>
                  <h2 className="text-xl font-bold text-gray-800 mb-2">{card.title}</h2>
                  <p className="text-gray-600 text-sm">{card.description}</p>
                </div>
              </CardWrapper>
            );
          })}
        </div>
        
        {/* Recent activity section */}
        <div className="mt-8 bg-white rounded-xl shadow-md p-6 border border-gray-200">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Activity</h2>
          <div className="space-y-3">
            {[
              { text: "New user registered", time: "5 minutes ago", type: "user" },
              { text: "Service #1242 was completed", time: "2 hours ago", type: "service" },
              { text: "Payment processed for Order #9876", time: "Yesterday", type: "payment" },
              { text: "System update completed", time: "2 days ago", type: "system" }
            ].map((activity, index) => (
              <div key={index} className="flex items-center p-3 border-l-4 border-blue-500 bg-gray-50 rounded">
                <div className={`w-2 h-2 rounded-full mr-3 ${
                  activity.type === 'user' ? 'bg-green-500' :
                  activity.type === 'service' ? 'bg-purple-500' :
                  activity.type === 'payment' ? 'bg-yellow-500' : 'bg-gray-500'
                }`}></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-800">{activity.text}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <button className="text-blue-600 text-sm font-medium hover:underline">View All Activity</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;