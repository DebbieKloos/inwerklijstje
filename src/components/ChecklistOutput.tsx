import React from 'react';

interface ChecklistItem {
  text: string;
  context: string;
  owner: string;
}

interface ChecklistOutputProps {
  checklist: Record<string, ChecklistItem[]>;
}

export default function ChecklistOutput({ checklist }: ChecklistOutputProps) {
  if (!checklist || Object.keys(checklist).length === 0) {
    return <p>Geen checklist beschikbaar.</p>;
  }

  return (
    <div className="mt-6 p-4 bg-white shadow rounded-lg print:p-0">
      {Object.entries(checklist).map(([fase, items]) => (
        <div key={fase} className="mb-6">
          <h3 className="text-lg font-semibold mb-2">{fase}</h3>
          <ul className="space-y-2">
            {items.map((item, idx) => (
              <li
                key={idx}
                className="border p-3 rounded-lg bg-gray-50 hover:bg-gray-100"
              >
                <p className="font-medium">{item.text}</p>
                <p className="text-sm text-gray-600 italic">
                  {item.context}
                </p>
                <p className="text-xs text-gray-500">Owner: {item.owner}</p>
              </li>
            ))}
          </ul>
        </div>
      ))}

      {/* Print knop */}
      <button
        onClick={() => window.print()}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 print:hidden"
      >
        Print deze lijst
      </button>
    </div>
  );
}
