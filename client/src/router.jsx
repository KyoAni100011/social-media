import { Route, Routes, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login";
import LayoutCommon from "./pages/Home/LayoutCommon";
import SignIn from "./pages/SignIn";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile/Profile";

const protectedRoutes = [
  { path: "/", element: <Home /> },
  { path: "/profile", element: <Profile /> },
];

export default function Router() {
  const {
    configAuth: { user },
  } = useAuth();

  return (
    <Routes>
      <Route
        path="/"
        element={user ? <LayoutCommon /> : <Navigate to="/login" />}
      >
        {protectedRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Route>
      <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
      <Route
        path="/register"
        element={user ? <Navigate to="/" /> : <SignIn />}
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
