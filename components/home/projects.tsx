import Image from 'next/image';
import project1 from '../../assets/projects1.jpg';
import project2 from '../../assets/projects2.jpg';
import project3 from '../../assets/projects3.jpg';
import project4 from '../../assets/projects4.jpg';
import project5 from '../../assets/projects5.jpg';
import project6 from '../../assets/projects6.jpg';

export const Projects = () => {
  return (
    <div className="w-full h-full bg-white text-gray-800 p-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-4">FEATURED PROJECTS</h1>
        <h2 className="text-2xl text-gray-600">Our Case Studies</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 grid-rows-auto md:grid-rows-2 auto-rows-fr">
        <div className="group relative overflow-hidden rounded-lg shadow-lg col-span-1 row-span-2">
          <Image src={project3} alt='project1' className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300 ease-in-out" />
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4 text-white text-lg font-semibold transition-opacity duration-300 ease-in-out opacity-0 group-hover:opacity-100">
            Engineering
          </div>
        </div>
        <div className="group relative overflow-hidden rounded-lg shadow-lg col-span-2 row-span-1">
          <Image src={project5} alt='project2' className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300 ease-in-out" />
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4 text-white text-lg font-semibold transition-opacity duration-300 ease-in-out opacity-0 group-hover:opacity-100">
            Management
          </div>
        </div>
        <div className="group relative overflow-hidden rounded-lg shadow-lg col-span-1 row-span-1">
          <Image src={project1} alt='project3' className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300 ease-in-out" />
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4 text-white text-lg font-semibold transition-opacity duration-300 ease-in-out opacity-0 group-hover:opacity-100">
            Engineering
          </div>
        </div>
        <div className="group relative overflow-hidden rounded-lg shadow-lg col-span-1 row-span-1">
          <Image src={project4} alt='project4' className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300 ease-in-out" />
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4 text-white text-lg font-semibold transition-opacity duration-300 ease-in-out opacity-0 group-hover:opacity-100">
            IT
          </div>
        </div>
        <div className="group relative overflow-hidden rounded-lg shadow-lg col-span-1 row-span-1">
          <Image src={project2} alt='project5' className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300 ease-in-out" />
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4 text-white text-lg font-semibold transition-opacity duration-300 ease-in-out opacity-0 group-hover:opacity-100">
            Brand Identity
          </div>
        </div>
        <div className="group relative overflow-hidden rounded-lg shadow-lg col-span-1 row-span-1">
          <Image src={project6} alt='project6' className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300 ease-in-out" />
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4 text-white text-lg font-semibold transition-opacity duration-300 ease-in-out opacity-0 group-hover:opacity-100">
            All Service
          </div>
        </div>
      </div>
    </div>
  );
}
