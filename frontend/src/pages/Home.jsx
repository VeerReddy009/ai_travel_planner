import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />

      <div
        className="min-h-screen relative bg-cover bg-center bg-no-repeat flex items-center justify-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1611183005275-f09e03e23673?q=80&w=1331&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/70"></div>

        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center text-white">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6">
            Plan Smarter.
            <br />
            Travel Better.
          </h1>

          <p className="text-lg md:text-2xl text-slate-200 max-w-3xl mx-auto mb-10">
            Generate personalized travel itineraries powered by AI.
            Discover attractions, estimate budgets, find hotels,
            and receive weather-aware packing recommendations
            in seconds.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
            <Link
              to="/register"
              className="bg-blue-600 hover:bg-blue-700 transition px-8 py-4 rounded-xl font-semibold text-lg shadow-lg"
            >
              Get Started Free
            </Link>

            <Link
              to="/login"
              className="border border-white hover:bg-white hover:text-black transition px-8 py-4 rounded-xl font-semibold text-lg"
            >
              Login
            </Link>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20">
              <div className="text-4xl mb-4">🗺️</div>

              <h3 className="text-xl font-bold mb-3">
                AI Itinerary Generator
              </h3>

              <p className="text-slate-300">
                Create detailed day-by-day travel plans
                tailored to your destination, interests,
                and budget.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20">
              <div className="text-4xl mb-4">💰</div>

              <h3 className="text-xl font-bold mb-3">
                Smart Budget Planning
              </h3>

              <p className="text-slate-300">
                Get realistic estimates for transport,
                accommodation, food, and activities
                before your trip begins.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20">
              <div className="text-4xl mb-4">🎒</div>

              <h3 className="text-xl font-bold mb-3">
                Packing Assistant
              </h3>

              <p className="text-slate-300">
                Receive weather-aware packing suggestions
                based on your destination and planned
                activities.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}