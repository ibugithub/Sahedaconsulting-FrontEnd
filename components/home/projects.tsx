import Image from 'next/image';
import project1 from '../../assets/projects1.jpg';
import project2 from '../../assets/projects2.jpg';
import project3 from '../../assets/projects3.jpg';
import project4 from '../../assets/projects4.jpg';
import project5 from '../../assets/projects5.jpg';
import project6 from '../../assets/projects6.jpg';

const projects = [
  { src: project1, alt: 'project1', title: 'Engineering' },
  { src: project2, alt: 'project2', title: 'Brand Identity' },
  { src: project3, alt: 'project3', title: 'Engineering' },
  { src: project4, alt: 'project4', title: 'IT' },
  { src: project5, alt: 'project5', title: 'Management' },
  { src: project6, alt: 'project6', title: 'All Service' },
];

export const Projects = () => {
  return (
    <div className="w-full h-full bg-white text-gray-800 p-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-4">FEATURED PROJECTS</h1>
        <h2 className="text-2xl text-gray-600">Our Case Studies</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-8">
        {projects.map((project, index) => (
          <div
            key={index}
            className={`group relative overflow-hidden rounded-lg shadow-lg 
              ${index % 2 === 0 ? 'col-span-2 row-span-1' : 'col-span-1 row-span-2'}
              sm:col-span-1 sm:row-span-1`}
          >
            <Image
              src={project.src}
              alt={project.alt}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300 ease-in-out"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4 text-white text-lg font-semibold transition-opacity duration-300 ease-in-out opacity-0 group-hover:opacity-100">
              {project.title}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
