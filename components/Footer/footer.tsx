import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">Company</h3>
            <ul>
              <li>
                <Link href="#" className="hover:text-gray-400">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-400">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-400">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Services</h3>
            <ul>
              <li>
                <Link href="#" className="hover:text-gray-400">
                  Software Development
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-400">
                  Cloud Services
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-400">
                  Cybersecurity
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Contact</h3>
            <ul>
              <li>
                <Link href="#" className="hover:text-gray-400">
                  Support
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-400">
                  Sales
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-400">
                  General Inquiries
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8 flex justify-between items-center">
          <p>&copy; 2024 Saheda Consulancy. All rights reserved.</p>
          <div className="flex space-x-4">
            <Link href="#" className="hover:text-gray-400">
              <i className="fab fa-facebook fa-lg"></i>
            </Link>
            <Link href="#" className="hover:text-gray-400">
              <i className="fab fa-twitter fa-lg"></i>
            </Link>
            <Link href="#" className="hover:text-gray-400">
              <i className="fab fa-instagram fa-lg"></i>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;