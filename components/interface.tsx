export interface UserInterface {
  _id: string;
  firstName: string;
  lastName: string;
  name: string;
  email: string;
  password?: string;
  image?: string;
  role: 'buyer' | 'freelancer' | 'administrator';
}

export interface employmentHistory {
  jobTitle: string,
  company: string,
  startDate: Date,
  endDate: Date
}

export interface ProposalInterface {
  _id: string;
  user: string;
  service: string;
  coverLetter: string;
  price: number;
}
export interface FreelancersInterface {
  _id: string;
  user : UserInterface;
  skills? : string[],
  address? : string[],
  phone?: string[],
  profileTitle?: string,
  overview?: string[]
  employmentHistory?: employmentHistory[],
  proposals : ProposalInterface[] | string[],

}
export interface ServiceInterface {
  _id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  skills: string[];
  proposalsCount: number;
  hiredCount: number;         
  isHiringClosed: boolean;
  isCompleted: boolean;
  hiredFreelancers: FreelancersInterface[];
  appliedFreelancers: FreelancersInterface[];
  requiredFreelancers: number;
}

import { useRouter } from "next/navigation";

type NextNavigationRouter = ReturnType<typeof useRouter>;
export interface CustomRouter extends NextNavigationRouter {
}
