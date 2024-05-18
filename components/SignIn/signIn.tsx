"use client";

import React, { useState, FormEvent } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import logoImage from "../../assets/logo.jpg";
import "../../styles/login-register.css";
import Image from "next/image";
import { login, logout } from "@/lib/features/auth/authSlice";
import { useAppDispatch } from "@/lib/hooks";

const SignIn = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const url = `${process.env.NEXT_PUBLIC_baseApiUrl}/api/users/login`
      const req = await axios.post(
        url,
        formData
      );
      if (req.status === 200) {
        const response = req.data;
        localStorage.setItem(
          "accessToken",
          JSON.stringify(response.accessToken)
        );
        const cookieName = "refreshToken";
        const cookieValue = response.refreshToken;
        const expirationDate = new Date();
        expirationDate.setMonth(expirationDate.getMonth() + 1);
        document.cookie = `${cookieName}=${cookieValue}; expires=${expirationDate.toUTCString()}; path=/; SameSite=strict`;
        router.push("/profile");
        toast.success("Login successful");
        dispatch(login())
      }
    } catch (error: unknown) {
      dispatch(logout())
      if (axios.isAxiosError(error) && error.response) {
        if (
          error.response.data.error === 'Invalid Credintails'
        ) {
          console.log('Credentials error')
          setError("Email or password is incorrect");
        } else {
          console.log("unknown Error: ", error);
          toast.error("An Error has occurred");
        }
      } else {
        console.log("Unhandled Error:", error);
        toast.error("An unKnown error occurred");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-md z-10">
        <div className="text-center">
          <Image src={logoImage} alt="Logo" className="mx-auto h-12 w-auto" />
          <h2 className="mt-2 text-3xl font-bold text-gray-900">
            Sign in
          </h2>
          <div className="flex justify-center mt-2 mb-2">
            <span className="text-red-500">{error}</span>
          </div>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
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
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-b-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={handleChange}
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign in
            </button>
          </div>
        </form>
        <div className="flex items-center justify-center">
          <div className="text-sm">
            <a href="/signup/buyerSignup" className="font-medium text-indigo-600 hover:text-indigo-500">
              Don't have an account? Sign Up
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
