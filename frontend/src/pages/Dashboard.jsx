import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";

import { getTrips } from "../services/tripService";

import { Link } from "react-router-dom";

export default function Dashboard() {
  const [trips, setTrips] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadTrips();
  }, []);

  const loadTrips = async () => {
    try {
      const data = await getTrips();
      setTrips(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div
        className="min-h-screen relative bg-cover bg-center bg-no-repeat text-white"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1611183005275-f09e03e23673?q=80&w=1331&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        }}
      >
        <div className="absolute inset-0 bg-black/75"></div>

        <div className="relative z-10 p-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-between mb-8">
              <h1 className="text-4xl font-bold">
                Dashboard
              </h1>

              <Link
                to="/create-trip"
                className="bg-blue-600 px-5 py-2 rounded"
              >
                New Trip
              </Link>
            </div>

            {loading ? (
              <p>Loading...</p>
            ) : trips.length === 0 ? (
              <div className="bg-white/10 backdrop-blur-md border border-white/15 p-10 rounded-xl text-center">
                <h2 className="text-2xl mb-4">
                  No Trips Found
                </h2>

                <Link
                  to="/create-trip"
                  className="bg-blue-600 px-5 py-3 rounded"
                >
                  Create First Trip
                </Link>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {trips.map((trip) => (
                  <Link
                    key={trip._id}
                    to={`/trip/${trip._id}`}
                  >
                    <div className="bg-white/10 backdrop-blur-md border border-white/15 p-5 rounded-xl hover:bg-white/15 transition">
                      <h2 className="text-xl font-bold">
                        {trip.destination}
                      </h2>

                      <p className="text-slate-300">
                        {trip.durationDays} Days
                      </p>

                      <p className="text-slate-300">
                        {trip.budgetTier}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}