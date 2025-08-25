import React from "react";
import { ChecklistItem } from "../lib/generateChecklist";

interface ChecklistOutputProps {
  checklist: ChecklistItem[];
}

const ChecklistOutput: React.FC<ChecklistOutputProps> = ({ checklist }) => {
  if (!checklist || checklist.length === 0) {
    return (
      <div className="mt-6 p-4 border rounded bg-gray-50 text-gray-600">
        Nog geen inwerklijstje aangemaakt.
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="mt-6 p-4 border rounded bg-white shadow" id="print-area">
      <h2 className="text-xl font-bold mb-4">Jouw Inwerklijstje</h2>

      {checklist.map((item, i) => (
        <div key={i} className="mb-4">
          <h3 className="text-lg font-semibold mb-2">{item.dag}</h3>
          <ul className="list-disc pl-6 space-y-1">
            {item.taken.map((task, j) => (
              <li key={j} className="text-gray-800">
                {task}
              </li>
            ))}
          </ul>
        </div>
      ))}

      <div className="mt-4">
        <button
          onClick={handlePrint}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 print:hidden"
        >
          Print deze lijst
        </button>
      </div>
    </div>
  );
};

export default ChecklistOutput;
