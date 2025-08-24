import React, { useState } from 'react';
import ChecklistOutput from './ChecklistOutput';

function InputWizard() {
  const [formData, setFormData] = useState({
    functie: '',
    startdatum: '',
    taken: ['', '', ''],
  });

  const [showOutput, setShowOutput] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index?: number) => {
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
    setShowOutput(true);
  };

  return (
    <div className="p-4">
      {!showOutput ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <h1 className="text-2xl font-bold">Slim Inwerklijstje</h1>

          <input
            type="text"
            name="functie"
            placeholder="Functie nieuwe medewerker"
            value={formData.functie}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />

          <input
            type="date"
            name="startdatum"
            value={formData.startdatum}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />

          {formData.taken.map((taak, i) => (
            <input
              key={i}
              type="text"
              name="taak"
              placeholder={`Taak ${i + 1}`}
              value={taak}
              onChange={(e) => handleChange(e, i)}
              className="w-full p-2 border rounded"
            />
          ))}

          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Maak mijn inwerklijstje
          </button>
        </form>
      ) : (
        <ChecklistOutput
          functie={formData.functie}
          startdatum={formData.startdatum}
          taken={formData.taken}
        />
      )}
    </div>
  );
}

export default InputWizard;
