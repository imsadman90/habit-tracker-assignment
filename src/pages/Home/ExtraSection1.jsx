import React from "react";
import { FaRegCheckCircle, FaRegClock, FaRegSmile } from "react-icons/fa";
import MotionLayout from "../../layouts/MotionLayout";

const steps = [
  {
    icon: <FaRegCheckCircle className="text-blue-600 text-3xl" />,
    title: "Set Your Habit",
    description: "Choose a habit you want to build and add it to your tracker."
  },
  {
    icon: <FaRegClock className="text-green-500 text-3xl" />,
    title: "Track Daily",
    description: "Mark your habit as complete every day to maintain your streak."
  },
  {
    icon: <FaRegSmile className="text-yellow-500 text-3xl" />,
    title: "Achieve Consistency",
    description: "Build consistency and see progress over time with visual stats."
  }
];

const ExtraSection1 = () => {
  return (
    <MotionLayout>
      <section
        className=" px-10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center  p-10 rounded-xl">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            How Habit Tracker Works
          </h2>
          <p className="text-gray-600 mb-12">
            Simple steps to build your habits and boost productivity
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition"
              >
               <div className="flex justify-center items-center gap-3">
                 <div className="">{step.icon}</div>
                <h3 className="text-xl font-semibold">{step.title}</h3>
               </div>
                <p className="text-gray-600 mt-5">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </MotionLayout>
  );
};

export default ExtraSection1;
