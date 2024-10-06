"use client";
import React from 'react';
import { AxiosRequests } from '../utils/axiosRequests';
import { Bell, Trash2, RefreshCw, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { NotificationInterface } from '../interface';
import { markAsRead } from './markAsRead';
import { fetchNotifications } from '@/lib/features/notifications/notificationSlice';
import { useAppSelector } from '@/lib/hooks';
import { useAppDispatch } from '@/lib/hooks';


export const ShowAllNotifications = () => {
  const dispatch = useAppDispatch();
  const notifications: NotificationInterface[] = useAppSelector((state) => state.notifications.notifications)
  const status = useAppSelector((state) => state.notifications.status);
  const protectedRoute = AxiosRequests();

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const refresh = () => {
    dispatch(fetchNotifications());
  }
  const handleLinkClick = async(notificationId: string) => {
    await markAsRead(notificationId);
    refresh();
  }

  const deleteNotification = async (id: string) => {
    try {
      await protectedRoute.delete(`/users/deleteNotification/${id}`);
      dispatch(fetchNotifications());
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };

  const getNotificationIcon = (type: NotificationInterface['type']) => {
    switch (type) {
      case 'info': return <Bell className="text-blue-500" />;
      case 'warning': return <Bell className="text-yellow-500" />;
      case 'success': return <CheckCircle className="text-green-500" />;
      case 'error': return <Bell className="text-red-500" />;
      default: return <Bell className="text-gray-500" />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">All Notifications</h1>
        <button
          onClick={refresh}
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
        >
          <RefreshCw size={18} className="mr-2" />
          Refresh
        </button>
      </div>

      {status === 'loading' ? (
        <div className="text-center py-10">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading notifications...</p>
        </div>
      ) : notifications.length > 0 ? (
        <div className="space-y-4">
          {notifications.map((notification) => (
            <div
              key={notification._id}
              className={`flex items-start p-4 rounded-lg shadow ${notification.isRead ? 'bg-white' : 'bg-blue-50'
                }`}
            >
              <div className="flex-shrink-0 mr-4">
                {getNotificationIcon(notification.type)}
              </div>
                <div className="flex-grow">
                <Link href={ notification.type === 'addProposal' ? `/adminDashboard/proposals/${notification.typeId}` : `/freelancer/proposals/${notification.typeId} `} key={notification._id} className="" onClick={() => handleLinkClick(notification._id)}>
                  <p className={`text-sm ${notification.isRead ? 'text-gray-600' : 'text-gray-800 font-semibold'}`}>
                    {notification.message}
                  </p>
                  </Link>
                  <p className="text-xs text-gray-500 mt-1">{formatDate(notification.createdAt)}</p>
                </div>
              
              <div className="flex-shrink-0 ml-4">
                {!notification.isRead && (
                  <button
                    onClick={() => handleLinkClick(notification._id)}
                    className="text-blue-500 hover:text-blue-600 mr-2"
                    title="Mark as read"
                  >
                    <CheckCircle size={18} />
                  </button>
                )}
                <button
                  onClick={() => deleteNotification(notification._id)}
                  className="text-red-500 hover:text-red-600"
                  title="Delete notification"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <Bell size={48} className="mx-auto text-gray-400" />
          <p className="mt-4 text-gray-600">No notifications to display.</p>
        </div>
      )}
    </div>
  );
};
