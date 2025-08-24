import React, { useState } from 'react'
import { generateChecklist } from '../lib/sorter'

interface InputWizardProps {
  onSubmit: (checklist: string[]) => void
}

function InputWizard({ onSubmit }: InputWizardProps) {
  const [functie, setFunctie] = useState('')
  const [startdatum, setStartdatum] = useState('')
  const [taken, setTaken] = useState(['', '', ''])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Maak bullets van de 3 losse taken
    const bullets = taken.filter((t) => t.trim() !== '')

    // Genereer checklist met slimme volgorde
    const checklist = generateChecklist(bullets, startdatum)

    // Geef door aan App
    onSubmit(checklist)
  }

  const updateTaak = (index: number, value: string) => {
    const nieuweTaken = [...taken]
    nieuweTaken[index] = value
    setTaken(nieuweTaken)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block font-medium">Functie nieuwe medewerker</label>
        <input
          type="text"
          value={functie}
          onChange={(e) => setFunctie(e.target.value)}
          placeholder="Bijv. Verkoper, Kassamedewerker, Barista"
          className="w-full border rounded p-2"
        />
      </div>

      <div>
        <label className="block font-medium">Startdatum</label>
        <input
          type="date"
          value={startdatum}
          onChange={(e) => setStartdatum(e.target.value)}
          className="w-full border rounded p-2"
        />
      </div>

      <div>
        <label className="block font-medium">
          Wat zijn 3 dingen die de eerste week sowieso moeten gebeuren?
        </label>
        {taken.map((taak, i) => (
          <input
            key={i}
            type="text"
            value={taak}
            onChange={(e) => updateTaak(i, e.target.value)}
            placeholder={`Taak ${i + 1}`}
            className="w-full border rounded p-2 mb-2"
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
  )
}

export default InputWizard
