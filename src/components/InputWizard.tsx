import React, { useState } from 'react';
import { FormData } from '../App';

interface InputWizardProps {
  onSubmit: (data: FormData) => void;
}

function InputWizard({ onSubmit }: InputWizardProps) {
  const [formData, setFormData] = useState<FormData>({
    functie: '',
    startdatum: '',
    taken: ['', '', ''],
    notities: ''
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index?: number
  ) => {
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
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block font-medium">Functie nieuwe medewerker</label>
        <input
          type="text"
          name="functie"
          placeholder="Bijv. Verkoper, Kassamedewerker, Barista"
          value={formData.functie}
          onChange={handleChange}
          className="mt-1 block w-full border rounded p-2"
        />
      </div>

      <div>
        <label className="block font-medium">Startdatum</label>
        <input
          type="date"
          name="startdatum"
          value={formData.startdatum}
          onChange={handleChange}
          className="mt-1 block w-full border rounded p-2"
        />
      </div>

      <div>
        <label className="block font-medium">
          Wat zijn 3 dingen die de eerste week sowieso moeten gebeuren?
        </label>
        {formData.taken.map((taak, index) => (
          <input
            key={index}
            type="text"
            name="taak"
            placeholder={`Taak ${index + 1}`}
            value={taak}
            onChange={(e) => handleChange(e, index)}
            className="mt-1 block w-full border rounded p-2"
          />
        ))}
      </div>

      <div>
        <label className="block font-medium">Aanvullende notities</label>
        <textarea
          name="notities"
          placeholder="Bijvoorbeeld: extra uitleg over product X, intro met team Y..."
          value={formData.notities}
          onChange={handleChange}
          className="mt-1 block w-full border rounded p-2"
          rows={4}
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
