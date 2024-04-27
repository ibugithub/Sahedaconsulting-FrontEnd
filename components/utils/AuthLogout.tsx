import axios from "axios";
import { toast } from "react-toastify";

const handleLogout = async (router: any) => {
  const accessToken = localStorage.getItem("accessToken") as string;
  if (!accessToken) {
    router.push("/");
    return;
  }

  const parsedAccessToken = JSON.parse(accessToken);
  const headers = { Authorization: `Bearer ${parsedAccessToken}` };

  try {
    const url = `${process.env.NEXT_PUBLIC_baseApiUrl}/api/users/logout`
    await axios.post(url, null, {
      headers,
      withCredentials: true,
    });
    localStorage.clear();
    toast.success("Logout successful");
    router.push("/");
  } catch (error) {
    console.error("Logout error:", error);
    toast.error("An error occurred during logout");
  }
};

export default handleLogout;
