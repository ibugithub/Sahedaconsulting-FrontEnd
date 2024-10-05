"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { BounceLoader } from "react-spinners";
import { AxiosRequests } from "../utils/axiosRequests";
import { FreelancerProfile } from "./freelancerProfile";
import { BuyerProfile } from "./buyerProfile";
import { AdministratorProfile } from "./adminstratorProfile";

export const Profile = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [userRole, setUserRole] = useState('');


  useEffect(() => {
    const fetchInfo = async () => {
      const protectedRoute = AxiosRequests(router);
      const accessToken = localStorage.getItem("accessToken") ?? "";
      if (accessToken) {
        const url = '/users/profile'
        try {
          const response = await protectedRoute.post(url)
          setIsLoading(false);
          if (response.status === 200) {
            setUserRole(response.data.userInfo.role)
          } else {
            setIsAuthenticated('notAuthenticated');
          }
        } catch (err) {
          setIsAuthenticated('notAuthenticated');
          console.error("Error while fetching profile data at profile.tsx", err)
        }
      }
      else {
        setIsAuthenticated('notAuthenticated');
      }
    }
    fetchInfo();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isAuthenticated == "notAuthenticated") {
    router.push('/signin')
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <BounceLoader color="#6366f1" size={60} />
      </div>
    );
  }
  return (
    <>
      {userRole === 'freelancer' ? (
        <FreelancerProfile />
      ) : userRole === 'buyer' ?
        (<BuyerProfile />) :
        (<AdministratorProfile />)
      }
    </>
  );
};

