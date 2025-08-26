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
        owner: "" // leeg, want owner gebruiken we n
