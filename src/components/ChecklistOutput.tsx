import React from 'react';

interface ChecklistOutputProps {
  checklist: {
    title: string;
    items: string[];
    owner: string;
  }[];
  onPrint?: () => void;
}

function ChecklistOutput({ checklist, onPrint }: ChecklistOutputProps) {
  if (!checklist || checklist.length === 0) {
    return <p className="text-gray-500">Geen checklist beschikbaar.</p>;
  }

  return (
    <div className="mt-6 p-4 border rounded bg-white shadow">
      <h2 className="text-lg font-semibold mb-4">Jouw Inwerklijstje</h2>
      {checklist.map((section, idx) => (
        <div key={idx} className="mb-4">
          <h3 className="font-bold">{section.title}</h3>
          <ul className="list-disc pl-6">
            {section.items.map((item, i) => (
              <li key={i} className="text-gray-700">
                {item} <span className="text-sm text-gray-500">(Owner: {section.owner})</span>
              </li>
            ))}
          </ul>
        </div>
      ))}

      <button
        onClick={onPrint}
        className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Print deze lijst
      </button>
    </div>
  );
}

export default ChecklistOutput;
