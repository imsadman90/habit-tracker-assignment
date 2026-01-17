import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import DashboardLayout from "../layouts/DashboardLayout";

import Login from "../Auth/Login";
import Register from "../Auth/Register";

import AddHabit from "../Habits/AddHabit";
import MyHabits from "../Habits/MyHabit";
import UpdateHabit from "../Habits/UpdateHabit";

import BrowsePublicHabits from "../Habits/BrowsePublicHabits";
import HabitDetails from "../Habits/HabitDetails";

import FeaturedHabit from "../pages/Home/FeaturedHabit";
import DashboardHome from "../pages/dashboard/DashboardHome";
import Profile from "../pages/dashboard/Profile";

import NotFound from "../pages/NotFound";
import ProtectedRoute from "../components/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <FeaturedHabit />,
        loader: async () => {
          try {
            const res = await fetch(
              `${import.meta.env.VITE_API_URL}/latest-habits`
            );
            if (!res.ok) throw new Error("Failed to fetch latest habits");
            const data = await res.json();
            return Array.isArray(data) ? data : [];
          } catch (err) {
            console.error("Error fetching latest habits:", err);
            return [];
          }
        },
      },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      {
        path: "add-habit",
        element: (
          <ProtectedRoute>
            <AddHabit />
          </ProtectedRoute>
        ),
      },
      {
        path: "my-habits",
        element: (
          <ProtectedRoute>
            <MyHabits />
          </ProtectedRoute>
        ),
      },
      {
        path: "update-habit/:id",
        element: (
          <ProtectedRoute>
            <UpdateHabit />
          </ProtectedRoute>
        ),
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_API_URL}/habits/${params.id}`),
      },
      {
        path: "public-habits",
        element: <BrowsePublicHabits />,
        loader: async () => {
          try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/habits`);
            if (!res.ok) throw new Error("Failed to fetch public habits");
            const data = await res.json();
            return Array.isArray(data) ? data : [];
          } catch (err) {
            console.error("Error fetching public habits:", err);
            return [];
          }
        },
      },
      {
        path: "habit-details/:id",
        element: (
          <ProtectedRoute>
            <HabitDetails />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <DashboardHome /> },
      { path: "add-habit", element: <AddHabit /> },
      { path: "my-habits", element: <MyHabits /> },
      {
        path: "update-habit/:id",
        element: <UpdateHabit />,
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_API_URL}/habits/${params.id}`),
      },
      { path: "profile", element: <Profile /> },
    ],
  },
  { path: "*", element: <NotFound /> },
]);

export default router;
