import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaGithub } from 'react-icons/fa';
import FlashBuyLogo from "../assets/logo.png";
const Footer = () => {
 
  return (
    <footer className="bg-gray-900 text-gray-300 py-6 sm:py-10 overflow-hidden w-full">
      <div className="container mx-auto px-4 max-w-full">
        {/* Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="text-center sm:text-left">
          <img
              src={FlashBuyLogo}
              alt="Logo"
              className="w-24 sm:w-32 h-auto mx-auto sm:mx-0 mb-4"
            />
            <h3 className="text-2xl sm:text-3xl font-bold text-yellow-400 mb-4">Flash Buy</h3>
            <p className="text-xs sm:text-sm">
            Welcome to Flash Buy, where innovation meets convenience. Explore a seamless blend of physical and digital shopping for a revolutionary retail experience.
            </p>
          </div>

          {/* Extra Links */}
          <div className="text-center sm:text-left">
            <h4 className="text-lg font-semibold text-yellow-400 mb-4">Quick Links</h4>
            <ul>
              <li className="mb-2">
                <a href="/about" className="hover:text-yellow-400 transition duration-300">About Us</a>
              </li>
              <li className="mb-2">
                <a href="/contact" className="hover:text-yellow-400 transition duration-300">Contact</a>
              </li>
              <li className="mb-2">
                <a href="/privacy-policy" className="hover:text-yellow-400 transition duration-300">Privacy Policy</a>
              </li>
              <li className="mb-2">
                <a href="/terms-of-service" className="hover:text-yellow-400 transition duration-300">Terms of Service</a>
              </li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div className="text-center sm:text-left">
            <h4 className="text-lg font-semibold text-yellow-400 mb-4">Follow Us</h4>
            <div className="flex justify-center sm:justify-start space-x-6">
              <a href="https://facebook.com" className="text-gray-300 hover:text-yellow-400 transition duration-300">
                <FaFacebookF size={20} />
              </a>
              <a href="https://twitter.com" className="text-gray-300 hover:text-yellow-400 transition duration-300">
                <FaTwitter size={20} />
              </a>
              <a href="https://instagram.com" className="text-gray-300 hover:text-yellow-400 transition duration-300">
                <FaInstagram size={20} />
              </a>
              <a href="https://linkedin.com" className="text-gray-300 hover:text-yellow-400 transition duration-300">
                <FaLinkedinIn size={20} />
              </a>
              <a href="https://github.com" className="text-gray-300 hover:text-yellow-400 transition duration-300">
                <FaGithub size={20} />
              </a>
            </div>
          </div>

          {/* Newsletter Subscription */}
          <div className="text-center sm:text-left">
            <h4 className="text-lg font-semibold text-yellow-400 mb-4">Subscribe to Our Newsletter</h4>
            <p className="text-xs sm:text-sm mb-4">Get the latest updates and offers directly in your inbox.</p>
            <div className="flex items-center justify-center sm:justify-start">
              <input
                type="email"
                placeholder="Enter your email"
                className="p-2 rounded-l-md text-gray-800"
              />
              <button className="bg-yellow-500 text-gray-900 p-2 rounded-r-md hover:bg-yellow-400 transition duration-300">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-6 sm:mt-10 text-center">
          <p className="text-xs sm:text-sm">
            &copy; {new Date().getFullYear()} FlashBuy. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
