import { Link } from "react-router";

export const HabitCard = ({ habit }) => {
  const { name, image, category, description, _id, user_name } = habit;

  return (
    <div
      className="card relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
      style={{
        background: "var(--main-gradient)",
      }}
    >
      <figure className="h-48 overflow-hidden rounded-t-2xl">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
        />
      </figure>
      <div className="card-body p-4">
        <h2 className="card-title text-lg font-semibold text-blue-800">{name}</h2>
        <div className="flex flex-col gap-1 text-xs">
          <div className="rounded-full font-semibold text-[#023E8A] text-lg ">Category : {category}</div>
          {user_name && <div className="rounded-full font-semibold text-sm text-[#0077B6]">Created by : {user_name}</div>}
        </div>
        <div className="">
          <p className="underline text-xs font-semibold text-[#0077B6] mb-2">Description : </p>
          <p className="text-xs text-[#0077B6]">{description}</p>
        </div>
        <div className="card-actions justify-end mt-3">
          <Link
            to={`/habit-details/${_id}`}
            className="btn btn-sm w-full rounded-full bg-blue-500 text-white border-none  font-medium"
          >
            View
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HabitCard;
