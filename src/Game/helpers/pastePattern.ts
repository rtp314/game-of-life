import { CellArray } from '../../util/types';

export default function pastePattern(cells: CellArray, pattern: CellArray, x: number, y: number): CellArray {
  return cells.map((column, i) => {
    if (i < x || i >= x + pattern.length) {
      return column;
    }
    const patternCol = pattern[i - x];
    return column.map((cell, j) => {
      if (j < y || j >= y + patternCol.length) return cell;
      return patternCol[j - y];
    });
  });
}
