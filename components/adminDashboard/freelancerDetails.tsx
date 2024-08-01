"use client"
import { AxiosRequests } from "../utils/axiosRequests";
import { useEffect, useState } from "react";

export const FreelancerDetails = ({ id }: { id: string }) => {
  const protectedRoute = AxiosRequests();
  const getDetails = async() => {
    const url = 'admin/sendFreelancerDetails/';
    try {
      console.log('request will be sent soon')
      const response = await protectedRoute.post(url);
    } catch (error) {
      console.error('Error while getting details at freelancerDetails.tsx', error);
    }
  }
  useEffect(() => {
    getDetails();
  },[]
)
  return (
    <>
      Hello world! {id}
    </>
  );
}
