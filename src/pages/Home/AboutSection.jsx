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
    <div
      id="about"
      className="bg-gradient-to-b from-transparent via-blue-50/30 to-transparent dark:via-slate-900/30"
    >
      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-blue-50 dark:from-slate-900 dark:via-purple-900/20 dark:to-slate-900 pb-20 md:pb-32">
        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-blue-200 to-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 md:pt-32">
          <div className="text-center space-y-8 max-w-5xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-full shadow-lg border border-white/40 dark:border-slate-700/40 hover:shadow-xl transition-all hover:scale-105">
              <Zap className="w-5 h-5 text-amber-500 animate-pulse" />
              <span className="font-bold text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
                Habit Formation · 2026
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-extrabold tracking-tight leading-tight">
              <span className="text-slate-900 dark:text-white">
                Small Habits.
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                Extraordinary Results.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl sm:text-2xl lg:text-3xl text-slate-700 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed font-light">
              The simplest, most beautiful way to build{" "}
              <span className="font-semibold text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
                lasting positive habits
              </span>
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <button className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-full shadow-2xl hover:shadow-blue-500/50 transform hover:-translate-y-1 transition-all duration-300 text-lg overflow-hidden">
                <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative flex items-center justify-center gap-2">
                  Start Building Habits
                  <span className="group-hover:translate-x-1 transition-transform duration-300">
                    →
                  </span>
                </span>
              </button>
              <button className="px-8 py-4 bg-white/50 dark:bg-slate-800/50 backdrop-blur-xl text-blue-600 dark:text-blue-400 font-bold rounded-full border-2 border-blue-600 dark:border-blue-500 hover:bg-blue-50 dark:hover:bg-slate-700 transition-all duration-300 text-lg hover:scale-105">
                See How It Works
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats - Modernized */}
      <div className="max-w-7xl mx-auto px-4 -mt-12 md:-mt-16 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="group bg-white/50 dark:bg-slate-800/50 backdrop-blur-xl rounded-2xl shadow-xl hover:shadow-2xl p-6 md:p-8 text-center border border-white/40 dark:border-slate-700/40 hover:border-blue-300 dark:hover:border-blue-500/30 transition-all duration-300 hover:-translate-y-2"
            >
              <div className="text-3xl md:text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                {stat.number}
              </div>
              <div className="text-sm md:text-base font-semibold text-slate-700 dark:text-slate-300">
                {stat.label}
              </div>
              {/* Bottom accent */}
              <div className="mt-4 h-1 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 origin-center transition-transform duration-500 rounded-full" />
            </div>
          ))}
        </div>
      </div>

      {/* Our Approach / Science */}
      <div className="max-w-7xl mx-auto px-4 py-20 md:py-28 bg-gradient-to-b from-transparent via-green-50/20 to-transparent dark:via-green-900/10 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-20 left-0 w-72 h-72 bg-green-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 pointer-events-none" />
        <div className="absolute bottom-20 right-0 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 pointer-events-none" />

        <div className="text-center mb-16 relative z-10">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-5">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
              Built on Proven Methods
            </span>
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            We don't reinvent habit science — we make the best current
            understanding easy and enjoyable to apply
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
          {scienceFacts.map((fact, i) => (
            <div
              key={i}
              className="group bg-white/50 dark:bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-white/40 dark:border-slate-700/40 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:border-green-300 dark:hover:border-green-500/30"
            >
              <div className="flex items-start gap-4">
                <div className="mt-1 p-2 bg-green-50 dark:bg-green-900/20 rounded-lg group-hover:scale-110 transition-transform duration-300">
                  <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400 flex-shrink-0" />
                </div>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed flex-grow">
                  {fact}
                </p>
              </div>
              {/* Bottom accent */}
              <div className="mt-4 h-1 bg-gradient-to-r from-green-500 to-emerald-500 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 rounded-full" />
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="max-w-7xl mx-auto px-4 py-20 md:py-28 bg-gradient-to-b from-transparent via-purple-50/20 to-transparent dark:via-purple-900/10 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-20 right-0 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 pointer-events-none" />
        <div className="absolute bottom-20 left-0 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 pointer-events-none" />

        <div className="text-center mb-16 relative z-10">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-5">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
              Everything You Need
            </span>
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Carefully designed features that actually help people succeed
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 relative z-10">
          {features.map((feature, i) => (
            <div
              key={i}
              className="group h-full bg-white/50 dark:bg-slate-800/50 backdrop-blur-xl rounded-2xl shadow-lg hover:shadow-2xl border border-white/40 dark:border-slate-700/40 p-8 hover:-translate-y-2 transition-all duration-300 hover:border-blue-300 dark:hover:border-blue-500/30 flex flex-col"
            >
              <div
                className={`w-20 h-20 rounded-xl bg-gradient-to-br ${feature.color} p-4 text-white mb-6 shadow-xl group-hover:scale-110 group-hover:shadow-2xl transition-all duration-300`}
              >
                {feature.icon}
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-300">
                {feature.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed flex-grow mb-4">
                {feature.description}
              </p>
              {/* Bottom accent */}
              <div
                className={`h-1 bg-gradient-to-r ${feature.color} transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 rounded-full`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Categories - now with descriptions */}
      <div className="max-w-7xl mx-auto px-4 py-20 md:py-28 bg-gradient-to-b from-transparent via-orange-50/20 to-transparent dark:via-orange-900/10 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 pointer-events-none" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 pointer-events-none" />

        <div className="text-center mb-16 relative z-10">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-5">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
              Choose Your Focus Area
            </span>
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Build habits that matter most to your current life priorities
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 relative z-10">
          {categories.map((cat, i) => (
            <div
              key={i}
              className="group bg-white/50 dark:bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-white/40 dark:border-slate-700/40 shadow-lg hover:shadow-2xl hover:border-blue-300 dark:hover:border-blue-500/30 transition-all duration-300 hover:-translate-y-2"
            >
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 flex items-center justify-center mb-4 text-blue-600 dark:text-blue-400 group-hover:scale-110 group-hover:shadow-lg transition-all duration-300">
                {cat.icon}
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-300">
                {cat.title}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                {cat.desc}
              </p>
              {/* Bottom accent */}
              <div className="mt-4 h-1 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 origin-center transition-transform duration-500 rounded-full" />
            </div>
          ))}
        </div>
      </div>

      {/* CTA - final push */}
      <div className="max-w-7xl mx-auto px-4 pb-20 md:pb-32 relative">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-blue-600 p-1 shadow-2xl group hover:shadow-blue-500/50 transition-all duration-300">
          <div className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl rounded-3xl p-10 md:p-16 lg:p-20 text-center relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-200 to-purple-200 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full -mr-32 -mt-32 blur-3xl opacity-30 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-purple-200 to-blue-200 dark:from-purple-900/30 dark:to-blue-900/30 rounded-full -ml-32 -mb-32 blur-3xl opacity-30 pointer-events-none" />

            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6">
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Ready to Change Your Life?
                </span>
              </h2>
              <p className="text-lg md:text-xl lg:text-2xl text-slate-700 dark:text-slate-300 mb-10 max-w-3xl mx-auto">
                Join 47,000+ people who are becoming better versions of
                themselves — one tiny habit at a time.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="group/btn relative px-10 py-5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-full shadow-2xl hover:shadow-blue-500/50 transform hover:-translate-y-1 transition-all duration-300 text-lg overflow-hidden">
                  <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                  <span className="relative flex items-center justify-center gap-2">
                    Start Building Habits
                    <span className="group-hover/btn:translate-x-1 transition-transform duration-300">
                      →
                    </span>
                  </span>
                </button>
                <button className="px-10 py-5 bg-white/50 dark:bg-slate-700/50 backdrop-blur-xl text-blue-600 dark:text-blue-400 font-bold rounded-full border-2 border-blue-600 dark:border-blue-500 hover:bg-blue-50 dark:hover:bg-slate-600 transition-all duration-300 text-lg hover:scale-105">
                  See How It Works
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
