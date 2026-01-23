import { useLoaderData } from "react-router";
import { useState, useMemo, useEffect, useRef } from "react";
import { HabitCard } from "../components/HabitCard";
import MotionLayout from "../layouts/MotionLayout";
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";

const BrowsePublicHabits = () => {
  const data = useLoaderData();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageLoading, setPageLoading] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const ITEMS_PER_PAGE = 6;

  const categories = [
    { value: "", label: "All Categories" },
    { value: "Morning", label: "🌅 Morning" },
    { value: "Work", label: "💼 Work" },
    { value: "Fitness", label: "🏋️ Fitness" },
    { value: "Evening", label: "🌙 Evening" },
    { value: "Study", label: "📚 Study" },
    { value: "Mindfulness", label: "🧘 Mindfulness" },
    { value: "Health", label: "🥗 Health" },
    { value: "Productivity", label: "⚡ Productivity" },
  ];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (data) {
      setLoading(false);
    }
  }, [data]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, category]);

  const handleCategorySelect = (value) => {
    setCategory(value);
    setIsDropdownOpen(false);
  };

  const handlePageChange = (newPage) => {
    setPageLoading(true);
    setCurrentPage(newPage);
    setTimeout(() => setPageLoading(false), 300);
  };
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

  const totalPages = Math.ceil(filteredHabits.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedHabits = filteredHabits.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  return (
    <MotionLayout>
      <div className="min-h-full bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 py-10">
        <div className="w-full px-[4%] mx-auto space-y-8">
          {/* Header */}
          <div className="space-y-3 text-center">
            <p className="text-xs uppercase tracking-[0.25em] text-slate-500 dark:text-slate-500">
              Browse
            </p>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Public Habits
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              Explore and track habits from our community
            </p>
          </div>

          {/* Search & Filter */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <input
              type="text"
              placeholder="Search habits..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full sm:max-w-md px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600"
            />

            {/* Custom Dropdown */}
            <div className="relative w-full sm:w-fit" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen((prev) => !prev)}
                className="w-full sm:w-auto px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 outline-none transition-all text-slate-700 dark:text-slate-300 flex items-center justify-between gap-2 hover:border-blue-300 dark:hover:border-blue-700"
              >
                <span className="text-sm">
                  {categories.find((cat) => cat.value === category)?.label ||
                    "All Categories"}
                </span>
                <ChevronDown
                  size={18}
                  className={`transition-transform duration-300 ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown Menu */}
              <div
                className={`absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl backdrop-blur-lg z-50 transform origin-top transition-all duration-300 ease-out ${
                  isDropdownOpen
                    ? "opacity-100 scale-y-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 scale-y-95 -translate-y-2 pointer-events-none"
                }`}
              >
                <div className="max-h-64 overflow-y-auto p-2 space-y-1 text-md">
                  {categories.map((cat) => (
                    <button
                      key={cat.value}
                      onClick={() => handleCategorySelect(cat.value)}
                      className={`w-full text-left px-2 py-2 text-xs rounded-lg transition-all duration-200 ${
                        category === cat.value
                          ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md"
                          : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/70"
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Results Info */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-slate-900/70 border border-slate-200/70 dark:border-slate-800 backdrop-blur w-fit">
              <span className="text-sm font-semibold text-slate-900 dark:text-white">
                {filteredHabits.length} habit
                {filteredHabits.length !== 1 && "s"}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                {totalPages > 0 && `Page ${currentPage} of ${totalPages}`}
              </span>
            </div>
          </div>

          {filteredHabits.length > 0 ? (
            <>
              {/* Habits Grid with Loader Overlay */}
              <div className="relative">
                {pageLoading && (
                  <div className="absolute inset-0 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm rounded-2xl flex items-center justify-center z-10">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-12 h-12 rounded-full border-4 border-slate-200 dark:border-slate-700 border-t-blue-500 animate-spin" />
                      <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
                        Loading...
                      </p>
                    </div>
                  </div>
                )}
                <div
                  className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 transition-opacity ${
                    pageLoading ? "opacity-50" : "opacity-100"
                  }`}
                >
                  {paginatedHabits.map((habit) => (
                    <HabitCard key={habit._id} habit={habit} />
                  ))}
                </div>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-10">
                  <button
                    onClick={() =>
                      handlePageChange(Math.max(currentPage - 1, 1))
                    }
                    disabled={currentPage === 1 || pageLoading}
                    className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    <ChevronLeft
                      size={20}
                      className="text-slate-600 dark:text-slate-300"
                    />
                  </button>

                  <div className="flex items-center gap-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (page) => (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          disabled={pageLoading}
                          className={`min-w-10 h-10 rounded-lg font-semibold transition-all ${
                            currentPage === page
                              ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                              : "bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-blue-300 dark:hover:border-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                          }`}
                        >
                          {page}
                        </button>
                      ),
                    )}
                  </div>

                  <button
                    onClick={() =>
                      handlePageChange(Math.min(currentPage + 1, totalPages))
                    }
                    disabled={currentPage === totalPages || pageLoading}
                    className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    <ChevronRight
                      size={20}
                      className="text-slate-600 dark:text-slate-300"
                    />
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-16 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/70">
              <p className="text-slate-500 dark:text-slate-400 text-lg mb-2">
                No habits found
              </p>
              <p className="text-sm text-slate-400 dark:text-slate-500">
                Try adjusting your search or category filters
              </p>
            </div>
          )}
        </div>
      </div>
    </MotionLayout>
  );
};

export default BrowsePublicHabits;
