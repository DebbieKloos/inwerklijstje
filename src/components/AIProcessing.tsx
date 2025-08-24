import React, { useEffect, useState } from 'react'
import { Loader2 } from 'lucide-react'

interface AIProcessingProps {
  onComplete: () => void
}

function AIProcessing({ onComplete }: AIProcessingProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 2
      })
    }, 50)

    const timer = setTimeout(() => {
      onComplete()
    }, 3000)

    return () => {
      clearInterval(interval)
      clearTimeout(timer)
    }
  }, [onComplete])

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-2xl text-center">
        <div className="bg-white rounded-2xl shadow-xl p-12">
          <div className="mb-8">
            <Loader2 className="w-16 h-16 text-blue-600 animate-spin mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-slate-900 mb-4">
              AI maakt je inwerklijstje...
            </h1>
            <p className="text-lg text-slate-600 mb-8">
              We hebben je input omgezet naar een logisch en warm stappenplan.
            </p>
          </div>

          <div className="mb-8">
            <div className="w-full bg-slate-200 rounded-full h-3">
              <div 
                className="bg-blue-600 h-3 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-sm text-slate-500 mt-2">{progress}% voltooid</p>
          </div>

          {progress === 100 && (
            <button
              onClick={onComplete}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-4 px-8 rounded-lg transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Bekijk mijn lijstje
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default AIProcessing