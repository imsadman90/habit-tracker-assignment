import React from "react";
import { FaRegCheckCircle, FaRegClock, FaRegSmile } from "react-icons/fa";
import { motion } from "framer-motion";
import MotionLayout from "../../layouts/MotionLayout";

const steps = [
  {
    icon: <FaRegCheckCircle className="text-4xl" />,
    title: "Set Your Habit",
    description: "Choose a habit you want to build and add it to your tracker.",
    gradient: "from-blue-500 to-blue-600",
    bgGradient:
      "from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20",
    step: 1,
  },
  {
    icon: <FaRegClock className="text-4xl" />,
    title: "Track Daily",
    description:
      "Mark your habit as complete every day to maintain your streak.",
    gradient: "from-purple-500 to-purple-600",
    bgGradient:
      "from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20",
    step: 2,
  },
  {
    icon: <FaRegSmile className="text-4xl" />,
    title: "Achieve Consistency",
    description:
      "Build consistency and see progress over time with visual stats.",
    gradient: "from-orange-500 to-orange-600",
    bgGradient:
      "from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20",
    step: 3,
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

const ExtraSection1 = () => {
  return (
    <MotionLayout>
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent via-purple-50/20 to-transparent dark:via-purple-900/10 relative overflow-hidden">
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
                How Habit Tracker Works
              </span>
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
              Simple steps to build your habits and boost productivity
            </p>
          </motion.div>

          {/* Steps Grid with Connecting Lines */}
          <div className="relative">
            {/* Connecting Line - visible only on md and up */}
            <div className="hidden md:block absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-blue-300 via-purple-300 to-orange-300 dark:from-blue-700 dark:via-purple-700 dark:to-orange-700" />

            <motion.div
              className="grid md:grid-cols-3 gap-6 lg:gap-8 relative z-10"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="group"
                  whileHover={{ y: -8 }}
                >
                  <div className="h-full bg-white/50 dark:bg-slate-800/50 backdrop-blur-xl rounded-2xl shadow-lg hover:shadow-2xl border border-white/20 dark:border-slate-700/50 p-8 transition-all duration-300 hover:border-blue-300 dark:hover:border-blue-500/30 flex flex-col">
                    {/* Step Number */}
                    <div className="flex items-start justify-between mb-6">
                      <div
                        className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${step.bgGradient} group-hover:scale-110 transform transition-transform duration-300`}
                      >
                        <span
                          className={`text-2xl font-extrabold bg-gradient-to-r ${step.gradient} bg-clip-text text-transparent`}
                        >
                          {step.step}
                        </span>
                      </div>
                    </div>

                    {/* Icon Container */}
                    <div
                      className={`mb-6 w-20 h-20 rounded-xl bg-gradient-to-br ${step.bgGradient} p-4 group-hover:scale-110 transform transition-transform duration-300`}
                    >
                      <div
                        className={`w-full h-full flex items-center justify-center bg-gradient-to-br ${step.gradient} text-white rounded-lg group-hover:shadow-lg group-hover:shadow-blue-500/30 transition-all duration-300`}
                      >
                        {step.icon}
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-300">
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed flex-grow mb-6">
                      {step.description}
                    </p>

                    {/* Bottom accent */}
                    <div
                      className={`h-1 bg-gradient-to-r ${step.gradient} transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500`}
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Decorative elements */}
          <div className="absolute top-40 left-0 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 pointer-events-none" />
          <div className="absolute bottom-40 right-0 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 pointer-events-none" />
        </div>
      </section>
    </MotionLayout>
  );
};

export default ExtraSection1;
