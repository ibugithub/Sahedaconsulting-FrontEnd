import { FreelancerDetails } from "@/components/adminDashboard/freelancerDetails";
const Page = ({params}:{params:{id:string}}) => {
  const id = params.id;
  return <FreelancerDetails id = {id} />
}
export default Page;