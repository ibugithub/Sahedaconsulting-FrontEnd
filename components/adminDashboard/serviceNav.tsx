import Link from "next/link"

export const ServiceNav = () => {
  return (
    <div className="flex justify-end mb-8">
    <ul className="text-gray-500 flex gap-4">
     <Link href="/adminDashboard/activeServices"> <li className="cursor-pointer hover:text-gray-700">Active</li> </Link> 
     <Link href="/adminDashboard/hiredServices"> <li className="cursor-pointer hover:text-gray-700">Hired Services</li></Link>
     <Link href="/adminDashboard/trashedServices"> <li className="cursor-pointer hover:text-gray-700">Trashed</li> </Link>
    </ul>
  </div>
  )
}