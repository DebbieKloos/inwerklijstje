export interface ChecklistItem {
  periode: string;
  tasks: string[];
}

export function generateChecklist(bullets: string[], startDate: string): ChecklistItem[] {
  const checklist: ChecklistItem[] = [
    { periode: "Dag 1", tasks: [] },
    { periode: "Week 1", tasks: [] },
    { periode: "Week 2", tasks: [] },
  ];

  bullets.forEach((bullet, index) => {
    if (index === 0) checklist[0].tasks.push(bullet);        // altijd Dag 1
    else if (index === 1) checklist[1].tasks.push(bullet);   // tweede naar Week 1
    else checklist[2].tasks.push(bullet);                    // rest naar Week 2
  });

  console.log("Checklist gemaakt voor startdatum:", startDate);
  return checklist;
}
