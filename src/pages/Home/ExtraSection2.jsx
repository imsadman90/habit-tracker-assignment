import React from "react";
import { FaRocket, FaStar, FaUsers } from "react-icons/fa";
import MotionLayout from "../../layouts/MotionLayout";

const features = [
  {
    icon: <FaRocket className="text-blue-600 text-3xl" />,
    title: "Boost Productivity",
    description: "Track your habits consistently and see measurable improvements."
  },
  {
    icon: <FaStar className="text-yellow-500 text-3xl" />,
    title: "Achieve Goals",
    description: "Complete your daily habits and reach your long-term goals faster."
  },
  {
    icon: <FaUsers className="text-green-500 text-3xl" />,
    title: "Join Community",
    description: "Discover public habits from other users and get inspired."
  }
];

const ExtraSection2 = () => {
  return (
    <MotionLayout>
      <section
        className=""
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center  p-10 rounded-xl">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Why Choose Habit Tracker?
          </h2>
          <p className="text-gray-600 mb-12">
            Build habits, track progress, and join a growing community
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-xl transition"
              >
               <div className="flex items-center gap-2 justify-center">
                 <div className="">{feature.icon}</div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
               </div>
                <p className="text-gray-600 mt-4">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </MotionLayout>
  );
};

export default ExtraSection2;
