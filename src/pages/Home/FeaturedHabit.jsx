import { useLoaderData } from "react-router";
import { HabitCard } from "../../components/HabitCard";
import Banner from "../../components/Banner";
import MotionLayout from "../../layouts/MotionLayout";
import { useEffect, useState } from "react";

const FeaturedHabit = () => {
  const data = useLoaderData();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (data) {
      setLoading(false);
    }
  }, [data]);

  const latestHabits = data
    .slice()
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, 6);

  if (loading)
    return (
      <div className="flex justify-center items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );

  return (
    <MotionLayout>
      <div className="">
        <Banner />
        <div className="text-center text-3xl font-bold mt-5 mb-10">
          Latest <span className="text-blue-500">Habits</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 px-10 lg:grid-cols-3 gap-6 mt-10">
          {latestHabits.map((habit) => (
            <HabitCard key={habit._id} habit={habit} />
          ))}
        </div>
      </div>
    </MotionLayout>
  );
};

export default FeaturedHabit;
