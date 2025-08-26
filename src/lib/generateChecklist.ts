// Zet de default checklist direct hier in plaats van apart bestand
const defaultChecklist = [
  {
    title: "Voor de eerste werkdag",
    tasks: [
      "Welkomstmail met praktische info en een persoonlijk welkom.",
      "Korte introductie van het bedrijf (missie, waarden, sfeer, foto’s van het team).",
      "Planning voor de eerste week (tip: deel deze inwerklijst!)"
    ],
    question: "Wat wil je dat de nieuwe medewerker al vóór dag 1 weet of ontvangt?"
  },
  {
    title: "Stap 1 – welkom & basis",
    tasks: [
      "Persoonlijke ontvangst.",
      "Rondleiding en kennismaking met het team.",
      "Veiligheidsinstructies en praktische afspraken (pauzes, werktijden).",
      "Praktische zaken (laptop, telefoon, systemen, sleutels, kleding)."
    ],
    question: "Wat wil jij zelf als ondernemer op dag 1 laten zien of regelen?"
  },
  {
    title: "Stap 2 – verbinding & inwerken",
    tasks: [
      "Kennismakingsgesprekken: wie doet wat in het team.",
      "Eerste deel van een taak zelfstandig uitvoeren en bespreken.",
      "Lunch of koffiemoment met het team.",
      "Uitleg van de belangrijkste werkwijzen of systemen."
    ],
    question: "Wat kan het team doen om de nieuwe medewerker welkom te laten voelen?"
  },
  {
    title: "Stap 3 – eerste stappen in het werk",
    tasks: [
      "Meelopen bij klantgesprek / productie / project.",
      "Eerste complete taak afronden en bespreken.",
      "Korte check-in: hoe gaat het, wat heb je nodig om je werk te kunnen doen?",
      "Terugblik eind week: wat ging goed, wat wil je nog leren?",
      "Vooruitblik komende week: acties, belangrijk om te onthouden."
    ],
    question: "Welke eerste taken wil je de nieuwe medewerker laten doen?"
  },
  {
    title: "Mijn aantekeningen",
    tasks: [],
    question: "Welke aandachtspunten of ideeën wil je voor jezelf onthouden? (gebruik ';' om notities te scheiden)"
  }
];

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
  const checklist: ChecklistItem[] = [];

  // Voeg standaard inwerklijst toe
  defaultChecklist.forEach(section => {
    section.tasks.forEach(task => {
      checklist.push({
        dag: section.title,
        taak: task,
        owner: "" // owner laten we leeg
      });
    });

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

  // Extra:
