export interface Service {
  _id: string;
  title: string;
  description: string;
  price: number;
  image: string;
}

import { useRouter } from "next/navigation";

type NextNavigationRouter = ReturnType<typeof useRouter>;
export interface CustomRouter extends NextNavigationRouter {
}
