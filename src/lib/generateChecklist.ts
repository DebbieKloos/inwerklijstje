// generateChecklist.ts

// Zet de default checklist direct hier in plaats van apart bestand (of importeer als je defaultChecklist.ts gebruikt)
const defaultChecklist = [
  {
    title: "Voor de eerste werkdag",
    tasks: [
      "Welkomstmail met praktische info en een persoonlijk welkom.",
      "Korte introductie van het bedrijf (missie, waarden, sfeer, foto’s van het team).",
      "Planning voor de eerste week (tip: deel deze inwerklijst!)"
    ]
  },
  {
    title: "Stap 1 – welkom & basis",
    tasks: [
      "Persoonlijke ontvangst.",
      "Rondleiding en kennismaking met het team.",
      "Veiligheidsinstructies en praktische afspraken (pauzes, werktijden).",
      "Praktische zaken (laptop, telefoon, systemen, sleutels, kleding)."
    ]
  },
  {
    title: "Stap 2 – verbinding & inwerken",
    tasks: [
      "Kennismakingsgesprekken: wie doet wat in het team.",
      "Eerste deel van een taak zelfstandig uitvoeren en bespreken.",
      "Lunch of koffiemoment met het team.",
      "Uitleg van de belangrijkste werkwijzen of systemen."
    ]
  },
  {
    title: "Stap 3 – eerste stappen in het werk",
    tasks: [
      "Meelopen bij klantgesprek / productie / project.",
      "Eerste complete taak afronden en bespreken.",
      "Korte check-in: hoe gaat het, wat heb je nodig om je werk te kunnen doen?",
      "Terugblik eind week: wat ging goed, wat wil je nog leren?",
      "Vooruitblik komende week: acties, belangrijk om te onthouden."
    ]
  },
  {
    title: "Mijn aantekeningen",
    tasks: []
  }
];

interface ChecklistItem {
  dag: string;
  taak: string;
}

export function generateChecklist(
  functie: string,
  startdatum: string,
  taken: string[],
  notities: string
) {
  const checklist: ChecklistItem[] = [];

  // Voeg standaard inwerklijst toe
  defaultChecklist.forEach(section => {
    section.tasks.forEach(task => {
      checklist.push({
        dag: section.title,
        taak: task
      });
    });

    if (section.title === "Mijn aantekeningen" && notities) {
      notities.split(";").forEach(note => {
        if (note.trim()) {
          checklist.push({
            dag: section.title,
            taak: note.trim()
          });
        }
      });
    }
  });

  // Extra: functie (indien ingevuld)
  if (functie) {
    checklist.push({
      dag: "Stap 1 – welkom & basis",
      taak: `Introductie van functie: ${functie}`
    });
  }

  // Extra: losse taken uit formulier
  taken.forEach(t => {
    checklist.push({
      dag: "Stap 3 – eerste stappen in het werk",
      taak: t
    });
  });

  return checklist;
}
