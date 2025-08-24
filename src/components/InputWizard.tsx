import React, { useState } from 'react'
import { generateChecklist } from '../lib/sorter'
import { FormData } from '../App'

interface InputWizardProps {
  onSubmit: (data: any) => void
}

function InputWizard({ onSubmit }: InputWizardProps) {
  const [formData, setFormData] = useState<FormData>({
    functie: '',
    startdatum: '',
    taken: ['', '', '']
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index?: number) => {
    const { name, value } = e.target
    if (name === 'taak' && index !== undefined) {
      const newTaken = [...formData.taken]
      newTaken[index] = value
      setFormData({ ...formData, taken: newTaken })
    } else {
      setFormData({ ...formData, [name]: value })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Maak een checklist met de ingevulde data
    const checklist = generateChecklist(formData.taken, formData.startdatum)
    // Geef het resultaat door aan de parent (App.tsx)
    onSubmit({ ...formData, checklist })
  }

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
          className="mt-1 block w-full rounded border px-2 py-1"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Startdatum</label>
        <input
          type="date"
          name="startdatum"
          value={formData.startdatum}
          onChange={handleChange}
          className="mt-1 block w-full rounded border px-2 py-1"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Wat zijn 3 dingen die de eerste week sowieso moeten gebeuren?</label>
        {formData.taken.map((taak, i) => (
          <input
            key={i}
            type="text"
            name="taak"
            value={taak}
            onChange={(e) => handleChange(e, i)}
            placeholder={`Taak ${i + 1}`}
            className="mt-1 block w-full rounded border px-2 py-1"
          />
        ))}
      </div>

      <button
        type="submit"
        className="w-full rounded bg-blue-600 py-2 text-white font-semibold hover:bg-blue-700"
      >
        Maak mijn inwerklijstje
      </button>
    </form>
  )
}

export default InputWizard
