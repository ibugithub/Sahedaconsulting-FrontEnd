"use client";

import React, { FormEvent, useState } from "react";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import logoImage from "../../assets/logo.jpg";
import "../../styles/login-register.css";
import Image from "next/image";
import Link from "next/link";

export const FreelancerSignUp = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    cPassword: "",
    Code: "",
    role: "freelancer"
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const { email, firstName, lastName, password, cPassword, Code } = formData;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !firstName || !lastName || !password || !cPassword || !Code) {
      setError("All fields are required");
      return;
    }

    if (password !== cPassword) {
      setError("Passwords do not match");
      return;
    }

    setError("");

    try {
      const domain = window.location.origin
      if (!domain) {
        toast.error("frontend Domain not found");
        console.error('frontend domain not found at administrator.tsx file');
        return
      }
      const url = `${process.env.NEXT_PUBLIC_baseApiUrl}/api/users/register`
      const response = await axios.post(
        url,
        { formData, frontEndDomain: domain },
      );
      if (response.status === 201) {
        router.push("/signin");
        toast.success("Registration successful");
        toast.success('A verification link has been sent to the email address');
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.response) {
          const responseData = axiosError.response.data as { error: string };
          if (
            axiosError.response.status === 400 &&
            responseData.error === "User already exists"
          ) {
            setError("User already exists");
          } else if (
            axiosError.response.status === 400 &&
            responseData.error === "Invalid secret code"
          ) {
            setError("Invalid secret code");
          }
          else {
            setError("An error occurred");
          }
        } else {
          console.log("Error:", axiosError.message);
          setError("Network error. Please try again later.");
        }
      } else {
        console.log("Unknown error: ", error);
        setError("An unknown error occurred.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-md z-10">
        <div className="text-center">
          <Image src={logoImage} alt="Logo" className="mx-auto h-12 w-auto" />
          <p className="mt-2 text-sm text-gray-600">Sahada Consultancy <span className="text-green-700 font-bold"> Freelancer</span>  account</p>
        </div>
        <div className="flex justify-center text-sm ">
          <div className="text-red-800">{error}</div>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-t-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="first-name" className="sr-only">First Name</label>
              <input
                id="first-name"
                name="firstName"
                type="text"
                autoComplete="given-name"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="First Name"
                value={firstName}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="last-name" className="sr-only">Last Name</label>
              <input
                id="last-name"
                name="lastName"
                type="text"
                autoComplete="family-name"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Last Name"
                value={lastName}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="last-name" className="sr-only">secret code</label>
              <input
                id="secret-code"
                name="Code"
                type="text"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Secret Code"
                value={Code}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="confirm-password" className="sr-only">Confirm Password</label>
              <input
                id="confirm-password"
                name="cPassword"
                type="password"
                autoComplete="new-password"
                required
                className="appearance-none rounded-b-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Confirm Password"
                value={cPassword}
                onChange={handleChange}
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign up
            </button>
          </div>
        </form>
        <div className="flex flex-col items-center justify-center">
          <div className="text-sm  font-medium text-indigo-600">

            Already have an account? <Link href="/signin" className=" hover:text-indigo-500"> Sign In
            </Link>
          </div>
          <div className="text-sm font-medium text-indigo-600">
            Wanna Post some works?
            <Link className="hover:text-indigo-500" href="/signup/buyerSignup" > Buyer Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};


