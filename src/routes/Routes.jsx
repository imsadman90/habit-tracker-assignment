import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Login from "../Auth/Login";
import Register from "../Auth/Register";
import AddHabit from "../Habits/AddHabit";
import MyHabits from "../Habits/MyHabit";
import UpdateHabit from "../Habits/UpdateHabit";
import BrowsePublicHabits from "../Habits/BrowsePublicHabits";
import HabitDetails from "../Habits/HabitDetails";
import NotFound from "../pages/NotFound";
import ProtectedRoute from "../components/ProtectedRoute";
import FeaturedHabit from "../pages/Home/FeaturedHabit";


const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: (
          
            <FeaturedHabit />
         
        ),
        loader: async () => {
          try {
            const res = await fetch("http://localhost:5001/habits");
            if (!res.ok) throw new Error("Failed to fetch habits");
            const data = await res.json();
            return Array.isArray(data) ? data : [];
          } catch (err) {
            console.error("Error fetching habits:", err);
            return [];
          }
        },
      },

      { path: "/login", element: 
        
          <Login />
       
      },

      { path: "/register", element: 
        
          <Register />
       
      },

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
        path: "/update-habit/:id",
        element: (
          
            <ProtectedRoute>
              <UpdateHabit />
            </ProtectedRoute>
         
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:5001/habits/${params.id}`)
      },

      {
        path: "/public-habits",
        element: (
          
            <BrowsePublicHabits />
         
        ),
        loader: async () => {
          try {
            const res = await fetch("http://localhost:5001/habits");
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
        path: "/habit-details/:id",
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
    element: (
      
        <NotFound />
     
    ),
  },
]);

export default router;
