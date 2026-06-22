import { useState } from "react";

export default function PackingList({
  packingList,
}) {
  const [items, setItems] =
    useState(
      packingList || []
    );

  const toggleItem = (index) => {
    const updated = [...items];

    updated[index].isPacked =
      !updated[index].isPacked;

    setItems(updated);
  };

  return (
    <div className="bg-slate-900 p-6 rounded-xl">
      <h2 className="text-xl font-bold mb-4">
        Packing Assistant
      </h2>

      <div className="space-y-3">

        {items.map(
          (item, index) => (
            <div
              key={index}
              className="flex items-center gap-3"
            >
              <input
                type="checkbox"
                checked={
                  item.isPacked
                }
                onChange={() =>
                  toggleItem(index)
                }
              />

              <span
                className={
                  item.isPacked
                    ? "line-through text-slate-500"
                    : ""
                }
              >
                {item.item}
              </span>
            </div>
          )
        )}

      </div>
    </div>
  );
}