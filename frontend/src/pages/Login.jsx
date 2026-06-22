import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../services/authService";
import useAuth from "../hooks/useAuth";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data =
        await loginUser(
          email,
          password
        );

      login(data.token);

      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Login Failed"
      );
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-slate-950">
      <form
        onSubmit={handleSubmit}
        className="bg-slate-900 p-8 rounded-xl w-full max-w-md"
      >
        <h1 className="text-3xl font-bold text-white mb-6">
          Login
        </h1>

        {error && (
          <p className="text-red-500 mb-4">
            {error}
          </p>
        )}

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 p-3 rounded bg-slate-800 text-white"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-3 rounded bg-slate-800 text-white"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
        />

        <button className="w-full bg-blue-600 p-3 rounded text-white font-semibold">
          Login
        </button>

        <p className="mt-4 text-slate-400">
          No account?{" "}
          <Link
            to="/register"
            className="text-blue-400"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}