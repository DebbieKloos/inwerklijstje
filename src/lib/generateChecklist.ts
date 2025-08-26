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

  if (functie) {
    checklist.push({
      dag: "Dag 1",
      taak: `Introductie van functie: ${functie}`,
      owner: "Leidinggevende"
    });
  }

  // Taken uit formulier
  taken.forEach((taak, i) => {
    if (taak.trim() !== '') {
      checklist.push({
        dag: `Week 1`,
        taak,
        owner: "Mentor"
      });
    }
  });

  // Extra notities als apart onderdeel
  if (notities.trim() !== '') {
    checklist.push({
      dag: "Opmerkingen ondernemer",
      taak: notities,
      owner: "Ondernemer"
    });
  }

  return checklist;
}
