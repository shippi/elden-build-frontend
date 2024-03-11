export function getSelectedItems(items: any[], indices: number[]) {
    let selectedItems: any[] = new Array(indices.length).fill(null);

    indices.forEach((i, j) => {
      if (i > -1) {
        selectedItems[j] = items[i];
      }
     
    });

    return selectedItems;
}

export function calculateLevel(classLevel: number, levelStat: number, talismanLevels?: number[]) {
  let totalLevel = classLevel + levelStat;

  talismanLevels?.forEach(level => {
    if (level) totalLevel += level;
  })

  if (totalLevel > 99) return 99;
  else return totalLevel;
}