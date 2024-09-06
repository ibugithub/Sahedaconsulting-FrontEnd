"use client";
import { VerifyEmail } from "@/components/Profile/verifyEmail";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

const Page = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  if (!token) {
    return <div>invalid token</div>;
  }
  return <VerifyEmail token={token} />;
};

const SuspenseWrapper = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Page />
  </Suspense>
);

export default SuspenseWrapper;
