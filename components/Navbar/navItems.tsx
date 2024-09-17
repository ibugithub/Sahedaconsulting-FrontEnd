import { useAppSelector } from "@/lib/hooks";
import Link from 'next/link';

export const NavItems = () => {
  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);
  const isAdministrator = useAppSelector(state => state.auth.isAdministrator);
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
          // Check the item type and render accordingly
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
            return (
              <Link key={item.name} href={item.link} className="hover:text-gray-400 px-3 py-2 rounded-md text-sm font-medium">
                {item.name}
              </Link>
            );
          }
        })
      }
    </>
  )
}