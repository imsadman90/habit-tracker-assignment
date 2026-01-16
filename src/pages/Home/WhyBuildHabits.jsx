// src/components/WhyBuildHabits.jsx
import React from "react";
import { FiClock, FiTarget, FiSmile, FiTrendingUp } from "react-icons/fi";
import { motion } from "framer-motion";
import MotionLayout from "../../layouts/MotionLayout";

const benefits = [
  {
    icon: <FiClock size={30} />,
    title: "Better Time Management",
    description: "Track your habits daily to make the most of your time.",
  },
  {
    icon: <FiTarget size={30} />,
    title: "Achieve Your Goals",
    description: "Small daily habits help you reach bigger milestones.",
  },
  {
    icon: <FiSmile size={30} />,
    title: "Reduce Stress",
    description: "Consistent routines make life more predictable and calm.",
  },
  {
    icon: <FiTrendingUp size={30} />,
    title: "Boost Productivity",
    description: "Stay motivated by building streaks and tracking progress.",
  },
];

const WhyBuildHabits = () => {
  return (
    <MotionLayout>
      <section className="py-16 px-10">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-8">Why Build Habits?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center dark:bg-base-100"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <div className="text-blue-500 mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-semibold mb-2 dark:text-gray-400">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </MotionLayout>
  );
};

export default WhyBuildHabits;
