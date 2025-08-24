import React, { useState } from 'react'
import InputWizard from './components/InputWizard'
import AIProcessing from './components/AIProcessing'
import ChecklistOutput from './components/ChecklistOutput'

export interface FormData {
  functie: string
  startdatum: string
  taken: [string, string, string]
}

function App() {
  const [currentScreen, setCurrentScreen] = useState<'input' | 'processing' | 'checklist'>('input')
  const [formData, setFormData] = useState<FormData>({
    functie: '',
    startdatum: '',
    taken: ['', '', '']
  })

  const handleFormSubmit = (data: FormData) => {
    setFormData(data)
    setCurrentScreen('processing')
  }

  const handleProcessingComplete = () => {
    setCurrentScreen('checklist')
  }

  const handleNewEmployee = () => {
    setCurrentScreen('input')
    setFormData({
      functie: '',
      startdatum: '',
      taken: ['', '', '']
    })
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {currentScreen === 'input' && (
        <InputWizard onSubmit={handleFormSubmit} />
      )}
      {currentScreen === 'processing' && (
        <AIProcessing onComplete={handleProcessingComplete} />
      )}
      {currentScreen === 'checklist' && (
        <ChecklistOutput 
          formData={formData}
          onNewEmployee={handleNewEmployee}
        />
      )}
    </div>
  )
}

export default App