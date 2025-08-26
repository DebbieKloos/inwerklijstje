// ChecklistOutput.tsx
import React from "react";

interface ChecklistItem {
  dag: string;
  taak: string;
}

interface ChecklistOutputProps {
  checklist: ChecklistItem[];
}

export function ChecklistOutput({ checklist }: ChecklistOutputProps) {
  return (
    <div className="mt-6 border p-4 rounded bg-white shadow">
      <h2 className="text-lg font-bold mb-4">Jouw Inwerklijstje</h2>
      {checklist.map((item, idx) => (
        <div key={idx} className="mb-2">
          <strong>{item.dag}:</strong> {item.taak}
        </div>
      ))}
    </div>
  );
}
