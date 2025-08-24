import React from 'react'

interface ChecklistItem {
  task: string
  bucket: string
  owner: string
  opener: string
}

interface ChecklistOutputProps {
  checklist: Record<string, ChecklistItem[]>
}

function ChecklistOutput({ checklist }: ChecklistOutputProps) {
  if (!checklist || Object.keys(checklist).length === 0) {
    return (
      <div className="mt-6 p-4 border rounded bg-gray-50 text-gray-600">
        Nog geen inwerklijstje gegenereerd.
      </div>
    )
  }

  return (
    <div className="mt-6 p-4 border rounded bg-white shadow" id="print-area">
      <h2 className="text-xl font-bold mb-4">Jouw Inwerklijstje</h2>

      {Object.entries(checklist).map(([fase, items]) => (
        <div key={fase} className="mb-4">
          <h3 className="text-lg font-semibold mb-2">{fase}</h3>
          <ul className="space-y-2">
            {items.map((item, index) => (
              <li key={index} className="border p-2 rounded">
                <div className="font-medium">{item.task}</div>
                <div className="text-sm text-gray-500">
                  {item.owner} · {item.opener}
                </div>
                <input type="checkbox" className="mt-1" />
              </li>
            ))}
          </ul>
        </div>
      ))}

      <div className="mt-4 flex justify-end">
        <button
          onClick={() => window.print()}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Print deze lijst
        </button>
      </div>
    </div>
  )
}

export default ChecklistOutput
