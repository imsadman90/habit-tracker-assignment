import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Typewriter } from "react-simple-typewriter";

const photos = [
  "https://media.istockphoto.com/id/1285079192/photo/enjoy-the-little-things-motivational-quote-written-on-paper-in-a-garden-with-green-plants.jpg?s=1024x1024&w=is&k=20&c=Tk-I93S0mPxBNy2f05pBFeeWMDUUAR54p0eOVqk7pmQ=",
  "https://images.unsplash.com/photo-1717544507257-e80b65334c6c?q=80&w=1253&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1663956149194-c911520bafb4?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1728718248311-2fdb76913d94?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1553053953-147e718c9782?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

const Banner = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % photos.length);
    }, 5000); // slightly longer for better reading

    return () => clearInterval(interval);
  }, []);

  const prevSlide = () => {
    setCurrent((current - 1 + photos.length) % photos.length);
  };

  const nextSlide = () => {
    setCurrent((current + 1) % photos.length);
  };

  return (
    <div className="w-full relative overflow-hidden">
      {/* Main slider container - controls height */}
      <div className="relative h-[60vh] min-h-[420px] sm:h-[65vh] md:h-[70vh] lg:h-[75vh] xl:h-[78vh]">
        {/* Slides */}
        <div
          className="flex h-full transition-transform duration-1000 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {photos.map((src, index) => (
            <div
              key={index}
              className="w-full flex-shrink-0 relative h-full group"
            >
              <img
                src={src}
                alt={`slide-${index}`}
                className="w-full h-full object-cover brightness-[0.75] group-hover:brightness-[0.85] transition-all duration-700"
                loading={index === 0 ? "eager" : "lazy"}
              />

              {/* Advanced overlay with gradient mesh */}
              <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />
              </div>

              {/* Animated accent elements */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full -mr-48 -mt-48 blur-3xl" />
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-purple-500/10 to-blue-500/10 rounded-full -ml-48 -mb-48 blur-3xl" />

              {/* Content - centered better */}
              <div className="absolute inset-0 flex items-center justify-center px-5 sm:px-8 md:px-12">
                <div className="text-center max-w-4xl w-full">
                  {current === index && (
                    <div className="space-y-6 md:space-y-8 animate-fadeIn">
                      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white tracking-tight drop-shadow-2xl leading-tight">
                        <Typewriter
                          words={[
                            "Build Better Habits",
                            "Transform Your Life",
                            "Stay Consistent Forever",
                            "Small Steps, Big Changes",
                          ]}
                          loop={0}
                          cursor
                          cursorStyle="_"
                          typeSpeed={70}
                          deleteSpeed={40}
                          delaySpeed={2200}
                        />
                      </h1>

                      <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/95 font-light max-w-2xl mx-auto drop-shadow-lg backdrop-blur-sm bg-black/10 rounded-2xl px-6 py-4">
                        Turn your goals into reality with simple, trackable
                        daily habits
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows - Modern frosted glass */}
        <button
          onClick={prevSlide}
          className="absolute left-3 sm:left-6 md:left-10 top-1/2 -translate-y-1/2 
                   bg-white/10 hover:bg-white/25 backdrop-blur-xl text-white 
                   p-3 sm:p-4 md:p-5 rounded-full transition-all duration-300 z-10
                   border border-white/20 hover:border-white/40
                   shadow-xl hover:shadow-2xl transform hover:scale-110"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-3 sm:right-6 md:right-10 top-1/2 -translate-y-1/2 
                   bg-white/10 hover:bg-white/25 backdrop-blur-xl text-white 
                   p-3 sm:p-4 md:p-5 rounded-full transition-all duration-300 z-10
                   border border-white/20 hover:border-white/40
                   shadow-xl hover:shadow-2xl transform hover:scale-110"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
        </button>

        {/* Dots indicator - Modern glassmorphism */}
        <div className="absolute bottom-6 sm:bottom-8 md:bottom-10 left-1/2 -translate-x-1/2 flex gap-2 sm:gap-3 z-10 bg-white/10 backdrop-blur-xl px-4 sm:px-6 py-3 sm:py-4 rounded-full border border-white/20">
          {photos.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`transition-all duration-300 rounded-full cursor-pointer
                        ${
                          current === index
                            ? "h-3 w-8 sm:h-3.5 sm:w-10 bg-gradient-to-r from-blue-400 to-purple-400 shadow-lg shadow-purple-500/50 scale-110"
                            : "h-2 w-2 sm:h-2.5 sm:w-2.5 bg-white/60 hover:bg-white/90 hover:scale-125"
                        }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Banner;
