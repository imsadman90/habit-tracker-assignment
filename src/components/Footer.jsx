import React from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";

const Footer = () => {
  return (
    <footer className="bg-slate-200 text-gray-700 py-10 px-10 dark:bg-base-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex flex-col space-y-2">
            <h1 className="text-2xl font-bold text-blue-600">HabitTracker</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Build better habits,
              <br /> boost productivity.
            </p>
          </div>

          <div className="flex flex-col space-y-2">
            <h2 className="font-semibold dark:text-gray-400">Contact</h2>
            <p className="dark:text-gray-400">
              Email: support@habittracker.com
            </p>
            <p className="dark:text-gray-400">Phone: +880 123 456 789</p>
          </div>

          <div className="flex flex-col space-y-2">
            <h2 className="font-semibold dark:text-gray-400">Legal</h2>
            <a href="#" className="hover:text-blue-600 dark:text-gray-400">
              Terms & Conditions
            </a>
            <a href="#" className="hover:text-blue-600 dark:text-gray-400">
              Privacy Policy
            </a>
          </div>

          <div className="flex flex-col space-y-2">
            <h2 className="font-semibold dark:text-gray-400">Follow Us</h2>
            <div className="flex space-x-3 mt-1">
              <a href="#" className="text-gray-600 hover:text-blue-600">
                <FaFacebookF />
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-600">
                <RiTwitterXFill />
              </a>
              <a href="#" className="text-gray-600 hover:text-pink-500">
                <FaInstagram />
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-700">
                <FaLinkedinIn />
              </a>
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
