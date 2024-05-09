'use client'

import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { AxiosRequests } from "../utils/axiosRequests";
import { logout } from "@/lib/features/auth/authSlice"
import { CustomRouter } from "../interface";
import { AppDispatch } from "@/lib/store";


export const Logout = async(router: CustomRouter, dispatch:AppDispatch) => {
  const reqInstance = AxiosRequests(router);
  const refresh_token = Cookies.get("refreshToken")
  const formData = { "refreshToken": refresh_token }
  const url = '/users/logout'
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

}