import { Link } from "react-router";
import { User, Tag, Calendar, TrendingUp } from "lucide-react";

// Skeleton Loader Component
export const HabitCardSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden animate-pulse h-[420px]">
      {/* Image Skeleton */}
      <div className="h-48 bg-gray-300"></div>

      {/* Content Skeleton */}
      <div className="p-5 space-y-3">
        {/* Title */}
        <div className="h-6 bg-gray-300 rounded-lg w-3/4"></div>

        {/* Description */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>

        {/* Meta Info */}
        <div className="space-y-2 pt-2">
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>

        {/* Button */}
        <div className="h-10 bg-gray-300 rounded-full mt-4"></div>
      </div>
    </div>
  );
};

// Main HabitCard Component
export const HabitCard = ({ habit }) => {
  const { name, image, category, description, _id, user_name, createdAt } =
    habit;

  // Format date if available
  const formatDate = (date) => {
    if (!date) return "Recently added";
    const d = new Date(date);
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Truncate description
  const truncateText = (text, maxLength = 80) => {
    if (!text) return "No description available";
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + "...";
  };

  return (
    <div className="dark:bg-base-100 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden flex flex-col h-[420px]">
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full dark:opacity-50 h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {/* Category Badge */}
        <div className="absolute top-3 right-3">
          <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-white/95 backdrop-blur-sm rounded-full text-xs font-semibold text-blue-600 shadow-md">
            <Tag className="w-3 h-3" />
            {category}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-col flex-grow p-5">
        {/* Title */}
        <h3 className="dark:text-gray-300 text-xl font-bold text-gray-900 mb-2 line-clamp-1">
          {name}
        </h3>

        {/* Description */}
        <p className="dark:text-gray-300 text-sm text-gray-600 leading-relaxed mb-4 line-clamp-2 flex-grow">
          {truncateText(description)}
        </p>

        {/* Meta Information */}
        <div className="space-y-2 mb-4 pb-4 border-b border-gray-100">
          {/* Creator */}
          <div className="flex items-center gap-2 text-sm">
            <User className="w-4 h-4 text-gray-400" />
            <span className="text-gray-700 dark:text-gray-300 font-medium">
              {user_name || "Anonymous"}
            </span>
          </div>

          {/* Date */}
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="w-4 h-4 text-gray-400" />
            <span className="text-gray-600 dark:text-gray-300">
              {formatDate(createdAt)}
            </span>
          </div>

          {/* Status Badge */}
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-green-500" />
            <span className="text-xs font-semibold text-green-600 bg-green-50 px-2.5 py-1 rounded-full">
              Active
            </span>
          </div>
        </div>

        {/* View Details Button */}
        <Link
          to={`/habit-details/${_id}`}
          className="btn w-full rounded-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white border-none shadow-md hover:shadow-lg transition-all duration-200 font-semibold text-sm h-11"
        >
          View Details →
        </Link>
      </div>
    </div>
  );
};

export default HabitCard;