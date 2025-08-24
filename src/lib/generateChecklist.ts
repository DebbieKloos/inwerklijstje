export interface ChecklistItem {
  periode: string;
  tasks: string[];
}

export function generateChecklist(tasks: string[], startDate: string): ChecklistItem[] {
  // Basisindeling: eerste taak = Dag 1, tweede = Week 1, derde = Week 2
  const checklist: ChecklistItem[] = [
    { periode: "Dag 1", tasks: [] },
    { periode: "Week 1", tasks: [] },
    { periode: "Week 2", tasks: [] },
  ];

  if (tasks[0]) checklist[0].tasks.push(tasks[0]);
  if (tasks[1]) checklist[1].tasks.push(tasks[1]);
  if (tasks[2]) checklist[2].tasks.push(tasks[2]);

  // Debug info
  console.log("Checklist gemaakt voor startdatum:", startDate);

  return checklist;
}
