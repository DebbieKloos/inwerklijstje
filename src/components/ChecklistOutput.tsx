import React from 'react';

interface ChecklistItem {
  dag: string;
  taak: string;
  owner: string;
}

interface ChecklistOutputProps {
  checklist: ChecklistItem[];
}

function ChecklistOutput({ checklist }: ChecklistOutputProps) {
  if (!checklist || checklist.length === 0) {
    return <p>Geen checklist beschikbaar.</p>;
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="mt-6 border p-4 rounded bg-white shadow">
      <h2 className="text-lg font-bold mb-4">Jouw Inwerklijstje</h2>
      {checklist.map((item, idx) => (
        <div key={idx} className="mb-2">
          <strong>{item.dag}:</strong> {item.taak} <br />
          <span className="text-sm text-gray-600">Owner: {item.owner}</span>
        </div>
      ))}

      <button
        onClick={handlePrint}
        className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Print deze lijst
      </button>
    </div>
  );
}

export default ChecklistOutput;
