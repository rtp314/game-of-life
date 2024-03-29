import { useCallback, useEffect, useRef, useState } from 'react';
import { CellArray } from '../util/types';
import pastePattern from './helpers/pastePattern';

export default function useGameLogic(width: number, height: number) {
  const [cells, setCells] = useState<CellArray>(Array(width).fill(Array(height).fill(false)));
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    clearCells();
  }, [width, height]);

  function getNumberOfNeighbours(cells: CellArray, x: number, y: number) {
    let numberOfNeighbours = 0;
    if (cells[x - 1]?.[y - 1]) numberOfNeighbours++;
    if (cells[x]?.[y - 1]) numberOfNeighbours++;
    if (cells[x + 1]?.[y - 1]) numberOfNeighbours++;
    if (cells[x - 1]?.[y]) numberOfNeighbours++;
    if (cells[x + 1]?.[y]) numberOfNeighbours++;
    if (cells[x - 1]?.[y + 1]) numberOfNeighbours++;
    if (cells[x]?.[y + 1]) numberOfNeighbours++;
    if (cells[x + 1]?.[y + 1]) numberOfNeighbours++;
    return numberOfNeighbours;
  }

  function stepGame() {
    setCells(oldCells =>
      oldCells.map((column, x) =>
        column.map((cell, y) => {
          const neighbours = getNumberOfNeighbours(oldCells, x, y);
          if (cell && (neighbours === 2 || neighbours === 3)) return true;
          if (!cell && neighbours === 3) return true;
          return false;
        }),
      ),
    );
  }

  const setCell = useCallback(
    function (x: number, y: number, alive?: boolean) {
      setCells(prev =>
        prev.map((column, i) => {
          if (i !== x) return column;

          const newColumn = [...column];
          if (alive) newColumn[y] = true;
          else newColumn[y] = !newColumn[y];
          return newColumn;
        }),
      );
    },
    [setCells],
  );

  function clearCells() {
    stopGame();
    setCells(Array(width).fill(Array(height).fill(false)));
  }

  function startGame() {
    if (intervalRef.current) return;
    intervalRef.current = setInterval(stepGame, 300);
  }

  function stopGame() {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }

  const onDrop = useCallback(
    function (data: string, x: number, y: number) {
      const pattern = JSON.parse(data);
      if (!Array.isArray(pattern)) return;
      setCells(prev => pastePattern(prev, pattern, x, y));
    },
    [setCells],
  );

  useEffect(() => {
    return stopGame;
  }, []);

  return { cells, setCell, stepGame, startGame, stopGame, clearCells, onDrop };
}
