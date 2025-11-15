import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Typewriter } from "react-simple-typewriter";

const photos = [
  "https://media.istockphoto.com/id/1528036967/photo/build-good-habits-symbol-concept-wooden-blocks-with-build-good-habits-motto-navy-blue.jpg?s=612x612&w=0&k=20&c=zD5Nt7cuNF_XwMW7uu-ai2Yv9kZy9HQwfd2ro6MnFaw=",
  "https://www.shutterstock.com/image-photo/daily-habits-shown-using-text-600nw-2485051015.jpg",
  "https://thumbs.dreamstime.com/b/good-habits-results-life-concept-chalkboard-writing-hand-149414968.jpg",
  "https://inkwellpress.com/cdn/shop/articles/BlogHabits.jpg?v=1678483581",
  "https://cdn.prod.website-files.com/5d3aa41f4e11727a27d4e25c/5f1800507d8026c23bb18476_lDo-q8DZxN7yt1LmqQtuUQTx9g8V11ekawCo5JmOXfQptwHDk6wp4LS2F2MneH0X2HgrtFFLZN2uX8B89euO4Uc44IU-frF25FDkTG9ixB6kfvKjBkjH3VRyqzf5E0EBj6Xzdkms.jpeg"
];

const Banner = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % photos.length);
    }, 4000); // slide changes every 4 seconds
    return () => clearInterval(interval);
  }, []);

  const prevSlide = () => setCurrent((current - 1 + photos.length) % photos.length);
  const nextSlide = () => setCurrent((current + 1) % photos.length);

  return (
    <div className="w-full relative overflow-hidden mb-15">
      {/* Slides */}
      <div
        className="flex transition-transform duration-1000 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {photos.map((src, i) => (
          <div key={i} className="w-full flex-shrink-0 relative h-[70vh] md:h-[60vh] lg:h-[80vh]">
            <img
              src={src}
              alt={`slide-${i}`}
              className="w-full h-full object-cover"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30" />
            
            {/* Typewriter Text at Bottom */}
            {current === i && (
              <div className="absolute left-1/5 bottom-10 -translate-x-1/2 text-center text-white px-4">
                <h1 className="text-3xl md:text-4xl font-bold">
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

      {/* Navigation buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-5 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full transition"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-5 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full transition"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Pagination dots */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-3">
        {photos.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2 w-2 rounded-full transition-all ${current === i ? "bg-white w-5" : "bg-white/50"}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;
