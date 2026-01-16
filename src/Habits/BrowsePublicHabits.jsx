import { useLoaderData } from "react-router";
import { useState, useMemo, useEffect } from "react";
import { HabitCard } from "../components/HabitCard";
import MotionLayout from "../layouts/MotionLayout";

const BrowsePublicHabits = () => {
  const data = useLoaderData();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (data) {
      setLoading(false);
    }
  }, [data]);
  const filteredHabits = useMemo(() => {
    return data.filter((habit) => {
      const matchesCategory = category ? habit.category === category : true;
      const name = habit.name || "";
      const description = habit.description || "";
      const matchesSearch =
        name.toLowerCase().includes(search.toLowerCase()) ||
        description.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [data, search, category]);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="loading loading-spinner loading-lg text-pink-500"></span>
      </div>
    );


  return (
    <MotionLayout>
      <div className="max-w-6xl mx-auto p-6 mt-10">
        <h1 className="text-4xl font-bold text-center mb-10 text-black/80">
          Browse Public Habits
        </h1>

        <div className="flex flex-col sm:flex-row mb-2 justify-between gap-4">
          <input
            type="text"
            placeholder="Search habits..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input w-full sm:w-[250px] rounded-full"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="select w-full sm:w-[200px] rounded-full"
          >
            <option value="">All Categories</option>
            <option value="Morning">Morning</option>
            <option value="Work">Work</option>
            <option value="Fitness">Fitness</option>
            <option value="Evening">Evening</option>
            <option value="Study">Study</option>
          </select>
        </div>

        <div className="mb-4 mt-10 text-gray-700 font-medium">
          {filteredHabits.length} habit{filteredHabits.length !== 1 && "s"} found
        </div>

        {filteredHabits.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {filteredHabits.map((habit) => (
              <HabitCard key={habit._id} habit={habit} />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 text-lg">No habits found.</div>
        )}
      </div>
    </MotionLayout>
  );
};

export default BrowsePublicHabits;