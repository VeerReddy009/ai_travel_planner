import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import ItineraryCard from "../components/ItineraryCard";
import PackingList from "../components/PackingList";
import BudgetSummary from "../components/BudgetSummary";
import HotelRecommendations from "../components/HotelRecommendations";

import {
  getTrip,
  deleteTrip,
  addActivity,
  removeActivity,
  regenerateDay,
} from "../services/tripService";

export default function TripDetails() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [trip, setTrip] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchTrip();
  }, []);

  const fetchTrip = async () => {
    try {
      const data =
        await getTrip(id);

      setTrip(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete =
    async () => {
      const confirmDelete =
        window.confirm(
          "Delete this trip?"
        );

      if (!confirmDelete) return;

      try {
        await deleteTrip(id);

        navigate("/dashboard");
      } catch (err) {
        console.log(err);
      }
    };

  const handleAddActivity = async (
    dayNumber,
    activityName
  ) => {
    try {
      const activity = {
        title: activityName,
        description: activityName,
        estimatedCostUSD: 0,
        timeOfDay: "Morning",
      };

      const data = await addActivity(id, {
        dayNumber,
        activity,
      });

      setTrip(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleRemoveActivity = async (
    dayNumber,
    activityIndex
  ) => {
    try {
      const data = await removeActivity(id, {
        dayNumber,
        activityIndex,
      });

      setTrip(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleRegenerateDay = async (
    dayNumber
  ) => {
    try {
      const data = await regenerateDay(id, dayNumber);

      setTrip(data);
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex justify-center items-center">
        Loading...
      </div>
    );
  }

  if (!trip) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex justify-center items-center">
        Trip Not Found
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-950 text-white p-6">
        <div className="max-w-7xl mx-auto">

          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold">
                {trip.destination}
              </h1>

              <p className="text-slate-400">
                {trip.durationDays} Days • {trip.budgetTier}
              </p>
            </div>

            <button
              onClick={handleDelete}
              className="bg-red-600 px-4 py-2 rounded"
            >
              Delete Trip
            </button>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">

            <div className="lg:col-span-2 space-y-6">

             <ItineraryCard
                itinerary={trip.itinerary}
                onAddActivity={handleAddActivity}
                onRemoveActivity={handleRemoveActivity}
                onRegenerateDay={handleRegenerateDay}
              />



            </div>

            <div className="space-y-6">

              <BudgetSummary
                budget={
                  trip.estimatedBudget
                }
              />

              <HotelRecommendations
                hotels={trip.hotels}
              />

              <PackingList
                packingList={
                  trip.packingList
                }
              />

            </div>

          </div>

        </div>
      </div>
    </>
  );
}