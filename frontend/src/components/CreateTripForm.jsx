import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { generateTrip } from "../services/tripService";

export default function CreateTripForm() {
  const navigate = useNavigate();

  const [destination, setDestination] =
    useState("");

  const [durationDays, setDurationDays] =
    useState(3);

  const [budgetTier, setBudgetTier] =
    useState("Medium");

  const [interests, setInterests] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const trip = await generateTrip({
        destination,
        durationDays,
        budgetTier,
        interests: interests
          .split(",")
          .map((i) => i.trim()),
      });

      navigate(`/trip/${trip._id}`);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Trip Generation Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-slate-900 rounded-xl p-6"
    >
      {error && (
        <p className="text-red-500 mb-4">
          {error}
        </p>
      )}

      <div className="mb-4">
        <label className="block mb-2">
          Destination
        </label>

        <input
          type="text"
          placeholder="Japan"
          className="w-full p-3 rounded bg-slate-800"
          value={destination}
          onChange={(e) =>
            setDestination(e.target.value)
          }
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2">
          Duration (Days)
        </label>

        <input
          type="number"
          min="1"
          max="30"
          className="w-full p-3 rounded bg-slate-800"
          value={durationDays}
          onChange={(e) =>
            setDurationDays(
              Number(e.target.value)
            )
          }
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2">
          Budget Tier
        </label>

        <select
          className="w-full p-3 rounded bg-slate-800"
          value={budgetTier}
          onChange={(e) =>
            setBudgetTier(e.target.value)
          }
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
      </div>

      <div className="mb-6">
        <label className="block mb-2">
          Interests
        </label>

        <input
          type="text"
          placeholder="Food, Hiking, Shopping"
          className="w-full p-3 rounded bg-slate-800"
          value={interests}
          onChange={(e) =>
            setInterests(e.target.value)
          }
        />
      </div>

      <button
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-lg"
      >
        {loading
          ? "Generating..."
          : "Generate Trip"}
      </button>
    </form>
  );
}