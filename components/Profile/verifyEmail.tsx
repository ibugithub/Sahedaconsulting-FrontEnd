'use client'
import { useRouter } from "next/navigation";
import { AxiosRequests } from "../utils/axiosRequests";
import { toast } from "react-toastify";

export const VerifyEmail = ({token}: {token: string}) => {
  const router = useRouter();
  const protectedRoute = AxiosRequests();
  const handleVerification = async() => {
    const url = '/users/verifyEmail'
    const response = await protectedRoute.post(url, {token})
    if (response.status === 201) {
      toast.success('your email has been verified successfully');
      router.push('/profile');
    }
  }
 return (
  <button className="text-gray-800" onClick={handleVerification}>
    Verify your email
  </button>
 );
}