import axios from 'axios';

export const markAsRead = async(notificationId: string) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_baseApiUrl}/api/users/markNotificationAsRead/${notificationId}`;
    await axios.put(url);
  } catch (error) {
    console.error("Error while marking notification as read at notification.tsx", error);
  }
}