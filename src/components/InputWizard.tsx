import React, { useState } from 'react';
import { generateChecklist, ChecklistItem } from '../lib/generateChecklist';

interface InputWizardProps {
  onChecklistGenerated: (checklist: ChecklistItem[]) => void;
}

function InputWizard({ onChecklistGenerated }: InputWizardProps) {
  const [functie, setFunctie] = useState('');
  const [startdatum, setStartdatum] = useState('');
  const [notities, setNotities] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Splits notities in regels
    const bullets = notities
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);

    // Maak gestructureerde checklist
    const checklist = generateChecklist(bullets, startdatum);
    onChecklistGenerated(checklist);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-bold">Slim Inwerklijstje</h2>

      <input
        type="text"
        placeholder="Functie nieuwe medewerker"
        value={functie}
        onChange={(e) => setFunctie(e.target.value)}
        className="w-full border rounded p-2"
      />

      <input
        type="date"
        value={startdatum}
        onChange={(e) => setStartdatum(e.target.value)}
        className="w-full border rounded p-2"
      />

      <textarea
        placeholder="Typ hier alles wat je wilt bespreken of regelen..."
        value={notities}
        onChange={(e) => setNotities(e.target.value)}
        className="w-full border rounded p-2 h-40"
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Maak mijn inwerklijstje
      </button>
    </form>
  );
}

export default InputWizard;
