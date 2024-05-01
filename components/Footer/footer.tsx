import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">Company</h3>
            <ul>
              <li>
                <a href="#" className="hover:text-gray-400">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  Blog
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Services</h3>
            <ul>
              <li>
                <a href="#" className="hover:text-gray-400">
                  Software Development
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  Cloud Services
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  Cybersecurity
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Contact</h3>
            <ul>
              <li>
                <a href="#" className="hover:text-gray-400">
                  Support
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  Sales
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  General Inquiries
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8 flex justify-between items-center">
          <p>&copy; 2024 Saheda Consulancy. All rights reserved.</p>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-gray-400">
              <i className="fab fa-facebook fa-lg"></i>
            </a>
            <a href="#" className="hover:text-gray-400">
              <i className="fab fa-twitter fa-lg"></i>
            </a>
            <a href="#" className="hover:text-gray-400">
              <i className="fab fa-instagram fa-lg"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;