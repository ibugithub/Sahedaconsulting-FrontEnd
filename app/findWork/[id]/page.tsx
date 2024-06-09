import { SingleWork } from "@/components/Findwork/singleWork";
const Page = ({params}:{params:{id:string}}) => {
  const id = params.id
  return <SingleWork id={id}/>
}
export default Page;