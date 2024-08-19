import { FreelancerProposals } from "@/components/adminDashboard/proposals";

const Page = ({params}:{params:{id:string}}) => {
  const id = params.id;
  return <FreelancerProposals id = {id} />
}
export default Page;