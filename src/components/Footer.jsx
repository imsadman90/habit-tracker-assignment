import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#dcf0fa] text-gray-700 py-10 mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">


          <div className="flex flex-col space-y-2">
            <h1 className="text-2xl font-bold text-blue-600">HabitTracker</h1>
            <p className="text-gray-600">Build better habits, boost productivity.</p>
          </div>


          <div className="flex flex-col space-y-2">
            <h2 className="font-semibold">Contact</h2>
            <p>Email: support@habittracker.com</p>
            <p>Phone: +880 123 456 789</p>
          </div>


          <div className="flex flex-col space-y-2">
            <h2 className="font-semibold">Legal</h2>
            <a href="#" className="hover:text-blue-600">Terms & Conditions</a>
            <a href="#" className="hover:text-blue-600">Privacy Policy</a>
          </div>


          <div className="flex flex-col space-y-2">
            <h2 className="font-semibold">Follow Us</h2>
            <div className="flex space-x-3 mt-1">
              <a href="#" className="text-gray-600 hover:text-blue-600"><FaFacebookF /></a>
              <a href="#" className="text-gray-600 hover:text-blue-600"><FaTwitter /></a>
              <a href="#" className="text-gray-600 hover:text-pink-500"><FaInstagram /></a>
              <a href="#" className="text-gray-600 hover:text-blue-700"><FaLinkedinIn /></a>
            </div>
          </div>

        </div>


        <div className="mt-10 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} HabitTracker. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
