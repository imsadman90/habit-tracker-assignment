import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Typewriter } from "react-simple-typewriter";

const photos = [
  "https://avidsportsmed.com/wp-content/uploads/2022/06/Jogging.jpg",
  "https://img.freepik.com/free-photo/focused-young-indian-man-meditating-lotus-pose_1262-12658.jpg?semt=ais_hybrid&w=740&q=80",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTmu7Kwbq-lHVh8W99xJdDJnKybPWmlp-X6w&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5xgOtY8-UnrNquH67p29l85cOxJ-hbIdTjA&s",
  "https://avidsportsmed.com/wp-content/uploads/2022/06/Jogging.jpg",
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
            <div key={index} className="w-full flex-shrink-0 relative h-full">
              <img
                src={src}
                alt={`slide-${index}`}
                className="w-full h-full object-cover brightness-[0.85]"
                loading={index === 0 ? "eager" : "lazy"}
              />

              {/* Stronger overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/10" />

              {/* Content - centered better */}
              <div className="absolute inset-0 flex items-center justify-center px-5 sm:px-8 md:px-12">
                <div className="text-center max-w-4xl w-full">
                  {current === index && (
                    <>
                      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white tracking-tight drop-shadow-2xl mb-4 md:mb-6 leading-tight">
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

                      <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 font-light max-w-2xl mx-auto drop-shadow-lg">
                        Turn your goals into reality with simple, trackable
                        daily habits
                      </p>

                      {/* Optional CTA button */}
                      <div className="mt-6 md:mt-10">
                        <button className="px-7 py-3 md:px-9 md:py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium rounded-full shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 text-base md:text-lg">
                          Start Your Journey Today →
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows - bigger & more visible on mobile */}
        <button
          onClick={prevSlide}
          className="absolute left-3 sm:left-6 md:left-10 top-1/2 -translate-y-1/2 
                   bg-black/40 hover:bg-black/60 backdrop-blur-sm text-white 
                   p-3 sm:p-4 md:p-5 rounded-full transition-all duration-300 z-10"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-3 sm:right-6 md:right-10 top-1/2 -translate-y-1/2 
                   bg-black/40 hover:bg-black/60 backdrop-blur-sm text-white 
                   p-3 sm:p-4 md:p-5 rounded-full transition-all duration-300 z-10"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
        </button>

        {/* Dots indicator - cleaner & bigger */}
        <div className="absolute bottom-6 sm:bottom-8 md:bottom-10 left-1/2 -translate-x-1/2 flex gap-3 sm:gap-4 z-10">
          {photos.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`h-3 w-3 sm:h-3.5 sm:w-3.5 rounded-full transition-all duration-300 
                        ${
                          current === index
                            ? "bg-white scale-125 shadow-lg shadow-white/40"
                            : "bg-white/50 hover:bg-white/80"
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
