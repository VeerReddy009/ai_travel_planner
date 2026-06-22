export default function BudgetSummary({
  budget,
}) {
  if (!budget) return null;

  return (
    <div className="bg-slate-900 p-6 rounded-xl">
      <h2 className="text-xl font-bold mb-4">
        Budget Summary
      </h2>

      <div className="space-y-3">

        <div className="flex justify-between">
          <span>Transport</span>
          <span>
            ${budget.transport || 0}
          </span>
        </div>

        <div className="flex justify-between">
          <span>Accommodation</span>
          <span>
            $
            {budget.accommodation ||
              0}
          </span>
        </div>

        <div className="flex justify-between">
          <span>Food</span>
          <span>
            ${budget.food || 0}
          </span>
        </div>

        <div className="flex justify-between">
          <span>Activities</span>
          <span>
            ${budget.activities || 0}
          </span>
        </div>

        <hr className="border-slate-700" />

        <div className="flex justify-between text-lg font-bold">
          <span>Total</span>
          <span>
            ${budget.total || 0}
          </span>
        </div>

      </div>
    </div>
  );
}