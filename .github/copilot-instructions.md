# Habit Tracker App - AI Coding Guidelines

## Architecture Overview
- **Frontend-only React SPA** built with Vite, deployed to Firebase Hosting
- **Authentication**: Firebase Auth (email/password + Google OAuth)
- **Backend**: Separate Node.js/Express/MongoDB API (accessed via `VITE_API_URL`)
- **Styling**: Tailwind CSS + DaisyUI components
- **Routing**: React Router with protected routes using `ProtectedRoute` component
- **State Management**: React Context for auth (`AuthContext`), no global state library

## Key Patterns & Conventions

### Authentication & User Management
- Use `AuthContext` for user state: `const { user, loading } = useContext(AuthContext)`
- Wrap protected pages with `<ProtectedRoute>` component
- Firebase config in `src/Firebase/firebase.config.js` uses `VITE_` env vars
- Auth methods: `registerUser`, `loginUser`, `googleLogin`, `signOutUser`, `updateUserProfile`

### API Communication
- Direct `fetch` calls to backend API endpoints (e.g., `${import.meta.env.VITE_API_URL}/habits`)
- Standard pattern: `try { const res = await fetch(...); if (!res.ok) throw new Error(...); const data = await res.json(); } catch (err) { console.error(err); }`
- No centralized API client; each component handles its own requests
- Habit data structure: `{ name, category, description, image?, reminder_time, created_by, user_name, created_at }`

### Component Structure
- Layouts in `src/layouts/`: `MainLayout` (public pages), `DashboardLayout` (authenticated)
- Pages in `src/pages/` and `src/Habits/`
- Reusable components in `src/components/`
- Use `MotionLayout` wrapper for Framer Motion animations

### Styling & UI
- Tailwind utility classes + DaisyUI components (e.g., `btn`, `card`, `modal`)
- Dark mode support via `next-themes` (though not fully implemented)
- Icons: `react-icons` (Fa*) and `lucide-react`
- Toasts: `react-hot-toast` with custom styling (dark background)
- Charts: Recharts library (`BarChart`, `ResponsiveContainer`)

### Forms & Data Handling
- Controlled components with `useState`
- Form submission: `e.preventDefault()`, extract values from `e.target`, POST to API
- Success feedback: `toast.success("Message", { duration: 3000, position: "top-center" })`
- Loading states: `useState` boolean, disable buttons/submit during submission

### Development Workflow
- **Start dev server**: `npm run dev` (Vite)
- **Build**: `npm run build` (outputs to `dist/`)
- **Lint**: `npm run lint` (ESLint)
- **Deploy**: Firebase CLI (`firebase deploy --only hosting`)
- **Preview build**: `npm run preview`

### File Organization
- `src/routes/Routes.jsx`: Defines all routes with loaders for data fetching
- `src/Context/AuthProvider.jsx`: Wraps app with auth context
- `src/components/ProtectedRoute.jsx`: Redirects unauthenticated users
- Habit CRUD in `src/Habits/` components
- Dashboard features in `src/pages/dashboard/`

### Environment Variables
- `VITE_API_URL`: Backend API base URL
- `VITE_*`: Firebase config keys (apiKey, authDomain, etc.)

## Common Gotchas
- API responses may not always be arrays; check `Array.isArray(data)` before mapping
- Firebase auth state changes trigger re-renders; handle `loading` state in components
- Tailwind classes override DaisyUI; use `!` for important overrides if needed
- Framer Motion requires `motion.` prefix on elements (e.g., `motion.div`)