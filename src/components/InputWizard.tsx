import React, { useState } from "react";
import { generateChecklist, ChecklistItem } from "../lib/generateChecklist";

interface InputWizardProps {
  onChecklistGenerated: (checklist: ChecklistItem[]) => void;
}

function InputWizard({ onChecklistGenerated }: InputWizardProps) {
  const [functie, setFunctie] = useState("");
  const [startdatum, setStartdatum] = useState("");
  const [taken, setTaken] = useState(["", "", ""]);

  const handleTaskChange = (index: number, value: string) => {
    const nieuweTaken = [...taken];
    nieuweTaken[index] = value;
    setTaken(nieuweTaken);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Genereer checklist op basis van de ingevoerde data
    const checklist = generateChecklist(taken, startdatum);
    onChecklistGenerated(checklist);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-bold">Slim Inwerklijstje</h2>

      <div>
        <label className="block text-sm font-medium">Functie nieuwe medewerker</label>
        <input
          type="text"
          value={functie}
          onChange={(e) => setFunctie(e.target.value)}
          placeholder="Bijv. Verkoper, Kassamedewerker"
          className="mt-1 block w-full border rounded p-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Startdatum</label>
        <input
          type="date"
          value={startdatum}
          onChange={(e) => setStartdatum(e.target.value)}
          className="mt-1 block w-full border rounded p-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">
          Wat zijn 3 dingen die de eerste week sowieso moeten gebeuren?
        </label>
        {taken.map((taak, index) => (
          <input
            key={index}
            type="text"
            value={taak}
            onChange={(e) => handleTaskChange(index, e.target.value)}
            placeholder={`Taak ${index + 1}`}
            className="mt-1 block w-full border rounded p-2"
          />
        ))}
      </div>

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
