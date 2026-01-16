import {
  Target,
  TrendingUp,
  Users,
  Award,
  Zap,
  Heart,
  CheckCircle,
  Flame,
  Calendar,
  BookOpen,
  Brain,
  Coffee,
  Dumbbell,
  Moon,
  Sun,
  Sparkles,
} from "lucide-react";

const AboutSection = () => {
  const features = [
    {
      icon: <Target className="w-8 h-8" />,
      title: "Clear, Achievable Goals",
      description:
        "Start with tiny, realistic habits — the foundation of long-term change.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Visual Progress Tracking",
      description:
        "Beautiful charts, heatmaps & detailed statistics to see your improvement.",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: <Flame className="w-8 h-8" />,
      title: "Powerful Streaks & Rewards",
      description:
        "Maintain streaks, earn badges and unlock motivational milestones.",
      color: "from-orange-500 to-red-500",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Growing Supportive Community",
      description:
        "Share wins, get encouragement and learn from thousands of others.",
      color: "from-green-500 to-emerald-500",
    },
  ];

  const stats = [
    { number: "47,000+", label: "Active Users (Jan 2026)" },
    { number: "320,000+", label: "Habits Being Tracked" },
    { number: "8.2M+", label: "Completions Logged" },
    { number: "87%+", label: "30-day Retention Rate" },
  ];

  const scienceFacts = [
    "Based on Atomic Habits principles (James Clear)",
    "Uses the 2-Minute Rule & Habit Stacking techniques",
    "Leverages the power of small wins & dopamine feedback loops",
    "Designed with BJ Fogg's Tiny Habits methodology in mind",
  ];

  const categories = [
    { icon: <Sun />, title: "Morning Routine", desc: "Start strong every day" },
    { icon: <Dumbbell />, title: "Fitness & Health", desc: "Body & energy" },
    { icon: <Brain />, title: "Learning & Growth", desc: "Knowledge & skills" },
    { icon: <Coffee />, title: "Productivity", desc: "Deep work & focus" },
    { icon: <Moon />, title: "Evening Wind-down", desc: "Better sleep" },
    {
      icon: <BookOpen />,
      title: "Reading & Reflection",
      desc: "Mindful growth",
    },
    { icon: <Sparkles />, title: "Mindfulness", desc: "Mental clarity" },
  ];

  return (
    <div id="about" className="bg-gradient-to-b from-slate-50 to-white">
      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 pb-16 md:pb-24">
        <div className="absolute inset-0 bg-grid-slate-100 dark:bg-base-300 " />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 md:pt-28">
          <div className="text-center space-y-6 max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/80 backdrop-blur-sm rounded-full shadow-sm border border-white/60 ">
              <Zap className="w-5 h-5 text-amber-500" />
              <span className="font-semibold text-slate-700">
                Habit Formation · 2026
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-slate-900 dark:text-gray-300">
              Small Habits.
              <br />
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Extraordinary Results.
              </span>
            </h1>

            <p className="text-xl sm:text-2xl text-slate-700 max-w-3xl mx-auto leading-relaxed font-light">
              The simplest, most beautiful way to build lasting positive habits.
            </p>
          </div>
        </div>
      </div>

      {/* Updated Stats - more credible */}
      <div className="max-w-7xl mx-auto px-4 dark:bg-base-300 ">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="bg-white dark:bg-base-300  rounded-2xl shadow-lg p-6 md:p-8 text-center border border-slate-100 hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <div className="text-3xl md:text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
                {stat.number}
              </div>
              <div className="text-sm md:text-base font-medium text-slate-600">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Our Approach / Science */}
      <div className="max-w-7xl mx-auto px-4 py-20 md:py-28 dark:bg-base-300 ">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-5 dark:text-gray-400 ">
            Built on Proven Methods
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto dark:text-gray-400 ">
            We don't reinvent habit science — we make the best current
            understanding easy and enjoyable to apply
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {scienceFacts.map((fact, i) => (
            <div
              key={i}
              className="bg-white dark:bg-base-300  rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div className="mt-1">
                  <CheckCircle className="w-6 h-6 text-emerald-500 flex-shrink-0" />
                </div>
                <p className="text-slate-700 leading-relaxed dark:text-gray-400 ">
                  {fact}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="max-w-7xl mx-auto px-4 py-16 md:py-24 dark:bg-base-300">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-5 dark:text-gray-400">
            Everything You Need
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto dark:text-gray-400">
            Carefully designed features that actually help people succeed
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {features.map((feature, i) => (
            <div
              key={i}
              className="group bg-white dark:bg-base-300 rounded-2xl shadow-lg border border-slate-100 p-7 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div
                className={`w-16 h-16 rounded-xl bg-gradient-to-br ${feature.color} p-4 text-white mb-6 shadow-lg group-hover:scale-110 transition-transform`}
              >
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 dark:text-gray-400">
                {feature.title}
              </h3>
              <p className="text-slate-600 leading-relaxed dark:text-gray-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Categories - now with descriptions */}
      <div className="max-w-7xl mx-auto px-4 py-20 md:py-28 dark:bg-base-300">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-5 dark:text-gray-400">
            Choose Your Focus Area
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto dark:text-gray-400">
            Build habits that matter most to your current life priorities
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">
          {categories.map((cat, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 border border-slate-100 dark:bg-base-300 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all group"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center mb-4 text-indigo-600 group-hover:scale-110 transition-transform">
                {cat.icon}
              </div>
              <h3 className="font-bold text-slate-900 mb-1.5 dark:text-gray-400">
                {cat.title}
              </h3>
              <p className="text-sm text-slate-600 dark:text-gray-400">
                {cat.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA - final push */}
      <div className="max-w-7xl mx-auto px-4 pb-20 md:pb-32 dark:bg-base-300">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-1 shadow-2xl">
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-10 md:p-16 lg:p-20 text-center dark:bg-base-300">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-6 dark:text-gray-300">
              Ready to Change Your Life?
            </h2>
            <p className="text-lg dark:text-gray-300 md:text-xl text-slate-700 mb-10 max-w-3xl mx-auto">
              Join 47,000+ people who are becoming better versions of themselves
              — one tiny habit at a time.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn btn-lg rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white border-none shadow-xl hover:shadow-2xl px-10">
                Start Building Habits →
              </button>
              <button className="btn btn-lg btn-outline rounded-full border-2 border-indigo-600 text-indigo-700 hover:bg-indigo-50 px-10">
                See How It Works
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
