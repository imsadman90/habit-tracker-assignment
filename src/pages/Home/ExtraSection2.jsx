import React from "react";
import { FaRocket, FaStar, FaUsers } from "react-icons/fa";
import { motion } from "framer-motion";
import MotionLayout from "../../layouts/MotionLayout";

const features = [
  {
    icon: <FaRocket className="text-4xl" />,
    title: "Boost Productivity",
    description:
      "Track your habits consistently and see measurable improvements.",
    gradient: "from-blue-500 to-blue-600",
    bgGradient:
      "from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20",
  },
  {
    icon: <FaStar className="text-4xl" />,
    title: "Achieve Goals",
    description:
      "Complete your daily habits and reach your long-term goals faster.",
    gradient: "from-yellow-500 to-orange-600",
    bgGradient:
      "from-yellow-50 to-orange-100 dark:from-yellow-900/20 dark:to-orange-800/20",
  },
  {
    icon: <FaUsers className="text-4xl" />,
    title: "Join Community",
    description: "Discover public habits from other users and get inspired.",
    gradient: "from-green-500 to-green-600",
    bgGradient:
      "from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const ExtraSection2 = () => {
  return (
    <MotionLayout>
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent via-green-50/20 to-transparent dark:via-green-900/10 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                Why Choose Habit Tracker?
              </span>
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
              Build habits, track progress, and join a growing community
            </p>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            className="grid md:grid-cols-3 gap-6 lg:gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group"
                whileHover={{ y: -8 }}
              >
                <div className="h-full bg-white/50 dark:bg-slate-800/50 backdrop-blur-xl rounded-2xl shadow-lg hover:shadow-2xl border border-white/20 dark:border-slate-700/50 p-8 transition-all duration-300 hover:border-blue-300 dark:hover:border-blue-500/30 flex flex-col items-center text-center">
                  {/* Icon Container */}
                  <div
                    className={`mb-6 w-20 h-20 rounded-xl bg-gradient-to-br ${feature.bgGradient} p-4 group-hover:scale-110 transform transition-transform duration-300`}
                  >
                    <div
                      className={`w-full h-full flex items-center justify-center bg-gradient-to-br ${feature.gradient} text-white rounded-lg group-hover:shadow-lg group-hover:shadow-blue-500/30 transition-all duration-300`}
                    >
                      {feature.icon}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-300">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed flex-grow">
                    {feature.description}
                  </p>

                  {/* Bottom accent */}
                  <div
                    className={`mt-6 pt-6 border-t border-gray-100 dark:border-slate-700/50 w-full h-1 bg-gradient-to-r ${feature.gradient} transform scale-x-0 group-hover:scale-x-100 origin-center transition-transform duration-500`}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Decorative background elements */}
          <div className="absolute top-32 left-10 w-72 h-72 bg-green-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 pointer-events-none" />
          <div className="absolute bottom-32 right-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 pointer-events-none" />
        </div>
      </section>
    </MotionLayout>
  );
};

export default ExtraSection2;
