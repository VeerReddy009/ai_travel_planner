import Navbar from "../components/Navbar";
import CreateTripForm from "../components/CreateTripForm";

export default function CreateTrip() {
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-950 text-white p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">
            Create New Trip
          </h1>

          <p className="text-slate-400 mb-8">
            Generate an AI-powered travel itinerary.
          </p>

          <CreateTripForm />
        </div>
      </div>
    </>
  );
}