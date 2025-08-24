import React, { useState } from "react";
import InputWizard from "./components/InputWizard";
import ChecklistOutput from "./components/ChecklistOutput";
import { ChecklistItem } from "./lib/generateChecklist";
import "./App.css";

function App() {
  const [checklist, setChecklist] = useState<ChecklistItem[]>([]);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Slim Inwerklijstje
      </h1>

      {/* Inputgedeelte */}
      <InputWizard onChecklistGenerated={setChecklist} />

      {/* Outputgedeelte */}
      <ChecklistOutput checklist={checklist} />
    </div>
  );
}

export default App;
