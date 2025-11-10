import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import Login from "../Auth/Login";
import Register from "../Auth/Register";
import AddHabit from "../Habits/MyHabits";
import MyHabits from "..Habits/MyHabits";
import UpdateHabit from "..Habits/UpdateHabit";
import BrowsePublicHabits from "..Habits/BrowsePublicHabits";
import HabitDetails from "../Habits/HabitDetails";
import NotFound from "../pages/NotFound";
import ProtectedRoute from "../components/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      {
        path: "/add-habit",
        element: (
          <ProtectedRoute>
            <AddHabit />
          </ProtectedRoute>
        ),
      },
      {
        path: "/my-habits",
        element: (
          <ProtectedRoute>
            <MyHabits />
          </ProtectedRoute>
        ),
      },
      {
        path: "/update/:id",
        element: (
          <ProtectedRoute>
            <UpdateHabit />
          </ProtectedRoute>
        ),
      },
      {
        path: "/public-habits",
        element: <BrowsePublicHabits />,
      },
      {
        path: "/habit/:id",
        element: (
          <ProtectedRoute>
            <HabitDetails />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
