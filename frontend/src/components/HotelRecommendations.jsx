export default function HotelRecommendations({
  hotels,
}) {
  return (
    <div className="bg-slate-900 p-6 rounded-xl">
      <h2 className="text-xl font-bold mb-4">
        Hotels
      </h2>

      <div className="space-y-4">

        {hotels?.length > 0 ? (
          hotels.map(
            (hotel, index) => (
              <div
                key={index}
                className="bg-slate-800 p-4 rounded-lg"
              >
                <h3 className="font-semibold">
                  {hotel.name}
                </h3>

                <p className="text-slate-400 text-sm">
                  {hotel.tier}
                </p>

                <p className="text-yellow-400">
                  {hotel.rating}
                </p>

                <p className="text-green-400">
                  $
                  {
                    hotel.estimatedCostNightUSD
                  }
                  /night
                </p>
              </div>
            )
          )
        ) : (
          <p>No Hotels Found</p>
        )}

      </div>
    </div>
  );
}