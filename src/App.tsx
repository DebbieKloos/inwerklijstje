import React, { useState } from 'react'
import InputWizard from './components/InputWizard'
import ChecklistOutput from './components/ChecklistOutput'
import './App.css'

function App() {
  const [checklist, setChecklist] = useState<string[]>([])

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Slim Inwerklijstje
      </h1>

      {/* Input gedeelte */}
      <InputWizard onSubmit={setChecklist} />

      {/* Output gedeelte */}
      <ChecklistOutput checklist={checklist} />
    </div>
  )
}

export default App
