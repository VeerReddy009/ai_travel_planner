import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-slate-950 text-white px-8 py-4 flex justify-between items-center shadow-lg">
      {/* Logo */}
      <Link
        to="/"
        className="text-3xl font-bold text-blue-400 italic"
      >
        AI Travel Planner
      </Link>

      {/* Navigation Links */}
      <div className="flex items-center gap-6 text-lg font-medium">
        {user ? (
          <>
            <Link
              to="/dashboard"
              className="px-4 py-2 rounded-lg hover:text-blue-400 hover:bg-slate-900 transition duration-200"
            >
              Dashboard
            </Link>

            <Link
              to="/create-trip"
              className="px-4 py-2 rounded-lg hover:text-blue-400 hover:bg-slate-900 transition duration-200"
            >
              Create Trip
            </Link>

            <button
              onClick={handleLogout}
              className="px-5 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition duration-200"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="px-4 py-2 rounded-lg hover:text-blue-400 hover:bg-slate-900 transition duration-200"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg transition duration-200"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}