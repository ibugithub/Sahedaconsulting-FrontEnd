import { useAppSelector } from "@/lib/hooks";
import Link from 'next/link';
import { useState } from 'react';

export const NavItems = () => {
  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);
  const isAdministrator = useAppSelector(state => state.auth.isAdministrator);
  const isFreelancer = useAppSelector(state => state.auth.isFreelancer);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const NavMenu = [
    { type: 'link', name: 'Services', link: '/services' },
    { type: 'link', name: 'Connect', link: '/contForServices' },
    { type: 'link', name: 'Jobs', link: '/findWork' },
    { type: 'authLink', name: 'Profile', link: '/profile' },
    { type: 'notAuthLink', name: 'Signin', link: '/signin' },
    { type: 'adminLink', name: 'Admin', link: '/adminDashboard' },
  ];

  return (
    <>
      {
        NavMenu.map((item) => {
          if (item.type === 'authLink' && isAuthenticated) {
            return (
              <Link key={item.name} href={item.link} className="hover:text-gray-400 px-3 py-2 rounded-md text-sm font-medium">
                {item.name}
              </Link>
            );
          }
          if (item.type === 'adminLink' && isAdministrator) {
            return (
              <Link key={item.name} href={item.link} className="hover:text-gray-400 px-3 py-2 rounded-md text-sm font-medium">
                {item.name}
              </Link>
            );
          }
          if (item.type === 'notAuthLink' && !isAuthenticated) {
            return (
              <Link key={item.name} href={item.link} className="hover:text-gray-400 px-3 py-2 rounded-md text-sm font-medium">
                {item.name}
              </Link>
            );
          }
          if (item.type === 'link') {
            if (item.name === 'Jobs') {
              return (
                <div key={item.name} className="relative inline-block text-left">
                  <div
                    onMouseEnter={() => setIsDropdownOpen(true)}
                    onMouseLeave={() => setIsDropdownOpen(false)}
                  >
                    <Link href={item.link} className="hover:text-gray-400 px-3 py-2 rounded-md text-sm font-medium">
                      {item.name}
                    </Link>
                    {(isDropdownOpen && isFreelancer) && (
                      <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                        <div className="py-1">
                          <Link href="/freelancer/proposals" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" >
                            Proposal
                          </Link>
                          <Link href="/freelancer/offers" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" >
                            Offer
                          </Link>
                        </div>
                      </div> 
                    )}
                  </div> 
                </div>
              );
            } else {
              return (
                <Link key={item.name} href={item.link} className="hover:text-gray-400 px-3 py-2 rounded-md text-sm font-medium">
                  {item.name}
                </Link>
              );
            }
          }
        })
      }
    </>
  );
};
