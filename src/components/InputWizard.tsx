import { generateChecklist } from '@/lib/sorter'
import React, { useState } from 'react'

interface InputWizardProps {
  onSubmit: (data: any) => void
}

function InputWizard({ onSubmit }: InputWizardProps) {
  const [functie, setFunctie] = useState('')
  const [startdatum, setStartdatum] = useState('')
  const [taken, setTaken] = useState(['', '', ''])

  const handleTaskChange = (index: number, value: string) => {
    const newTaken = [...taken]
    newTaken[index] = value
    setTaken(newTaken)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const bullets = taken.filter(t => t.trim().length > 0)
    const checklist = generateChecklist(bullets, startdatum)
    onSubmit(checklist)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block mb-1">Functie nieuwe medewerker</label>
        <input
          type="text"
          value={functie}
          onChange={(e) => setFunctie(e.target.value)}
          placeholder="Bijv. Verkoper, Kassamedewerker, Barista"
          className="border p-2 rounded w-full"
        />
      </div>

      <div>
        <label className="block mb-1">Startdatum</label>
        <input
          type="date"
          value={startdatum}
          onChange={(e) => setStartdatum(e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div>

      <div>
        <label className="block mb-1">
          Wat zijn 3 dingen die de eerste week sowieso moeten gebeuren?
        </label>
        {taken.map((taak, index) => (
          <input
            key={index}
            type="text"
            value={taak}
            onChange={(e) => handleTaskChange(index, e.target.value)}
            placeholder={`Taak ${index + 1}`}
            className="border p-2 rounded w-full mb-2"
          />
        ))}
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Maak mijn inwerklijstje
      </button>
    </form>
  )
}

export default InputWizard
