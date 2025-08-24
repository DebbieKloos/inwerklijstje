import React, { useState } from 'react'
import { Check, Plus, Settings } from 'lucide-react'
import { FormData } from '../App'

interface ChecklistOutputProps {
  formData: FormData
  onNewEmployee: () => void
}

interface Task {
  id: string
  text: string
  completed: boolean
}

function ChecklistOutput({ formData, onNewEmployee }: ChecklistOutputProps) {
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', text: 'Dag 1: Welkom & rondleiding', completed: false },
    { id: '2', text: 'Dag 1: Inloggegevens + kassasysteem instellen', completed: false },
    { id: '3', text: 'Dag 2: Eerste klantgesprek samen voeren', completed: false },
    { id: '4', text: 'Dag 3: Veiligheidsinstructies & BHV-check', completed: false },
    { id: '5', text: 'Week 2: Evaluatiegesprek plannen', completed: false },
  ])

  const [showModal, setShowModal] = useState(false)

  const toggleTask = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ))
  }

  const completedCount = tasks.filter(task => task.completed).length
  const progressPercentage = (completedCount / tasks.length) * 100

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Jouw inwerklijstje
          </h1>
          <p className="text-xl text-slate-600 mb-6">
            Een logisch en warm inwerkproces, klaar voor gebruik.
          </p>
          
          <div className="bg-white rounded-lg p-4 inline-block shadow-sm">
            <p className="text-sm text-slate-600 mb-2">
              Voor: <span className="font-medium">{formData.functie}</span> • 
              Start: <span className="font-medium">{new Date(formData.startdatum).toLocaleDateString('nl-NL')}</span>
            </p>
            <div className="w-64 bg-slate-200 rounded-full h-2">
              <div 
                className="bg-green-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              {completedCount} van {tasks.length} taken voltooid
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="space-y-4">
            {tasks.map((task) => (
              <div 
                key={task.id}
                className={`flex items-center p-4 rounded-lg border-2 transition-all cursor-pointer hover:bg-slate-50 ${
                  task.completed 
                    ? 'border-green-200 bg-green-50' 
                    : 'border-slate-200 hover:border-slate-300'
                }`}
                onClick={() => toggleTask(task.id)}
              >
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-4 transition-all ${
                  task.completed 
                    ? 'border-green-500 bg-green-500' 
                    : 'border-slate-300 hover:border-slate-400'
                }`}>
                  {task.completed && <Check className="w-4 h-4 text-white" />}
                </div>
                <span className={`flex-1 text-lg ${
                  task.completed 
                    ? 'text-green-700 line-through' 
                    : 'text-slate-700'
                }`}>
                  {task.text}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onNewEmployee}
            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-4 px-6 rounded-lg transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <Plus className="w-5 h-5" />
            Nieuwe medewerker toevoegen
          </button>
          
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center justify-center gap-2 bg-slate-600 hover:bg-slate-700 text-white font-medium py-4 px-6 rounded-lg transition-colors focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
          >
            <Settings className="w-5 h-5" />
            Aanpassen
          </button>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full">
            <h3 className="text-xl font-bold text-slate-900 mb-4">
              Aanpassen
            </h3>
            <p className="text-slate-600 mb-6">
              Pas lijstje eenvoudig aan (beschikbaar in volgende versie)
            </p>
            <button
              onClick={() => setShowModal(false)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
            >
              Sluiten
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ChecklistOutput