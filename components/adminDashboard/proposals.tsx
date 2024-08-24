"use client";
import { useEffect, useState } from "react";
import { AxiosRequests } from "../utils/axiosRequests";
import { UserInfoInterface } from "../interface";
import Link from "next/link";
import { handleHire } from "./handleHire";

export const FreelancerProposals = ({ id }: { id: string }) => {
  const [userInfo, setUserInfo] = useState<UserInfoInterface | null>(null);

  const getUserInfo = async () => {
    const url = "admin/sendFreelancerProposals/";
    const protectedRoute = AxiosRequests();
    try {
      const response = await protectedRoute.post(url, { id });
      if (response.status === 200) {
        console.log('the response is', response.data);
        setUserInfo(response.data);
        console.log('the userInfo is ', userInfo);
      }
    } catch (error) {
      console.error("Error while getting proposals at proposals.tsx:", error);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, [id]);
  
  const Hire = async (e: React.FormEvent) => {
   await handleHire(e, freelancer._id, service._id);
    getUserInfo();
  }
  if (!userInfo) return <div className="text-gray-800">Loading...</div>;

  const { user, freelancer, proposal, service } = userInfo;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg text-gray-800">
      {/* Freelancer Info */}
      <div className="flex items-center mb-6">
        <img
          src={`https://res.cloudinary.com/dqxxwptju/image/upload/v1714319969/${user.image}`}
          alt={`${user.firstName} ${user.lastName}`}
          className="w-20 h-20 rounded-full object-cover mr-4"
        />
        <div>
          <h2 className="text-xl font-semibold text-gray-800">{user.firstName} {user.lastName}</h2>
          <p className="text-gray-600">{freelancer.profileTitle}</p>

          <Link href={`/adminDashboard/freelancerDetails/${freelancer._id}`} className="text-blue-600 hover:underline mt-2 inline-block">
            View Profile
          </Link>
        </div>
      </div>

      {/* Service and Proposal Info */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Service: {service.title}</h3>
        <p className="text-gray-700 mt-2">{proposal.coverLetter}</p>
      </div>

      {/* Proposal Details */}
      <div className="flex justify-between items-center">
        <div>
          <p className="text-gray-700"><strong>Price:</strong> ${proposal.price}</p>
          <p className={`text-sm font-semibold mt-2 ${proposal.status === 'accepted' ? 'text-green-600' : proposal.status === 'rejected' ? 'text-red-600' : 'text-yellow-600'
            }`}>
            Status: {proposal.status.charAt(0).toUpperCase() + proposal.status.slice(1)}
          </p>
        </div>

        {proposal.status === 'accepted' ? (
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-md cursor-none"
          >
            Hired
          </button>
        ) : (<button
          className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transition duration-300"
          onClick={(e) => Hire(e)}
        >
          Hire {user.firstName}
        </button>)}
      </div>
    </div>
  );
};
