import { ServiceDetails } from "@/components/adminDashboard/serviceDetails";

const Page = ({ params }: { params: {id: string}}) => { 
  return <ServiceDetails id={params.id}/>
}

export default Page;