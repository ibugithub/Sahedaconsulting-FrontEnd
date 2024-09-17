import React, { useState, useEffect } from 'react';
import { Bell, X } from 'lucide-react';
import { AxiosRequests } from '../utils/axiosRequests';
import { NotificationInterface } from '../interface';



export const Notification: React.FC = () => {
  const protectedRoute = AxiosRequests();
  const [notifications, setNotifications] = useState<NotificationInterface[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const fetchNotifications = async () => {
    const url = '/users/showNotifications';
    try {
      const response = await protectedRoute.get<{ notifications: NotificationInterface[] }>(url);
      if (response.status === 200) {
        setNotifications(response.data.notifications);
      }
    } catch (error) {
      console.error("Error while fetching notifications", error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const toggleNotifications = () => setIsOpen(!isOpen);

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="relative">
      <button
        onClick={toggleNotifications}
        className="p-2 text-gray-600 hover:text-gray-800 focus:outline-none"
      >
        <Bell size={24} />
        {notifications.length > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
            {notifications.length}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg overflow-hidden z-20 border border-gray-200">
          <div className="py-2 px-3 bg-gray-100 flex justify-between items-center">
            <h3 className="text-sm font-semibold text-gray-700">Notifications</h3>
            <button type="button" title='bellIcon' onClick={toggleNotifications} className="text-gray-500 hover:text-gray-700">
              <X size={18} />
            </button>
          </div>
          <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
            {notifications.length > 0 ? (
              notifications.map((notification: NotificationInterface) => (
                <div key={notification._id} className="p-4 hover:bg-gray-50">
                  <p className="text-sm text-gray-800">{notification.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{formatDate(notification.createdAt)}</p>
                </div>
              ))
            ) : (
              <p className="p-4 text-sm text-gray-500">No new notifications</p>
            )}
          </div>
          {notifications.length > 0 && (
            <div className="py-2 px-3 bg-gray-100 text-right">
              <button className="text-sm text-blue-600 hover:text-blue-800">
                Mark all as read
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};