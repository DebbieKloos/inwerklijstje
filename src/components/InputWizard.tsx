import React, { useState } from 'react';
import { generateChecklist } from '../lib/sorter';

interface InputWizardProps {
  onSubmit: (data: any) => void;
}

function InputWizard({ onSubmit }: InputWizardProps) {
  const [formData, setFormData] = useState({
    functie: '',
    startdatum: '',
    taken: ['', '', ''], // drie taakvelden
    notities: ''         // apart notitieveld
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index?: number) => {
    const { name, value } = e.target;
    if (name === 'taak' && index !== undefined) {
      const updatedTaken = [...formData.taken];
      updatedTaken[index] = value;
      setFormData({ ...formData, taken: updatedTaken });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const checklist = generateChecklist(formData.taken, formData.startdatum, formData.notities);
    onSubmit(checklist);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Functie nieuwe medewerker</label>
        <input
          type="text"
          name="functie"
          value={formData.functie}
          onChange={handleChange}
          placeholder="Bijv. Verkoper, Kassamedewerker, Barista"
          className="mt-1 block w-full border rounded p-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Startdatum</label>
        <input
          type="date"
          name="startdatum"
          value={formData.startdatum}
          onChange={handleChange}
          className="mt-1 block w-full border rounded p-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Wat zijn 3 dingen die de eerste week sowieso moeten gebeuren?</label>
        {formData.taken.map((taak, index) => (
          <input
            key={index}
            type="text"
            name="taak"
            value={taak}
            onChange={(e) => handleChange(e, index)}
            placeholder={`Taak ${index + 1}`}
            className="mt-1 block w-full border rounded p-2"
          />
        ))}
      </div>

      <div>
        <label className="block text-sm font-medium">Extra notities van de ondernemer</label>
        <textarea
          name="notities"
          value={formData.notities}
          onChange={handleChange}
          placeholder="Bijv. Dit zijn onze afspraken, zo werken we samen..."
          className="mt-1 block w-full border rounded p-2"
          rows={3}
        />
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
