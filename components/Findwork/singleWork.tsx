'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { ServiceInterface } from '../interface';
import { BounceLoader, } from "react-spinners";
import { AxiosRequests } from '../utils/axiosRequests';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';


export const SingleWork = ({ id }: { id: string }) => {
  const protectedRoute = AxiosRequests();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [work, setWork] = useState<ServiceInterface | null>(null);
  const [proposalData, setProposalData] = useState({
    userId: '',
    service: id,
    coverLetter: '',
    price: 0,
  });
  const [isApplied, setIsApplied] = useState(false);

  useEffect(() => {
    const fetchWork = async () => {
      // Fetch Service info
      try {
        const url = `${process.env.NEXT_PUBLIC_baseApiUrl}/api/freelancer/showsingleWork/${id}`;
        const response = await axios.get(url);
        if (response.status === 200) {
          const service = response.data.service;
          setWork(service);
          setIsLoading(false);
        }
      } catch (error) {
        console.log('Error while fetching work at singleWork.tsx', error);
        setIsLoading(false);
      }
    }
    fetchWork();
  }, [id]);

  useEffect(() => {
    const checkIsApplied = async () => {
      try {
        setIsLoading(true);
        const url = `/freelancer/isApplied/`;
        const response = await protectedRoute.post(url, proposalData);
        if (response.status === 200) {
          setIsApplied(response.data.isApplied);
          setIsLoading(false);
          console.log('the isApplied is', isApplied, response.data.isApplied);
        }
      } catch (error) {
        console.error('Error while checking if user is applied:', error);
      }
    }
    checkIsApplied();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [proposalData.userId, proposalData.service]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = `/freelancer/addProposal/`
      const response = await protectedRoute.post(url, proposalData);
      console.log('the response is', response);
      if (response.status === 200) {
        setProposalData((prev) => ({
          ...prev,
          coverLetter: '',
          price: 0,
        }))
        router.push('/findWork');
        toast.success('Proposal submitted successfully');
      }
    } catch (error: any) {
      console.error('Error submitting proposal:', error);
      if (error.response.data.message === 'User not authenticated') {
        toast.error('Login to submit proposal');
        router.push('/signin');
      }
      if (error.response.data.message === 'User not verified') {
        toast.info('Verify your email account to submit proposal');
        router.push('/profile')
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <BounceLoader color="#6366f1" size={60} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {work && (
          <>
            {/* Breadcrumb - Similar to Upwork */}
            <nav className="flex mb-6 text-sm">
              <ol className="flex items-center space-x-2">
                <li>
                  <a href="/findWork" className="text-green-600 hover:text-green-700">
                    Browse Jobs
                  </a>
                </li>
                <li className="flex items-center">
                  <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  <span className="ml-2 text-gray-500 truncate">{work.title}</span>
                </li>
              </ol>
            </nav>

            {/* Main Job Card */}
            <div className="bg-white shadow-sm border border-gray-200 rounded-lg overflow-hidden mb-6">
              {/* Job Header Section */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex justify-between items-start">
                  <h1 className="text-2xl font-semibold text-gray-900">{work.title}</h1>
                  <button className="text-green-600 hover:text-green-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                    </svg>
                  </button>
                </div>
                <div className="mt-2 flex flex-wrap items-center gap-y-2 text-sm text-gray-500">
                  <span className="mr-4 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    ${work.price}
                  </span>
                  <span className="mr-4 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    {work.requiredFreelancers} freelancer{work.requiredFreelancers !== 1 && 's'} needed
                  </span>
                  <span className="mr-4 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    {work.proposalsCount} proposals
                  </span>
                </div>
              </div>

              {/* Job Description Section */}
              <div className="p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Project Description</h2>
                <div className="text-gray-700 mb-6 whitespace-pre-line">
                  {work.description}
                </div>

                {/* Skills Section */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Skills and Expertise</h3>
                  <div className="flex flex-wrap gap-2">
                    {work.skills.map((skill, index) => (
                      <span key={index} className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-1 rounded-full">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Activity on this job */}
                <div className="flex flex-wrap text-sm text-gray-500 mb-6 border-t border-gray-100 pt-4">
                  <div className="w-full md:w-1/2 mb-2 md:mb-0">
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {work.hiredCount} freelancers hired
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Proposal Section */}
            <div className="bg-white shadow-sm border border-gray-200 rounded-lg overflow-hidden">
              <div className="p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                  {isApplied ? "Your Proposal" : "Submit a Proposal"}
                </h2>

                {isApplied ? (
                  <div className="bg-green-50 border border-green-200 text-green-700 rounded-lg p-4 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>You have already applied for this job.</span>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Cover Letter</label>
                      <textarea
                        rows={5}
                        placeholder="Introduce yourself and explain why you're a good fit for this job"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 text-gray-700 text-sm"
                        value={proposalData.coverLetter}
                        onChange={(e) => setProposalData((prev) => ({ ...prev, coverLetter: e.target.value }))}
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Your Bid</label>
                      <div className="relative mt-1 rounded-md shadow-sm max-w-xs">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                          <span className="text-gray-500 sm:text-sm">$</span>
                        </div>
                        <input
                          type="number"
                          placeholder="Amount"
                          className="block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-green-500 focus:ring-green-500 sm:text-sm"
                          value={proposalData.price}
                          onChange={(e) => setProposalData((prev) => ({ ...prev, price: Number(e.target.value) }))}
                          required
                        />
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                          <span className="text-gray-500 sm:text-sm">USD</span>
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full md:w-auto px-6 py-3 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
                    >
                      Submit Proposal
                    </button>
                  </form>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
