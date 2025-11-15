import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Typewriter } from "react-simple-typewriter";

const photos = [
  "https://images.unsplash.com/photo-1614813231574-843cb1fb940b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1644412448740-40e5b6ded2dc?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1474859569645-e0def92b02bc?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1644412447181-7f9f80ee3889?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1636116328724-5a11af8d9677?q=80&w=1179&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
];

const Banner = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % photos.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const prevSlide = () => setCurrent((current - 1 + photos.length) % photos.length);
  const nextSlide = () => setCurrent((current + 1) % photos.length);

  return (
    <div className="w-full relative overflow-hidden mb-10">

      <div
        className="flex transition-transform duration-1000 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {photos.map((src, i) => (
          <div
            key={i}
            className="w-full flex-shrink-0 relative 
                       h-[60vh] xs:h-[65vh] sm:h-[70vh] md:h-[65vh] lg:h-[80vh]"
          >
            <img src={src} alt={`slide-${i}`} className="w-full h-full object-cover" />

            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30" />

            {current === i && (
              <div
                className="absolute bottom-6 sm:bottom-10 left-1/2 
                           -translate-x-1/2 text-center text-white px-2 sm:px-4 w-[90%] sm:w-auto"
              >
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-snug">
                  <Typewriter
                    words={["Build Good Habits", "Transform Your Life", "Stay Consistent"]}
                    loop={0}
                    cursor
                    cursorStyle="|"
                    typeSpeed={70}
                    deleteSpeed={50}
                    delaySpeed={2000}
                  />
                </h1>
              </div>
            )}
          </div>
        ))}
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 
                   bg-black/30 hover:bg-black/50 text-white p-2 sm:p-3 rounded-full transition"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 
                   bg-black/30 hover:bg-black/50 text-white p-2 sm:p-3 rounded-full transition"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 sm:gap-3">
        {photos.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2 w-2 rounded-full transition-all 
                      ${current === i ? "bg-white w-5" : "bg-white/50"}`}
          />
        ))}
      </div>

    </div>
  );
};

export default Banner;
