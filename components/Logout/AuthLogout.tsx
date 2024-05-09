// import axios from "axios";
// import { toast } from "react-toastify";

// const handleLogout = async (router: any) => {
//   const accessToken = localStorage.getItem("accessToken") as string;
//   if (!accessToken) {
//     router.push("/");
//     return;
//   }

//   const parsedAccessToken = JSON.parse(accessToken);
//   const headers = { Authorization: `Bearer ${parsedAccessToken}` };

//   try {
//     const url = `${process.env.NEXT_PUBLIC_baseApiUrl}/api/users/logout`
//     await axios.post(url, null, {
//       headers,
//       withCredentials: true,
//     });
//     localStorage.clear();
//     toast.success("Logout successful");
//     router.push("/");
//   } catch (error) {
//     console.error("Logout error:", error);
//     toast.error("An error occurred during logout");
//   }
// };

// export default handleLogout;


"use client"
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { AxiosRequests } from "../utils/axiosRequests";
import { CustomRouter } from "../interface";
import { useAppDispatch } from "@/lib/hooks"
import { logout } from "@/lib/features/auth/authSlice"

export const HandleLogout = async (router: CustomRouter) => {
  const dispatch = useAppDispatch();
  const reqInstance = AxiosRequests(router);
  const refresh_token = Cookies.get("refreshToken")
  const formData = { "refreshToken": refresh_token }
  const BaseUrl = process.env.NEXT_PUBLIC_baseApiUrl
  const url = `${BaseUrl}/api/users/logout`
  try {
    const res = await reqInstance.post(url, formData);
    dispatch(logout())
    if (res.status === 200) {
      localStorage.clear();
      Cookies.remove('refreshToken')
      toast.success("Logout successful");
      router.push("/");
      return;
    }
  } catch (error: any) {
    if (error.response.status === 401) {
      if (typeof window !== "undefined") {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("email");
        localStorage.removeItem("name");
        router.push("/signin");
        toast.error("Session expired");
      }
      return;
    } else {
      console.error("Logout error:", error.response);
      toast.error("An error occurred during logout");
    }
  }
};
