import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { registerUser } from "../services/authService";

import useAuth from "../hooks/useAuth";

export default function Register() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data =
        await registerUser(
          email,
          password
        );

      login(data.token);

      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Registration Failed"
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
          Register
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

        <button className="w-full bg-green-600 p-3 rounded text-white font-semibold">
          Register
        </button>

        <p className="mt-4 text-slate-400">
          Already have account?{" "}
          <Link
            to="/login"
            className="text-blue-400"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}