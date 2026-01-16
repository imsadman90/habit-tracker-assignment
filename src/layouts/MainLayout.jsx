import { useEffect } from "react";
import { Outlet, useLocation } from "react-router";
import { Toaster } from "react-hot-toast";

import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ExtraSection1 from "../pages/Home/ExtraSection1";
import ExtraSection2 from "../pages/Home/ExtraSection2";
import WhyBuildHabits from "../pages/Home/WhyBuildHabits";
import AboutSection from "../pages/Home/AboutSection";
import ContactPage from "../pages/Home/Contact";

const MainLayout = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    if (location.hash && isHome) {
      const element = document.getElementById(location.hash.substring(1));
      element?.scrollIntoView({ behavior: "smooth" });
    }
  }, [location, isHome]);

  return (
    <div>
      <Navbar />

      <Toaster position="top-right" reverseOrder={false} />

      <main>
        <Outlet />
        {isHome && (
          <>
            <WhyBuildHabits />
            <ExtraSection1 />
            <ExtraSection2 />
            <AboutSection />
            <ContactPage/>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;
