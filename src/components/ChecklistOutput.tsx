// ChecklistOutput.tsx
import React, { useState } from "react";

interface ChecklistItem {
  dag: string;   // de titel van het blok
  taak: string;  // de taak binnen dat blok
}

interface ChecklistOutputProps {
  checklist: ChecklistItem[];
}

export function ChecklistOutput({ checklist }: ChecklistOutputProps) {
  // State om afgevinkte taken bij te houden
  const [checked, setChecked] = useState<{ [key: string]: boolean }>({});

  const toggleCheck = (key: string) => {
    setChecked(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Groepeer taken per "dag"/blok
  const grouped = checklist.reduce((acc: { [dag: string]: string[] }, item) => {
    if (!acc[item.dag]) acc[item.dag] = [];
    acc[item.dag].push(item.taak);
    return acc;
  }, {});

  return (
    <div className="mt-6 border p-4 rounded bg-white shadow">
      <h2 className="text-lg font-bold mb-4">Jouw Inwerklijstje</h2>

      {Object.entries(grouped).map(([dag, taken]) => (
        <div key={dag} className="mb-4">
          <h3 className="font-semibold text-gray-800 mb-2">{dag}</h3>
          <ul className="space-y-1">
            {taken.map((taak, idx) => {
              const key = `${dag}-${idx}`;
              return (
                <li key={key} className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={!!checked[key]}
                    onChange={() => toggleCheck(key)}
                  />
                  <span
                    className={checked[key] ? "line-through text-gray-500" : ""}
                  >
                    {taak}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}
