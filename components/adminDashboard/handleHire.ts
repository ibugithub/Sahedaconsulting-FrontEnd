import { AxiosRequests } from '../utils/axiosRequests';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export const handleHire = async (e: React.FormEvent, freelancer: string, service: string) => {
  e.preventDefault();
  const protectedRoute = AxiosRequests();

  try {
    const url = `/admin/hireFreelancer/`
    const data = { 'freelancerId': freelancer, 'serviceId': service }
    const response = await protectedRoute.post(url, data);
    if (response.status === 201) {
      toast.success('Hired successfully');
    }
  } catch (error) {
    console.error('Error submitting proposal:', error);
  }
};