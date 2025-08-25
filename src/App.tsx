import React, { useState } from "react";
import InputWizard from "./components/InputWizard";
import ChecklistOutput from "./components/ChecklistOutput";
import { generateChecklist, ChecklistItem } from "./lib/generateChecklist";
import "./App.css";

export interface FormData {
  functie: string;
  startdatum: string;
  taken: string[];
  notities: string;
}

function App() {
  const [checklist, setChecklist] = useState<ChecklistItem[]>([]);

  const handleSubmit = (data: FormData) => {
    const { taken, startdatum, notities } = data;
    const result = generateChecklist(taken, startdatum, notities);
    setChecklist(result);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Slim Inwerklijstje
      </h1>

      <InputWizard onSubmit={handleSubmit} />
      <ChecklistOutput checklist={checklist} />
    </div>
  );
}

export default App;
