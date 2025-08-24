import React from 'react';

interface ChecklistOutputProps {
  functie: string;
  startdatum: string;
  taken: string[];
}

const ChecklistOutput: React.FC<ChecklistOutputProps> = ({ functie, startdatum, taken }) => {
  return (
    <div className="p-4 border rounded bg-white shadow">
      <h2 className="text-xl font-bold mb-4">Inwerklijstje voor {functie}</h2>
      <p className="mb-2 text-gray-600">Startdatum: {startdatum}</p>

      <div className="space-y-2">
        {taken && taken.length > 0 ? (
          taken.map((taak, index) => (
            <div
              key={index}
              className="p-2 border rounded bg-gray-50"
            >
              {taak.trim() !== '' ? taak : 'Nog geen taak ingevuld'}
            </div>
          ))
        ) : (
          <p className="text-gray-500">Geen taken ingevoerd.</p>
        )}
      </div>

      <button
        onClick={() => window.print()}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Print deze lijst
      </button>
    </div>
  );
};

export default ChecklistOutput;
