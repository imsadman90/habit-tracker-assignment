// src/components/WhyBuildHabits.jsx
import React from "react";
import { FiClock, FiTarget, FiSmile, FiTrendingUp } from "react-icons/fi";
import { motion } from "framer-motion";
import MotionLayout from "../../layouts/MotionLayout";

const benefits = [
  {
    icon: <FiClock size={32} />,
    title: "Better Time Management",
    description: "Track your habits daily to make the most of your time.",
    gradient: "from-blue-500 to-blue-600",
    bgGradient:
      "from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20",
  },
  {
    icon: <FiTarget size={32} />,
    title: "Achieve Your Goals",
    description: "Small daily habits help you reach bigger milestones.",
    gradient: "from-purple-500 to-purple-600",
    bgGradient:
      "from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20",
  },
  {
    icon: <FiSmile size={32} />,
    title: "Reduce Stress",
    description: "Consistent routines make life more predictable and calm.",
    gradient: "from-green-500 to-green-600",
    bgGradient:
      "from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20",
  },
  {
    icon: <FiTrendingUp size={32} />,
    title: "Boost Productivity",
    description: "Stay motivated by building streaks and tracking progress.",
    gradient: "from-orange-500 to-orange-600",
    bgGradient:
      "from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const WhyBuildHabits = () => {
  return (
    <MotionLayout>
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent via-blue-50/20 to-transparent dark:via-blue-900/10">
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
                Why Build Habits?
              </span>
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
              Unlock your potential with powerful habit tracking that transforms
              your life
            </p>
          </motion.div>

          {/* Benefits Grid */}
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group"
                whileHover={{ y: -8 }}
              >
                <div className="h-full bg-white/50 dark:bg-slate-800/50 backdrop-blur-xl rounded-2xl shadow-lg hover:shadow-2xl border border-white/20 dark:border-slate-700/50 p-8 transition-all duration-300 hover:border-blue-300 dark:hover:border-blue-500/30 flex flex-col">
                  {/* Icon Container */}
                  <div
                    className={`mb-6 w-16 h-16 rounded-xl bg-gradient-to-br ${benefit.bgGradient} p-3.5 group-hover:scale-110 transform transition-transform duration-300`}
                  >
                    <div
                      className={`w-full h-full flex items-center justify-center bg-gradient-to-br ${benefit.gradient} text-white rounded-lg group-hover:shadow-lg group-hover:shadow-blue-500/30 transition-all duration-300`}
                    >
                      {benefit.icon}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl md:text-lg lg:text-xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-300">
                    {benefit.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed flex-grow">
                    {benefit.description}
                  </p>

                  {/* Bottom accent */}
                  <div
                    className={`mt-6 pt-4 border-t border-gray-100 dark:border-slate-700/50 h-1 bg-gradient-to-r ${benefit.gradient} transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500`}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Decorative background elements */}
        <div className="absolute top-32 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 pointer-events-none" />
        <div className="absolute bottom-32 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 pointer-events-none" />
      </section>
    </MotionLayout>
  );
};

export default WhyBuildHabits;
