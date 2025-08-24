import React from 'react'

interface ChecklistOutputProps {
  checklist: string[]
}

function ChecklistOutput({ checklist }: ChecklistOutputProps) {
  if (!checklist || checklist.length === 0) {
    return (
      <div className="mt-6 p-4 border rounded bg-gray-50 text-gray-600">
        Nog geen inwerklijstje gegenereerd.
      </div>
    )
  }

  return (
    <div className="mt-6 p-4 border rounded bg-white shadow">
      <h2 className="text-lg font-bold mb-4">Jouw Inwerklijstje</h2>
      <ul className="space-y-2">
        {checklist.map((item, index) => (
          <li key={index} className="flex items-start">
            <span className="mr-2 text-blue-600 font-semibold">{index + 1}.</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <div className="mt-4">
        <button
          onClick={() => window.print()}
          className="rounded bg-green-600 px-4 py-2 text-white font-semibold hover:bg-green-700"
        >
          Print deze lijst
        </button>
      </div>
    </div>
  )
}

export default ChecklistOutput
