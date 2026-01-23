import React from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-slate-950 text-slate-700 dark:text-slate-300 border-t border-slate-200/80 dark:border-slate-800 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-3 items-start">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 via-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                HabitTracker
              </h1>
            </div>
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              Build better habits and track your progress with a clean, focused
              experience.
            </p>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-6 text-sm">
            <div className="space-y-3">
              <h3 className="font-semibold text-slate-900 dark:text-white">
                Contact
              </h3>
              <a
                href="mailto:support@habittracker.com"
                className="block text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                support@habittracker.com
              </a>
              <a
                href="tel:+880123456789"
                className="block text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                +880 123 456 789
              </a>
            </div>
            <div className="space-y-3">
              <h3 className="font-semibold text-slate-900 dark:text-white">
                Legal
              </h3>
              <a
                href="#"
                className="block text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Terms & Conditions
              </a>
              <a
                href="#"
                className="block text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="block text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Cookie Policy
              </a>
            </div>
          </div>

          {/* Social */}
          <div className="space-y-4">
            <h3 className="font-semibold text-slate-900 dark:text-white">
              Follow Us
            </h3>
            <div className="flex gap-3">
              <a
                href="#"
                aria-label="Facebook"
                className="p-3 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-slate-700 transition-colors"
              >
                <FaFacebookF className="w-5 h-5 text-slate-700 dark:text-slate-300" />
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="p-3 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              >
                <RiTwitterXFill className="w-5 h-5 text-slate-700 dark:text-slate-300" />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="p-3 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-pink-50 dark:hover:bg-slate-700 transition-colors"
              >
                <FaInstagram className="w-5 h-5 text-slate-700 dark:text-slate-300" />
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="p-3 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-slate-700 transition-colors"
              >
                <FaLinkedinIn className="w-5 h-5 text-slate-700 dark:text-slate-300" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 mt-8 border-t border-slate-200 dark:border-slate-800 text-sm flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-slate-600 dark:text-slate-400">
            &copy; {new Date().getFullYear()} HabitTracker. All rights reserved.
          </p>
          <p className="text-slate-600 dark:text-slate-400">
            Crafted for better habits.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
