import { useLoaderData } from "react-router";
import toast from "react-hot-toast";
import MotionLayout from "../layouts/MotionLayout";

const UpdateHabit = () => {
  const data = useLoaderData();
  const habit = data.result;

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      name: e.target.name.value,
      category: e.target.category.value,
      description: e.target.description.value,
      image: e.target.image.value,
    };

    fetch(`VITE_API_URL/habits/${habit._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then(() => toast.success("Successfully updated!"))
      .catch((err) => console.log(err));
  };

  return (
    <MotionLayout>
      <div className="card mt-10 mb-10 bg-[#dcf0fa] text-gray-700 w-full max-w-md mx-auto shadow-2xl rounded-2xl">
        <div className="card-body p-6">
          <h2 className="text-2xl font-bold text-center mb-6">Update Habit</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              defaultValue={habit.name}
              name="name"
              required
              className="input w-full rounded-full"
              placeholder="Habit Name"
            />
            <select
              defaultValue={habit.category}
              name="category"
              required
              className="select w-full rounded-full"
            >
              <option value="" disabled>
                Select category
              </option>
              <option value="Morning">Morning</option>
              <option value="Work">Work</option>
              <option value="Fitness">Fitness</option>
              <option value="Evening">Evening</option>
              <option value="Study">Study</option>
            </select>
            <textarea
              defaultValue={habit.description}
              name="description"
              required
              rows="3"
              className="textarea w-full rounded-2xl"
              placeholder="Description"
            />
            <input
              type="url"
              defaultValue={habit.image}
              name="image"
              className="input w-full rounded-full"
              placeholder="Image URL"
            />
            <input
              type="email"
              value={habit.created_by}
              readOnly
              className="input w-full rounded-full bg-gray-100"
            />
            <input
              type="text"
              value={habit.user_name}
              readOnly
              className="input w-full rounded-full bg-gray-100"
            />
            <button
              type="submit"
              className="btn w-full bg-[#53c2ed] text-[#003c6b] hover:bg-[#6bb5db] transition-colors rounded-full mt-4"
            >
              Update Habit
            </button>
          </form>
        </div>
      </div>
    </MotionLayout>
  );
};

export default UpdateHabit;
