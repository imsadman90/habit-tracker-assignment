import { Mail, Phone, MapPin } from "lucide-react";
import { FaGithub, FaTwitter } from "react-icons/fa";
import { FiLinkedin } from "react-icons/fi";

const ContactPage = () => {
  return (
    <div
      id="contact"
      className="min-h-screen bg-gradient-to-b from-transparent via-blue-50/30 to-transparent dark:via-slate-900/30 py-20 relative overflow-hidden px-[4%]"
    >
      {/* Decorative background elements */}
      <div className="absolute top-20 left-0 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 pointer-events-none" />
      <div className="absolute bottom-20 right-0 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-blue-200 to-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10 pointer-events-none" />

      {/* Hero */}
      <div className="max-w-3xl mx-auto text-center mb-16 px-4 relative z-10">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6">
          <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
            Get in Touch
          </span>
        </h1>
        <p className="text-xl md:text-2xl text-slate-700 dark:text-slate-300">
          Have a question or want to collaborate? We'd love to hear from you.
        </p>
      </div>

      {/* Contact Section */}
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-8 relative z-10">
        {/* Contact Form */}
        <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl p-8 md:p-10 border border-white/40 dark:border-slate-700/40 transition-all duration-300">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-8">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Send a Message
            </span>
          </h2>
          <form className="space-y-6">
            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-bold mb-2">
                Name
              </label>
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-5 py-4 rounded-xl border-2 border-slate-200 dark:border-slate-600 bg-white/50 dark:bg-slate-700/50 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all text-slate-900 dark:text-white placeholder-slate-400"
              />
            </div>
            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-bold mb-2">
                Email
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full px-5 py-4 rounded-xl border-2 border-slate-200 dark:border-slate-600 bg-white/50 dark:bg-slate-700/50 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all text-slate-900 dark:text-white placeholder-slate-400"
              />
            </div>
            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-bold mb-2">
                Message
              </label>
              <textarea
                rows={5}
                placeholder="Your message..."
                className="w-full px-5 py-4 rounded-xl border-2 border-slate-200 dark:border-slate-600 bg-white/50 dark:bg-slate-700/50 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all text-slate-900 dark:text-white placeholder-slate-400 resize-none"
              ></textarea>
            </div>
            <button
              type="submit"
              className="group relative w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-xl shadow-xl hover:shadow-2xl hover:shadow-blue-500/50 transform hover:-translate-y-1 transition-all duration-300 overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative flex items-center justify-center gap-2">
                Send Message
                <span className="group-hover:translate-x-1 transition-transform duration-300">
                  →
                </span>
              </span>
            </button>
          </form>
        </div>

        {/* Contact Info */}
        <div className="space-y-6">
          <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl p-8 border border-white/40 dark:border-slate-700/40 transition-all duration-300 hover:-translate-y-1">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-8">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Contact Info
              </span>
            </h2>
            <div className="space-y-5">
              <div className="group flex items-center gap-4 p-4 rounded-xl hover:bg-blue-50 dark:hover:bg-slate-700/50 transition-all">
                <div className="p-3 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 rounded-xl group-hover:scale-110 transition-transform">
                  <Mail className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <a
                  href="mailto:info@example.com"
                  className="text-slate-700 dark:text-slate-300 font-semibold hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  info@example.com
                </a>
              </div>
              <div className="group flex items-center gap-4 p-4 rounded-xl hover:bg-green-50 dark:hover:bg-slate-700/50 transition-all">
                <div className="p-3 bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/30 rounded-xl group-hover:scale-110 transition-transform">
                  <Phone className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <a
                  href="tel:+1234567890"
                  className="text-slate-700 dark:text-slate-300 font-semibold hover:text-green-600 dark:hover:text-green-400 transition-colors"
                >
                  +1 234 567 890
                </a>
              </div>
              <div className="group flex items-center gap-4 p-4 rounded-xl hover:bg-red-50 dark:hover:bg-slate-700/50 transition-all">
                <div className="p-3 bg-gradient-to-br from-red-100 to-red-200 dark:from-red-900/30 dark:to-red-800/30 rounded-xl group-hover:scale-110 transition-transform">
                  <MapPin className="w-6 h-6 text-red-600 dark:text-red-400" />
                </div>
                <p className="text-slate-700 dark:text-slate-300 font-semibold">
                  123 Habit St, Productivity City, USA
                </p>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl p-8 border border-white/40 dark:border-slate-700/40 transition-all duration-300 hover:-translate-y-1">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-8">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Follow Us
              </span>
            </h2>
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="group p-4 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600 rounded-xl hover:from-slate-200 hover:to-slate-300 dark:hover:from-slate-600 dark:hover:to-slate-500 transition-all hover:scale-110 hover:shadow-lg"
              >
                <FaGithub className="w-6 h-6 text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors" />
              </a>
              <a
                href="#"
                className="group p-4 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 rounded-xl hover:from-blue-200 hover:to-blue-300 dark:hover:from-blue-800/40 dark:hover:to-blue-700/40 transition-all hover:scale-110 hover:shadow-lg"
              >
                <FiLinkedin className="w-6 h-6 text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors" />
              </a>
              <a
                href="#"
                className="group p-4 bg-gradient-to-br from-sky-100 to-sky-200 dark:from-sky-900/30 dark:to-sky-800/30 rounded-xl hover:from-sky-200 hover:to-sky-300 dark:hover:from-sky-800/40 dark:hover:to-sky-700/40 transition-all hover:scale-110 hover:shadow-lg"
              >
                <FaTwitter className="w-6 h-6 text-sky-600 dark:text-sky-400 group-hover:text-sky-700 dark:group-hover:text-sky-300 transition-colors" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
