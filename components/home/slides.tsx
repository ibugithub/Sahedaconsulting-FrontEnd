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
      autoplay={{ delay: 3500 }}
      navigation={true}
      loop={true}
      modules={[Navigation, Pagination, Autoplay]}
      slidesPerView={1}
      className="w-full h-full"
    >
      {/* Slide 1 */}
      <SwiperSlide className="p-6 md:p-12">
        <div className="flex flex-col md:flex-row items-center justify-between h-full rounded-3xl bg-gradient-to-r from-green-400 via-pink-300 to-pink-500 shadow-xl p-6 md:p-12">
          <div className="w-full md:w-1/2 text-left space-y-6">
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-white drop-shadow-lg">
              Welcome to Ghost Engineering Consultancy Service
            </h1>
            <p className="text-lg md:text-xl text-white/90">
              Our Engineering Consulting firm offers tailored solutions in engineering, management, and IT services. To get your work properly, we are here to serve you.
            </p>
            <button className="bg-white text-pink-600 font-semibold px-6 py-3 rounded-full shadow-md hover:bg-pink-600 hover:text-white transition-all duration-300">
              LEARN MORE
            </button>
          </div>
          <div className="w-full md:w-1/2 mt-8 md:mt-0">
            <Image src={slide1} alt="Slide 1" className="rounded-2xl shadow-2xl w-full object-cover h-60 md:h-80" />
          </div>
        </div>
      </SwiperSlide>

      {/* Slide 2 */}
      <SwiperSlide className="p-6 md:p-12">
        <div className="flex flex-col md:flex-row items-center justify-between h-full rounded-3xl bg-gradient-to-r from-pink-400 via-green-300 to-green-500 shadow-xl p-6 md:p-12">
          <div className="w-full md:w-1/2 text-left space-y-6">
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-white drop-shadow-lg">
              YOU CAN BE A GHOST SERVICE PROVIDER
            </h1>
            <p className="text-lg md:text-xl text-white/90">
              If you want to work as a ghost service provider, contact us for further information.
            </p>
            <button className="bg-white text-green-600 font-semibold px-6 py-3 rounded-full shadow-md hover:bg-green-600 hover:text-white transition-all duration-300">
              LEARN MORE
            </button>
          </div>
          <div className="w-full md:w-1/2 mt-8 md:mt-0">
            <Image src={slide2} alt="Slide 2" className="rounded-2xl shadow-2xl w-full object-cover h-60 md:h-80" />
          </div>
        </div>
      </SwiperSlide>

      {/* Slide 3 */}
      <SwiperSlide className="p-6 md:p-12">
        <div className="flex flex-col md:flex-row items-center justify-between h-full rounded-3xl bg-gradient-to-r from-green-500 via-pink-300 to-pink-500 shadow-xl p-6 md:p-12">
          <div className="w-full md:w-1/2 text-left space-y-6">
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-white drop-shadow-lg">
              GET THE BEST SERVICE FOR BUSINESS
            </h1>
            <p className="text-lg md:text-xl text-white/90">
              Your business needs special service that supports your development plans. We work closely with you to analyze your current service and suggest solutions.
            </p>
            <button className="bg-white text-pink-600 font-semibold px-6 py-3 rounded-full shadow-md hover:bg-pink-600 hover:text-white transition-all duration-300">
              LEARN MORE
            </button>
          </div>
          <div className="w-full md:w-1/2 mt-8 md:mt-0">
            <Image src={slide3} alt="Slide 3" className="rounded-2xl shadow-2xl w-full object-cover h-60 md:h-80" />
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  );
};
