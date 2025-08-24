import React from 'react';

interface ChecklistItem {
  periode: string;
  tasks: string[];
}

interface ChecklistOutputProps {
  checklist: ChecklistItem[];
  onPrint?: () => void;
}

const ChecklistOutput: React.FC<ChecklistOutputProps> = ({ checklist, onPrint }) => {
  if (!checklist || checklist.length === 0) {
    return <p>Geen checklist om te tonen.</p>;
  }

  return (
    <div>
      {checklist.map((item, i) => (
        <div key={i} style={{ marginBottom: '1rem' }}>
          <h3>{item.periode}</h3>
          <ul>
            {item.tasks.map((task, j) => (
              <li key={j}>{task}</li>
            ))}
          </ul>
        </div>
      ))}

      <button
        onClick={onPrint}
        style={{
          marginTop: '1rem',
          backgroundColor: '#2563eb',
          color: 'white',
          padding: '0.5rem 1rem',
          borderRadius: '0.25rem',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        Print deze lijst
      </button>
    </div>
  );
};

export default ChecklistOutput;
