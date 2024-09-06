'use client'

import { useRouter } from "next/navigation";
import { AxiosRequests } from "../utils/axiosRequests";
import { toast } from "react-toastify";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import verificationLogo from '../../assets/emailVerification.png';
import Image from "next/image";

export const VerifyEmail = ({ token }: { token: string }) => {
  const router = useRouter();
  const protectedRoute = AxiosRequests();
  const [isLoading, setIsLoading] = useState(false);

  const handleVerification = async () => {
    setIsLoading(true);
    const url = '/users/verifyEmail'
    try {
      const response = await protectedRoute.post(url, { token })
      if (response.status === 201) {
        toast.success('Your email has been verified successfully');
        router.push('/profile');
      }
    } catch (error) {
      toast.error('Verification failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center mt-24">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-gray-800">Email Verification</CardTitle>
          <CardDescription className="text-center text-gray-600">
            Click the button below to verify your email address
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <Image src={verificationLogo} alt="verification logo" className="w-16 h-16" />
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button
            onClick={handleVerification}
            disabled={isLoading}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Verifying...
              </>
            ) : (
              'Verify Email'
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}