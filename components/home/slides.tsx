import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Image from 'next/image';
import slide1 from '../../assets/slide1.png';
import slide2 from '../../assets/slide2.png';
import slide3 from '../../assets/slide3.jpg';


export const Slides = () => { 
  return (
    <Swiper
    pagination={{ clickable: true }}
    autoplay={{ delay: 3000 }}
    navigation={true}
    modules={[Navigation, Pagination, Autoplay]}
    slidesPerView={1}
    className="w-full h-full bg-white"
  >
    <SwiperSlide className="pt-12 md:p-12">
      <div className="flex flex-col md:flex-row items-center h-full p-4 md:p-8 text-left bg-white">
        <div className="w-full md:w-1/2 md:pr-4 text-left">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 pr-4 md:pr-10 leading-tight text-gray-800">Welcome to Ghost Engineering Consultancy Service</h1>
          <p className="text-lg md:text-xl mb-4 leading-relaxed text-gray-600">
            Our Engineering Consulting firm offers tailored solutions in engineering, management, and IT services. To get your work properly, we are here to serve you.
          </p>
          <button className="bg-indigo-600 text-white px-4 py-2 md:px-6 md:py-3 rounded-lg shadow-lg hover:bg-indigo-800 transition duration-300">LEARN MORE</button>
        </div>
        <div className="w-full md:w-1/2 mt-4 md:mt-0">
          <Image src={slide1} alt="Slide 1" className="rounded-lg shadow-lg h-48 md:h-72 lg:h-96 w-full object-cover" />
        </div>
      </div>
    </SwiperSlide>

    <SwiperSlide className="p-6 md:p-12">
      <div className="flex flex-col md:flex-row items-center h-full p-4 md:p-8 text-left bg-white">
        <div className="w-full md:w-1/2 md:pr-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight pr-4 md:pr-12 text-gray-800">YOU CAN BE A GHOST SERVICE PROVIDER</h1>
          <p className="text-lg md:text-xl mb-4 leading-relaxed text-gray-600">
            If you want to work as a ghost service provider, contact us for further information.
          </p>
          <button className="bg-indigo-600 text-white px-4 py-2 md:px-6 md:py-3 rounded-lg shadow-lg hover:bg-indigo-800 transition duration-300">LEARN MORE</button>
        </div>
        <div className="w-full md:w-1/2 mt-4 md:mt-0">
          <Image src={slide2} alt="Slide 2" className="rounded-lg shadow-lg h-48 md:h-72 lg:h-96 w-full object-cover" />
        </div>
      </div>
    </SwiperSlide>

    <SwiperSlide className="p-6 md:p-12">
      <div className="flex flex-col md:flex-row items-center h-full p-4 md:p-8 bg-white">
        <div className="w-full md:w-1/2 md:pr-4 text-left">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight pr-4 md:pr-10 text-gray-800">GET THE BEST SERVICE FOR BUSINESS</h1>
          <p className="text-lg md:text-xl mb-4 leading-relaxed text-gray-600">
            Your business needs special service that supports your development plans. We work closely with you to analyze your current service and suggest solutions.
          </p>
          <button className="bg-indigo-600 text-white px-4 py-2 md:px-6 md:py-3 rounded-lg shadow-lg hover:bg-indigo-800 transition duration-300">LEARN MORE</button>
        </div>
        <div className="w-full md:w-1/2 mt-4 md:mt-0">
          <Image src={slide3} alt="Slide 3" className="rounded-lg shadow-lg h-48 md:h-72 lg:h-96 w-full object-cover" />
        </div>
      </div>
    </SwiperSlide>
  </Swiper>
  );
}