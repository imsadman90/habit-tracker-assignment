import { Link } from "react-router";
import { User, Tag, Calendar, TrendingUp } from "lucide-react";

// Skeleton Loader Component
export const HabitCardSkeleton = () => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden animate-pulse h-[460px] border border-gray-100 dark:border-slate-700">
      {/* Image Skeleton */}
      <div className="h-52 bg-gradient-to-r from-gray-300 to-gray-200 dark:from-slate-700 dark:to-slate-600"></div>

      {/* Content Skeleton */}
      <div className="p-6 space-y-4">
        {/* Title */}
        <div className="h-6 bg-gray-300 dark:bg-slate-700 rounded-lg w-3/4"></div>

        {/* Description */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 dark:bg-slate-600 rounded w-full"></div>
          <div className="h-4 bg-gray-200 dark:bg-slate-600 rounded w-5/6"></div>
        </div>

        {/* Meta Info */}
        <div className="space-y-2 pt-3">
          <div className="h-4 bg-gray-200 dark:bg-slate-600 rounded w-1/2"></div>
          <div className="h-4 bg-gray-200 dark:bg-slate-600 rounded w-2/3"></div>
        </div>

        {/* Button */}
        <div className="h-11 bg-gradient-to-r from-gray-300 to-gray-200 dark:from-slate-700 dark:to-slate-600 rounded-full mt-4"></div>
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
    <div className="group bg-white dark:bg-slate-800 rounded-2xl overflow-hidden flex flex-col h-[460px] shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-500/30">
      {/* Image Section */}
      <div className="relative h-52 overflow-hidden bg-gradient-to-br from-slate-200 to-slate-100 dark:from-slate-700 dark:to-slate-600">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Category Badge */}
        <div className="absolute top-4 right-4">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-white/95 dark:bg-slate-900/90 backdrop-blur-md rounded-full text-xs font-bold text-blue-600 dark:text-blue-400 shadow-lg hover:shadow-xl transform group-hover:scale-110 transition-all duration-300 border border-white/20 dark:border-blue-500/20">
            <Tag className="w-3.5 h-3.5" />
            {category}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-col flex-grow p-6 space-y-4">
        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 dark:text-white line-clamp-2 leading-tight group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-300">
          {name}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-2 flex-grow">
          {truncateText(description)}
        </p>

        {/* Meta Information */}
        <div className="space-y-2 pb-4 border-t border-gray-100 dark:border-slate-700 pt-4">
          {/* Creator */}
          <div className="flex items-center gap-2.5 text-sm">
            <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <User className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            </div>
            <span className="text-gray-700 dark:text-gray-300 font-medium">
              {user_name || "Anonymous"}
            </span>
          </div>

          {/* Date */}
          <div className="flex items-center gap-2.5 text-sm">
            <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <Calendar className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            </div>
            <span className="text-gray-600 dark:text-gray-300">
              {formatDate(createdAt)}
            </span>
          </div>

          {/* Status Badge */}
          <div className="flex items-center gap-2">
            <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <TrendingUp className="w-4 h-4 text-green-600 dark:text-green-400" />
            </div>
            <span className="text-xs font-bold text-green-700 dark:text-green-400 bg-green-100 dark:bg-green-900/30 px-3 py-1 rounded-full">
              Active
            </span>
          </div>
        </div>

        {/* View Details Button */}
        <Link
          to={`/habit-details/${_id}`}
          className="relative group/btn w-full rounded-xl py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 font-bold text-sm overflow-hidden"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
          <span className="relative flex items-center justify-center gap-2">
            View Details
            <span className="group-hover/btn:translate-x-1 transition-transform duration-300">
              →
            </span>
          </span>
        </Link>
      </div>
    </div>
  );
};

export default HabitCard;
