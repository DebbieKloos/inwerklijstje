import { defaultChecklist } from "./defaultChecklist";

interface ChecklistItem {
  dag: string;
  taak: string;
  owner: string;
}

export function generateChecklist(
  functie: string,
  startdatum: string,
  taken: string[],
  notities: string
) {
  // Basisregels
  const checklist: ChecklistItem[] = [];

  // Voeg standaard inwerklijst toe
  defaultChecklist.forEach(section => {
    // vaste taken toevoegen
    section.tasks.forEach(task => {
      checklist.push({
        dag: section.title,
        taak: task,
        owner: "" // leeg, want owner gebruiken we niet meer
      });
    });

    // notities-blok: splitsen op ;
    if (section.title === "Mijn aantekeningen" && notities) {
      notities.split(";").forEach(note => {
        if (note.trim()) {
          checklist.push({
            dag: section.title,
            taak: note.trim(),
            owner: ""
          });
        }
      });
    }
  });

  // Extra: functie (indien ingevuld)
  if (functie) {
    checklist.push({
      dag: "Stap 1 – welkom & basis",
      taak: `Introductie van functie: ${functie}`,
      owner: ""
    });
  }

  // Extra: losse taken uit formulier
  taken.forEach(t => {
    checklist.push({
      dag: "Stap 3 – eerste stappen in het werk",
      taak: t,
      owner: ""
    });
  });

  return checklist;
}
