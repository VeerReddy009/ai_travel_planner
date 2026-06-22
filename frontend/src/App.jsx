import {
  Routes,
  Route,
} from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CreateTrip from "./pages/CreateTrip";
import TripDetails from "./pages/TripDetails";

import ProtectedRoute from "./layouts/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={<Home />}
      />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/create-trip"
        element={
          <ProtectedRoute>
            <CreateTrip />
          </ProtectedRoute>
        }
      />

      <Route
        path="/trip/:id"
        element={
          <ProtectedRoute>
            <TripDetails />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;