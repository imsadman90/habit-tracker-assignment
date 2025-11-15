import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import toast from "react-hot-toast";
import MotionLayout from "../layouts/MotionLayout";

const AddHabit = () => {
  const { user } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      name: e.target.name.value,
      category: e.target.category.value,
      description: e.target.description.value,
      image: e.target.image.value,
      reminder_time: e.target.reminder.value,
      created_at: new Date(),
      created_by: user.email,
      user_name: user.displayName || "",
    };

    fetch("http://localhost:5001/habits", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then(() => {
        toast.success("Successfully added!");
        e.target.reset(); 
      })
      .catch((err) => console.log(err));
  };


  return (
    <MotionLayout>
      <div
        className="card  max-w-xl mx-auto rounded-2xl shadow-2xl bg-[#dcf0fa] text-gray-700  mt-10 overflow-hidden"

      >
        <div className="card-body p-6">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
            Add New Habit
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="label font-medium mb-2">Name</label>
              <input
                type="text"
                name="name"
                required
                placeholder="Enter name"
                className="input w-full rounded-full focus:ring-2 focus:ring-[#84cdee] focus:outline-none"
              />
            </div>

            {/* Category */}
            <div>
              <label className="label font-medium mb-2">Category</label>
              <select
                defaultValue=""
                name="category"
                required
                className="select w-full rounded-full focus:ring-2 focus:ring-[#84cdee] focus:outline-none"
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
            </div>

            {/* Description */}
            <div>
              <label className="label font-medium mb-2">Description</label>
              <textarea
                name="description"
                required
                rows="4"
                placeholder="Enter description"
                className="textarea w-full rounded-2xl focus:ring-2 focus:ring-[#84cdee] focus:outline-none"
              ></textarea>
            </div>

            {/* Reminder Time */}
            <div>
              <label className="label font-medium mb-2">Reminder Time</label>
              <input
                type="time"
                name="reminder"
                required
                className="input w-full rounded-full focus:ring-2 focus:ring-[#84cdee] focus:outline-none"
              />
            </div>

            {/* Image URL */}
            <div>
              <label className="label font-medium mb-2">Image URL</label>
              <input
                type="url"
                name="image"
                placeholder="https://example.com/image.jpg"
                className="input w-full rounded-full focus:ring-2 focus:ring-[#84cdee] focus:outline-none"
              />
            </div>

            {/* User Email */}
            <div>
              <label className="label font-medium mb-2">User Email</label>
              <input
                type="email"
                value={user.email}
                readOnly
                className="input w-full rounded-full bg-gray-100 cursor-not-allowed"
              />
            </div>

            {/* User Name */}
            <div>
              <label className="label font-medium mb-2">User Name</label>
              <input
                type="text"
                value={user.displayName || ""}
                readOnly
                className="input w-full rounded-full bg-gray-100 cursor-not-allowed"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn w-full rounded-full  text-white border-none bg-blue-500 transition-colors"
            >
              Add Habit
            </button>
          </form>
        </div>
      </div>
    </MotionLayout>
  );
};

export default AddHabit;
