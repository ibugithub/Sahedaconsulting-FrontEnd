import { ProposalDetails } from "@/components/freelancer/proposalDetails";

const Page = ({ params }: { params: { id: string } }) => {
  return (<ProposalDetails id={params.id} />);
};

export default Page;
