import React, { useState, useEffect } from 'react';
import { Bell, X } from 'lucide-react';
import { NotificationInterface } from '../interface';
import Link from 'next/link';
import { markAsRead } from './markAsRead';
import io from 'socket.io-client';
import { fetchNotifications } from '@/lib/features/notifications/notificationSlice';
import { useAppSelector } from '@/lib/hooks';
import { useAppDispatch } from '@/lib/hooks';

export const Notification: React.FC = () => {
  const dispatch = useAppDispatch();
  const notifications = useAppSelector((state) => state.notifications.notifications);
  const unReadNotifications = notifications.filter((notification: NotificationInterface) => !notification.isRead);
  const [isOpen, setIsOpen] = useState(false);

  const saySomething = () => {
    console.log('I am here saing I love you')
  }
  const refresh = () => {
    dispatch(fetchNotifications());
  }
  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_baseApiUrl as string, {
      withCredentials: true,
    });

    socket.on('notification', (message) => {
      refresh();
      saySomething();
      console.log('the socket message is', message);
    })

    return () => {
      socket.disconnect();
    };

  }, []);

  const toggleNotifications = () => setIsOpen(!isOpen);

  const handleLinkClick = async(notificationId: string) => {
    await markAsRead(notificationId);
    dispatch(fetchNotifications());
  }

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
        {unReadNotifications && unReadNotifications.length > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
            {unReadNotifications.length}
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
            {unReadNotifications && unReadNotifications.length > 0 ? (
              unReadNotifications.map((notification: NotificationInterface) => (
                <Link href={`/adminDashboard/proposals/${notification.typeId}`} key={notification._id} className="p-4 hover:bg-gray-50" onClick={() => handleLinkClick(notification._id)}>
                  <div className="px-5 hover:bg-gray-50">
                    <p className="text-sm text-gray-800">{notification.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{formatDate(notification.createdAt)}</p>
                  </div>
                </Link>
              ))
            ) : (
              <p className="p-4 text-sm text-gray-500">No new notifications</p>
            )}
          </div>

          <div className="py-2 px-3 bg-gray-100 text-right">
            <Link href="/allNotifications">
              <button className="text-sm text-blue-600 hover:text-blue-800">
                See all notifications
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};