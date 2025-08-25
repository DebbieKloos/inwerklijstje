export function generateChecklist(taken: string[], startDate: string, notities?: string) {
  const checklist: { dag: string; taken: string[] }[] = [];

  // Basisdagen/weken
  checklist.push({
    dag: "Dag 1",
    taken: ["Welkom & rondleiding", "Inloggegevens + kassasysteem instellen", ...taken.filter(t => t.trim() !== "")]
  });

  checklist.push({
    dag: "Week 1",
    taken: ["Eerste klantgesprek samen voeren", "Samen evalueren eind week", "Feedbackmoment plannen"]
  });

  checklist.push({
    dag: "Week 2",
    taken: ["Zelfstandig klantgesprek", "Evaluatiegesprek plannen"]
  });

  // Voeg notities toe als extra blok
  if (notities && notities.trim() !== "") {
    checklist.push({
      dag: "Opmerkingen ondernemer",
      taken: notities.split('\n').map(line => line.trim()).filter(line => line !== "")
    });
  }

  return checklist;
}
