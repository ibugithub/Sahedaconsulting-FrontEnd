"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../../assets/logo.jpg';
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { login, administratorLogin } from '@/lib/features/auth/authSlice';
import { AxiosRequests } from '../utils/axiosRequests';

const Navbar = () => {
  const protectedRoute = AxiosRequests();
  const [showDropdown, setShowDropdown] = useState(false);
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);
  const isAdministrator = useAppSelector(state => state.auth.isAdministrator);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  useEffect(() => {
    const token = localStorage.getItem('accessToken');

    if (token) {
      const checkAuthenticated = async () => {
        const url = '/users/isAuthenticated';
        try {
          const response = await protectedRoute.get(url);
          if (response.status === 200) {
            dispatch(login());
          }
        } catch (error) {
          console.log("Error while checking authenticated user at navbar.tsx", error);
        }
      }
      const checkAdministrator = async () => {
        const url2 = '/users/isAdministrator';
        try {
          const response = await protectedRoute.get(url2);
          if (response.status === 200) {
            dispatch(administratorLogin());
          }
        } catch (error) {
          console.log("Error while checking administrator user at navbar.tsx", error);
        }
      }
      checkAuthenticated();
      checkAdministrator();
    }
  }, [])

  return (
    <nav className="bg-white text-gray-700 sticky top-0 p-3 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {<Link href="/" className="text-xl font-bold ml-2">
            <div className="flex items-center">
              <Image
                src={logo}
                alt="Logo"
                // className="h-8 w-8"
                width={200}
                height={200}
              />
            </div>
          </Link>}

          {/* desktop menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">

              <Link href="/services" className="hover:text-gray-400 px-3 py-2 rounded-md text-sm font-medium">
                Services
              </Link>

              <Link href="/contForServices" className="hover:text-gray-400 px-3 py-2 rounded-md text-sm font-medium">
                Connect
              </Link>

              <Link href="/findWork" className="hover:text-gray-400 px-3 py-2 rounded-md text-sm font-medium">
                Jobs
              </Link>

              {/* <Link href="/" className="hover:text-gray-400 px-3 py-2 rounded-md text-sm font-medium">
                News
              </Link> */}

              {isAuthenticated ? (
                <Link href='/profile'>
                  <button
                    className="hover:text-gray-400 px-3 py-2 rounded-md text-sm font-medium"
                    aria-haspopup="true"
                  >
                    Profile
                  </button>
                </Link>
              ) : (
                <Link href='/signin'>
                  <button
                    className="hover:text-gray-400 px-3 py-2 rounded-md text-sm font-medium"
                    aria-haspopup="true"
                  >
                    Sign In
                  </button>
                </Link>
              )}

              {isAdministrator && (
                <Link href="/adminDashboard" className="hover:text-gray-400 px-3 py-2 rounded-md text-sm font-medium">
                  Admin
                </Link>
              )
              }

            </div>
          </div>

          {/* mobile Nav */}
          <div className={`${showDropdown ? 'block' : 'hidden'} flex gap-3 absolute top-1 right-5 bg-black border-gray-100 rounded border-2`} >
            <div className="flex flex-col items-baseline space-x-4 ml-0">
              <Link href="/contForServices" className="hover:text-gray-400 px-3 py-2 rounded-md text-sm font-medium">
                Connect
              </Link>

              <Link href="/findWork" className="hover:text-gray-400 px-3 py-2 rounded-md text-sm font-medium">
                Jobs
              </Link>

              <Link href="/findWork" className="hover:text-gray-400 px-3 py-2 rounded-md text-sm font-medium">
                News
              </Link>

              {isAuthenticated ? (
                <Link href='/profile'>
                  <button
                    className="hover:text-gray-400 px-3 py-2 rounded-md text-sm font-medium"
                    aria-haspopup="true"
                  >
                    Profile
                  </button>
                </Link>
              ) : (
                <Link href='signin'>
                  <button
                    className="hover:text-gray-400 px-3 py-2 rounded-md text-sm font-medium"
                    aria-haspopup="true"
                  >
                    Sign in
                  </button>
                </Link>
              )}


              {isAdministrator && (
                <Link href="/adminDashboard" className="hover:text-gray-400 px-3 py-2 rounded-md text-sm font-medium">
                  Admin
                </Link>
              )}

            </div>
            {/* Cancel button */}
            <button className={`${!showDropdown ? 'hidden' : 'flex'} mt-2 pr-3`} onClick={toggleDropdown}>
              <span className='sr-only'>cancel button</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          {/* menu button */}
          <button
            type="button"
            className={`bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white ${showDropdown ? 'hidden' : '-mr-2 flex'} md:hidden`}
            aria-controls="mobile-menu"
            aria-expanded="false"
            onClick={toggleDropdown}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="block h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
