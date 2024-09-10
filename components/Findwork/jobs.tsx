"use client";

import { useAppSelector } from "@/lib/hooks";
import { ShowServices } from "../adminDashboard/activeServices";
import { FindWork } from "./findWork";
export const Jobs = () => {
  const isAdministrator = useAppSelector((state) => state.auth.isAdministrator);
  return (
    <>
      {isAdministrator ? <ShowServices /> : <FindWork />}
    </>
  )
}