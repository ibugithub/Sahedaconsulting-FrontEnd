"use client"
import { VerifyEmail } from "@/components/Profile/verifyEmail";
import { useSearchParams } from "next/navigation";
const Page = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  if(!token){
    return <div>invalid token</div>
  }
  return <VerifyEmail token={token} />
}
export default Page;