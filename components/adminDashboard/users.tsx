"use client"
import { useEffect, useState } from "react"
import { AxiosRequests } from "../utils/axiosRequests"
export const ShowUsers = () => {
  const [users, setUsers] = useState([])
  const protectedRoute = AxiosRequests();
  const getUsers = async () => {
    const url = '/admin/showUsers/'
    try {
      const users = await protectedRoute.get(url)
      setUsers(users.data);
      console.log('the users are', users.data)
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