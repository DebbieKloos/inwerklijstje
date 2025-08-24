// src/lib/sorter.ts

// Buckets en mapping
const keywords: Record<string, string[]> = {
  "Toegang": ["laptop", "toestel", "telefoon", "pas", "sleutel", "badge", "account", "login", "inloggen", "e-mail", "mailbox", "rooster", "planning", "agenda", "teams", "slack", "teamapp", "wifi", "licentie", "autorisatie", "kassa", "pos", "kassasysteem", "kleding", "werkkleding", "pbm"],
  "Veilig": ["veilig", "bhv", "vluchtroute", "calamiteit", "nood", "incident", "arbo", "ergonomie", "privacy", "avg", "dataveiligheid"],
  "De basis": ["procedure", "werkinstructie", "workflow", "productkennis", "kassa", "voorraad", "bestelling", "intake", "rapportage"],
  "Samen aan de slag": ["meedraaien", "meekijken", "buddy", "schaduwen", "overdracht", "dagstart", "dagafsluiting", "pauze", "ritme", "stand-up", "teamapp"],
  "Zelfstandig werken": ["solo", "alleen draaien", "verantwoordelijkheid", "afsluiten", "openen", "sleutelbeheer", "storingen", "escaleren", "coachen"],
  "Check-ins": ["evaluatie", "feedback", "1-op-1", "weekreview", "30/60/90", "doel", "doelen"]
};

// Default owners en openers
const defaultOwners: Record<string, string> = {
  "Toegang": "Leidinggevende/IT",
  "Veilig": "Leidinggevende/BHV",
  "De basis": "Mentor",
  "Samen aan de slag": "Mentor/Leidinggevende",
  "Zelfstandig werken": "Leidinggevende",
  "Check-ins": "Leidinggevende"
};

const openers: Record<string, string> = {
  "Toegang": "We zorgen dat je vandaag overal in kunt.",
  "Veilig": "Zo werken we veilig samen.",
  "De basis": "Dit heb je nodig voor je dagelijkse taken.",
  "Samen aan de slag": "Dit verwachten we van elkaar.",
  "Zelfstandig werken": "Op je eigen tempo, met hulp waar dat nodig is.",
  "Check-ins": "Laat ons weten hoe het gaat en wat je nodig hebt."
};

// Functie
export function generateChecklist(rawBullets: string[], startDate?: string) {
  const groups: Record<string, any[]> = { "Dag 1": [], "Week 1": [], "Week 2": [] };

  rawBullets
    .map(b => b.trim())
    .filter(b => b.length > 0)
    .forEach(bullet => {
      const bucket = Object.entries(keywords).find(([_, words]) =>
        words.some(w => bullet.toLowerCase().includes(w))
      )?.[0] || "De basis";

      const when =
        bucket === "Toegang" || bucket === "Veilig" ? "Dag 1" :
        bucket === "De basis" || bucket === "Samen aan de slag" ? "Week 1" :
        "Week 2";

      groups[when].push({
        task: bullet,
        bucket,
        owner: defaultOwners[bucket],
        opener: openers[bucket]
      });
    });

  // Voeg quick win toe als die ontbreekt
  if (!groups["Dag 1"].some(i => i.task.toLowerCase().includes("quick win"))) {
    groups["Dag 1"].push({
      task: "Quick win met buddy",
      bucket: "Samen aan de slag",
      owner: "Mentor",
      opener: "Samen even oefenen voor een eerste succesmoment."
    });
  }

  return groups;
}

