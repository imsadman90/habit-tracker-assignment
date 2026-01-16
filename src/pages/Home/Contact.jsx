import { Mail, Phone, MapPin, } from "lucide-react";
import { FaGithub, FaTwitter } from "react-icons/fa";
import { FiLinkedin } from "react-icons/fi";

const ContactPage = () => {
  return (
    <div
      id="contact"
      className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-16 dark:bg-none dark:bg-base-300"
    >
      {/* Hero */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4 dark:text-gray-400">
          Get in Touch
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Have a question or want to collaborate? We'd love to hear from you.
        </p>
      </div>

      {/* Contact Section */}
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12">
        {/* Contact Form */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 md:p-12 border border-white/50">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Send a Message
          </h2>
          <form className="space-y-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Name
              </label>
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:text-gray-700"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:text-gray-700"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Message
              </label>
              <textarea
                rows={5}
                placeholder="Your message..."
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:text-gray-700"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-full shadow-xl hover:scale-105 hover:shadow-2xl transition-all"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Info */}
        <div className="space-y-8">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white/50">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Contact Info
            </h2>
            <div className="flex items-center gap-4 mb-4">
              <Mail className="w-6 h-6 text-blue-600" />
              <a
                href="mailto:info@example.com"
                className="text-gray-700 font-medium hover:text-blue-600"
              >
                info@example.com
              </a>
            </div>
            <div className="flex items-center gap-4 mb-4">
              <Phone className="w-6 h-6 text-green-600" />
              <a
                href="tel:+1234567890"
                className="text-gray-700 font-medium hover:text-green-600"
              >
                +1 234 567 890
              </a>
            </div>
            <div className="flex items-center gap-4">
              <MapPin className="w-6 h-6 text-red-600" />
              <p className="text-gray-700 font-medium">
                123 Habit St, Productivity City, USA
              </p>
            </div>
          </div>

          {/* Social Links */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white/50">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Follow Us</h2>
            <div className="flex items-center gap-6">
              <a href="#" className="text-gray-700 hover:text-gray-900">
                <FaGithub className="w-6 h-6" />
              </a>
              <a href="#" className="text-blue-600 hover:text-blue-800">
                <FiLinkedin className="w-6 h-6" />
              </a>
              <a href="#" className="text-blue-400 hover:text-blue-600">
                <FaTwitter className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
