import { useState } from "react";

export default function ItineraryCard({
  itinerary,
  onAddActivity,
  onRemoveActivity,
  onRegenerateDay,
}) {
  const [activityName, setActivityName] =
    useState("");

  return (
    <div className="bg-slate-900 rounded-xl p-6">
      <h2 className="text-2xl font-bold mb-6">
        Travel Itinerary
      </h2>

      <div className="space-y-8">
        {itinerary?.map((day) => (
          <div
            key={day.dayNumber}
            className="border-l-4 border-blue-500 pl-5"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">
                Day {day.dayNumber}
              </h3>

              <button
                onClick={() =>
                  onRegenerateDay(
                    day.dayNumber
                  )
                }
                className="bg-yellow-600 hover:bg-yellow-700 px-3 py-2 rounded text-sm"
              >
                Regenerate Day
              </button>
            </div>

            <div className="space-y-3">
              {day.activities?.map(
                (
                  activity,
                  index
                ) => (
                  <div
                    key={index}
                    className="bg-slate-800 rounded-lg p-4"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold">
                          {
                            activity.title
                          }
                        </h4>

                        <p className="text-slate-400 text-sm mt-2">
                          {
                            activity.description
                          }
                        </p>

                        <p className="text-green-400 mt-2">
                          {activity.estimatedCostUSD >
                          0
                            ? `$${activity.estimatedCostUSD}`
                            : "Free"}
                        </p>
                      </div>

                      <div className="flex flex-col gap-2 items-end">
                        <span className="text-xs bg-blue-600 px-2 py-1 rounded">
                          {
                            activity.timeOfDay
                          }
                        </span>

                        <button
                          onClick={() =>
                            onRemoveActivity(
                              day.dayNumber,
                              index
                            )
                          }
                          className="bg-red-600 hover:bg-red-700 px-2 py-1 rounded text-xs"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>

            <div className="mt-4 flex gap-2">
              <input
                type="text"
                placeholder="New Activity"
                value={activityName}
                onChange={(e) =>
                  setActivityName(
                    e.target.value
                  )
                }
                className="bg-slate-800 px-3 py-2 rounded w-full"
              />

              <button
                onClick={() => {
                  if (
                    !activityName.trim()
                  )
                    return;

                  onAddActivity(
                    day.dayNumber,
                    activityName
                  );

                  setActivityName("");
                }}
                className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
              >
                Add
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

