import { Outlet, useLocation } from "react-router";
import { Toaster } from "react-hot-toast";

import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ExtraSection1 from "../pages/Home/ExtraSection1";
import ExtraSection2 from "../pages/Home/ExtraSection2";
import WhyBuildHabits from "../pages/Home/WhyBuildHabits";

const MainLayout = () => {
  const location = useLocation();

  const isHome = location.pathname === "/";

  return (
    <div>
      <Navbar />

      <Toaster position="top-right" reverseOrder={false} />

      <main>
        <Outlet />
        {isHome && (
          <>
          <WhyBuildHabits/>
            <ExtraSection1 />
            <ExtraSection2 />
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;
