export enum UserRole {
  Buyer = 'buyer',
  Freelancer = 'freelancer',
  Administrator = 'administrator',
}

export interface UserInterface {
  _id: string;
  firstName: string;
  lastName: string;
  name: string;
  email: string;
  password?: string;
  image?: string;
  role: UserRole;
}

export interface employmentHistoryObj {
  jobTitle: string,
  company: string,
  startDate: Date,
  endDate: Date
}

export interface ProposalInterface {
  _id: string;
  freelancer: FreelancersInterface;
  service: ServiceInterface;
  coverLetter: string;
  price: number;
  status: 'pending' | 'accepted' | 'rejected';
}
export interface FreelancersInterface {
  _id: string;
  user : UserInterface;
  skills? : string[],
  address? : string,
  phone?: string,
  profileTitle?: string,
  overview?: string
  employmentHistory?: employmentHistoryObj[],
  proposals : ProposalInterface[] | string[],
}

export interface FreelancUserInterface {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  profileImage: File | string | unknown;
  profileTitle?: string,
  overview?: string,
  skills? : string[],
  address? : string,
  role: 'buyer' | 'freelancer' | 'administrator',
  phone?: string,
  hireCount?: number,
  employmentHistory: employmentHistoryObj[],
}

export interface ServiceInterface {
  _id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  skills: string[];
  proposals: ProposalInterface[];
  proposalsCount: number;
  hiredCount: number;         
  isHiringClosed: boolean;
  isCompleted: boolean;
  hiredFreelancers: FreelancersInterface[];
  appliedFreelancers: FreelancersInterface[];
  requiredFreelancers: number;
}

export interface EmploymentHistoryProps {
  userInfo : FreelancUserInterface,
  setUserInfo: React.Dispatch<React.SetStateAction<FreelancUserInterface>>;
  isEditMode : boolean,
  protectedRoute : any;
}
import { useRouter } from "next/navigation";

type NextNavigationRouter = ReturnType<typeof useRouter>;
export interface CustomRouter extends NextNavigationRouter {
}

export interface UserInfoInterface {
  user : UserInterface,
  freelancer : FreelancersInterface,
  proposal : ProposalInterface,
  service : ServiceInterface
}