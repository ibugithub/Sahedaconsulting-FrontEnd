import Image from 'next/image';
import workIcon1 from '../../assets/workIcon1.png';
import workIcon2 from '../../assets/workIcon2.png';
import workIcon3 from '../../assets/workIcon3.png';

export const Work = () => {
  return (
    <div className="w-full h-full bg-white text-gray-800 px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">HOW WE WORK</h1>
        <h2 className="text-2xl text-gray-600 mb-4">We Have Some Easy Steps to Process</h2>
        <p className="text-lg text-gray-500">Here are the easy steps below that you can follow to get in touch and receive support.</p>
      </div>

      <div className="flex flex-col gap-12">
        {/* Step 1 */}
        <div className="flex flex-row items-center justify-center">
          <div className="w-1/4">
            <Image src={workIcon1} alt='Send Us Message' className="w-24 h-24 mx-auto" />
          </div>
          <div className="w-2/4 px-4">
            <h3 className="text-xl font-semibold mb-2">Send Us a Message</h3>
            <p className="text-gray-600">Join us in a replay of this webinar to see how to go from the first line of code to the first message sent in less than 15 minutes, using the form on the contact page.</p>
          </div>
        </div>

        {/* Step 2 */}
        <div className="flex flex-row-reverse items-center justify-center">
          <div className="w-1/4">
            <Image src={workIcon2} alt='Discuss With Us' className="w-24 h-24 mx-auto" />
          </div>
          <div className="w-2/4 px-4">
            <h3 className="text-xl font-semibold mb-2">Discuss With Us</h3>
            <p className="text-gray-600">Once we receive your message, our support team will review the information and provide you with suitable solutions from the services available on this website.</p>
          </div>
        </div>

        {/* Step 3 */}
        <div className="flex flex-row items-center justify-center">
          <div className="w-1/4">
            <Image src={workIcon3} alt='Get Live Working Update' className="w-24 h-24 mx-auto" />
          </div>
          <div className="w-2/4 px-4">
            <h3 className="text-xl font-semibold mb-2">Get Live Working Updates</h3>
            <p className="text-gray-600">Our support team will keep you updated on the progress of your request, ensuring you stay informed every step of the way.</p>
          </div>
        </div>

        {/* Step 4 */}
        <div className="flex flex-row-reverse items-center justify-center">
          <div className="w-1/4">
            <Image src={workIcon2} alt='Make a Payment' className="w-24 h-24 mx-auto" />
          </div>
          <div className="w-2/4 px-4">
            <h3 className="text-xl font-semibold mb-2">Make a Payment</h3>
            <p className="text-gray-600">Payment has never been easier. We use reliable and secure payment services, with privacy guaranteed. You can pay through Payoneer or PayPal.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
