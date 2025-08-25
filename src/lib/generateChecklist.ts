export function generateChecklist(
  taken: string[],
  startDate: string,
  notities?: string
) {
  const checklist: any[] = [];

  // Dag 1
  checklist.push({
    title: 'Dag 1',
    items: taken.filter((t) => t && t.trim() !== ''),
    owner: 'Mentor'
  });

  // Week 1
  checklist.push({
    title: 'Week 1',
    items: ['Eerste week samen afronden', 'Basisvaardigheden oefenen'],
    owner: 'Mentor'
  });

  // Week 2
  checklist.push({
    title: 'Week 2',
    items: ['Evaluatiegesprek plannen'],
    owner: 'Leidinggevende'
  });

  // Extra notities
  if (notities && notities.trim() !== '') {
    checklist.push({
      title: 'Opmerkingen ondernemer',
      items: [notities],
      owner: 'Ondernemer'
    });
  }

  return checklist;
}
