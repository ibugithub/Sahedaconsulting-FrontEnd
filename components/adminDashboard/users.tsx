"use client"
import { useEffect, useState } from "react"
import { AxiosRequests } from "../utils/axiosRequests"
import { UserInterface } from "../interface"

export const ShowUsers = () => {
  const [users, setUsers] = useState<UserInterface[]>([])
  const protectedRoute = AxiosRequests();
  const getUsers = async () => {
    const url = '/admin/showUsers/'
    try {
      const response = await protectedRoute.get(url)
      if (response.status === 200) {
        setUsers(response.data);
      }
    } catch (error) {
      console.log("error happend while fetching the users at users.tsx", error);
    }

  }
  useEffect(() => { getUsers(); }, []);
  return <>
    <div className="flex flex-col items-center pt-7">
      <div>
        {users && (users.map((user) => (
          <div className="flex flex-col mb-6">
            <div>
              Name: {user.firstName} {user.lastName}
            </div>
            <div>
              Email: {user.email}
            </div>
            <div>
              Role: {user.role}
            </div>
          </div>
        )))
        }
      </div>
    </div>
  </>
}