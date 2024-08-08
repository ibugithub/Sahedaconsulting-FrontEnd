import Image from 'next/image';
import service1 from '../../assets/service1.jpg';
import service2 from '../../assets/service2.jpg';
import service3 from '../../assets/service3.jpg';
export const Service = () => {
  return (
    <>
      {/* Services Section */}
      <div className=" py-12 lg:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">Our Services</h2>
            <p className="text-lg text-gray-500 mt-4">
            Here we do all kinds of engineering services like civil, environmental, structural and so on. Other services that we provide Management Consulting, IT Support and Consultation, Education Consulting etc.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <Image src={service1} alt="Engineering Consulting" className="w-full h-48 object-cover mb-4 rounded-t-lg" />
              <h3 className="text-xl font-bold mb-2 text-gray-900">Engineering Consulting</h3>
              <p className="text-gray-500">
                In the realm of engineering, Saheda Consulting boasts a team of seasoned professionals dedicated to turning your visions into reality. From conceptualization to execution, we ensure precision and creativity in every project, be it construction, infrastructure upgrades, or sustainable solutions.
              </p>
              <a href="/services/engineering-consulting" className="text-indigo-600 hover:text-indigo-800 mt-4 inline-block">Learn More</a>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <Image src={service2} alt="Management Consulting" className="w-full h-48 object-cover mb-4 rounded-t-lg" />
              <h3 className="text-xl font-bold mb-2 text-gray-900">Management Consulting</h3>
              <p className="text-gray-500">
                Our management consulting services are designed to elevate your strategic decision-making. Collaborating closely with your leadership team, we identify growth opportunities, enhance operational efficiency, and implement strategic initiatives that drive organizational success.
              </p>
              <a href="/services/management-consulting" className="text-indigo-600 hover:text-indigo-800 mt-4 inline-block">Learn More</a>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <Image src={service3} alt="IT Consulting" className="w-full h-48 object-cover mb-4 rounded-t-lg" />
              <h3 className="text-xl font-bold mb-2 text-gray-900">IT Consulting</h3>
              <p className="text-gray-500">
                In the dynamic world of information technology, Saheda Consulting offers cutting-edge solutions. Our IT experts deliver innovative and scalable services, from system integration to cybersecurity, ensuring your technology infrastructure is a catalyst for growth.
              </p>
              <a href="/services/it-consulting" className="text-indigo-600 hover:text-indigo-800 mt-4 inline-block">Learn More</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}









{/* slide section */ }
{/* <div >
        <div>
          <h1>Welcom to Ghost Engineering Consultancy Service</h1>
          <p>Our Engineering Consulting firm offers tailored solutions in engineering, management, and IT services. To get your work properly, here we are here to serve you.</p>
          <button>LEARN MORE</button>
          <Image src={slide1} alt="Engineering Consulting" />
        </div>

        <div>
          <h1>YOU CAN BE A GHOST SERVICE PROVIDER</h1>
          <p className="stk-block-text__text has-text-color">If you want to work as a ghost service provider, contact us for further information. </p>
          <button>LEARN MORE</button>
          <Image src={slide2} alt="Engineering Consulting" />
        </div>

        <div>
          <h1>GET THE BEST SERVICE FOR BUSINESS</h1>
          <p className="stk-block-text__text has-text-color">Your business needs special service that supports your development plans. We works closely with you to analyses your current service and suggest solutions. </p>
          <button>LEARN MORE</button>
          <Image src={slide3} alt="Engineering Consulting" />
        </div>

      </div> */}