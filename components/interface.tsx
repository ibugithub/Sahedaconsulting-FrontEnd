export interface Service {
  _id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  skills: string[];
  proposalsCount: number;
  hiredCount: number;
}

export interface ProposalInterface {
  _id: string;
  user: string;
  service: string;
  coverLetter: string;
  price: number;
}

import { useRouter } from "next/navigation";

type NextNavigationRouter = ReturnType<typeof useRouter>;
export interface CustomRouter extends NextNavigationRouter {
}
