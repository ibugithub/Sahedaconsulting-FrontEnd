import { useState } from 'react'
import { AxiosRequests } from '../utils/axiosRequests'
import { toast } from 'react-toastify';

export const ChangePassword = () => {
  const protectedRoute = AxiosRequests();
  interface passwordInfoInterface {
    oldPassword: string,
    newPassword: string
  }
  const [isClicked, setIsClicked] = useState(false)
  const [passwordInfo, setPasswordInfo] = useState<passwordInfoInterface>({
    oldPassword: '',
    newPassword: ''
  })
  const changePassword = async(e: React.FormEvent<HTMLFormElement>) => {
    setIsClicked(!isClicked);
    e.preventDefault();
    const url = '/users/changePassword';
    const userData = passwordInfo;
    try {
      const response = await protectedRoute.post(url, userData);
      if (response.status === 201) {
        toast.success("Password changed successfully");
      }
    } catch (err:any) {
      console.error("Error while changing password at changePass.tsx", err)
      if(err.response.data.message === "Old password is incorrect") {
        toast.error('Old password is incorrect')
      }
    }
  }

  return (
    <div>
      {isClicked ? (<form className='flex flex-col gap-4' onSubmit={changePassword}>
        <input placeholder='Enter old password' type='password' name='oldPassword' value={passwordInfo.oldPassword} className="text-gray-800 border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-purple-600" onChange={(e) => (setPasswordInfo({ ...passwordInfo, oldPassword: e.target.value }))} />
        <input placeholder='Enter new password' type='password' name='newPassword' value={passwordInfo.newPassword} className="text-gray-800 border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-purple-600" onChange={(e) => (setPasswordInfo({ ...passwordInfo, newPassword: e.target.value }))} />
        <button type='submit' className='text-white bg-green-700 rounded-lg py-2 px-2'>submit</button>
      </form>) : (
        <button className="text-white bg-green-800 rounded-lg py-2 px-4" onClick={() => setIsClicked(!isClicked)} >Change Password</button>
      )
      }
    </div>
  )
}