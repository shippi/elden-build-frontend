export function getSelectedItems(items: any[], indices: number[]) {
    let selectedItems: any[] = new Array(indices.length).fill(null);

    indices.forEach((i, j) => {
      if (i > -1) {
        selectedItems[j] = items[i];
      }
     
    });

    return selectedItems;
}