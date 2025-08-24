import React, { useState } from 'react'
import { FormData } from '../App'
import { testConnection, insertTest } from '../supabaseClient'

interface InputWizardProps {
  onSubmit: (data: FormData) => void
}

function InputWizard({ onSubmit }: InputWizardProps) {
  const [formData, setFormData] = useState<FormData>({
    functie: '',
    startdatum: '',
    taken: ['', '', '']
  })

  const [errors, setErrors] = useState<{
    functie?: string
    startdatum?: string
    taken?: string[]
  }>({})

  const validateForm = () => {
    const newErrors: typeof errors = {}
    
    if (!formData.functie.trim()) {
      newErrors.functie = 'Functie is verplicht'
    }
    
    if (!formData.startdatum) {
      newErrors.startdatum = 'Startdatum is verplicht'
    }
    
    const takenErrors: string[] = []
    formData.taken.forEach((taak, index) => {
      if (!taak.trim()) {
        takenErrors[index] = `Taak ${index + 1} is verplicht`
      }
    })
    
    if (takenErrors.length > 0) {
      newErrors.taken = takenErrors
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      onSubmit(formData)
    }
  }

  const updateTaak = (index: number, value: string) => {
    const newTaken = [...formData.taken] as [string, string, string]
    newTaken[index] = value
    setFormData({ ...formData, taken: newTaken })
  }

  const handleTestConnection = async () => {
    setIsTestingConnection(true)
    setTestResult('')
    try {
      const result = await testConnection()
      setTestResult(result)
    } catch (error) {
      setTestResult('Error: ' + (error as Error).message)
    } finally {
      setIsTestingConnection(false)
    }
  }

  const handleInsertTest = async () => {
    setIsTestingInsert(true)
    setTestResult('')
    try {
      const result = await insertTest()
      setTestResult(result)
    } catch (error) {
      setTestResult('Error: ' + (error as Error).message)
    } finally {
      setIsTestingInsert(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Welkom bij Inwerklijstje
          </h1>
          <p className="text-xl text-slate-600">
            In 10 minuten van losse briefjes naar een slim en warm inwerkproces.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Functie nieuwe medewerker
              </label>
              <input
                type="text"
                value={formData.functie}
                onChange={(e) => setFormData({ ...formData, functie: e.target.value })}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                  errors.functie ? 'border-red-300' : 'border-slate-300'
                }`}
                placeholder="Bijv. Verkoper, Kassamedewerker, Barista"
              />
              {errors.functie && (
                <p className="text-red-500 text-sm mt-1">{errors.functie}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Startdatum
              </label>
              <input
                type="date"
                value={formData.startdatum}
                onChange={(e) => setFormData({ ...formData, startdatum: e.target.value })}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                  errors.startdatum ? 'border-red-300' : 'border-slate-300'
                }`}
              />
              {errors.startdatum && (
                <p className="text-red-500 text-sm mt-1">{errors.startdatum}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-4">
                Wat zijn 3 dingen die de eerste week sowieso moeten gebeuren?
              </label>
              <div className="space-y-4">
                {[0, 1, 2].map((index) => (
                  <div key={index}>
                    <input
                      type="text"
                      value={formData.taken[index]}
                      onChange={(e) => updateTaak(index, e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                        errors.taken?.[index] ? 'border-red-300' : 'border-slate-300'
                      }`}
                      placeholder={`Taak ${index + 1}`}
                    />
                    {errors.taken?.[index] && (
                      <p className="text-red-500 text-sm mt-1">{errors.taken[index]}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-4 px-6 rounded-lg transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Maak mijn inwerklijstje
            </button>
          </form>

          {/* Supabase Test Buttons */}
          <div className="mt-8 pt-8 border-t border-slate-200">
            <h3 className="text-lg font-medium text-slate-700 mb-4">Database Tests</h3>
            <div className="flex gap-4 mb-4">
              <button
                type="button"
                onClick={handleTestConnection}
                disabled={isTestingConnection}
                className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-medium py-3 px-4 rounded-lg transition-colors focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                {isTestingConnection ? 'Testing...' : 'Test Supabase'}
              </button>
              <button
                type="button"
                onClick={handleInsertTest}
                disabled={isTestingInsert}
                className="flex-1 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white font-medium py-3 px-4 rounded-lg transition-colors focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
              >
                {isTestingInsert ? 'Inserting...' : 'Insert Test'}
              </button>
            </div>
            {testResult && (
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                <h4 className="font-medium text-slate-700 mb-2">Test Result:</h4>
                <pre className="text-sm text-slate-600 whitespace-pre-wrap break-words">{testResult}</pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default InputWizard