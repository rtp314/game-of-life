import Cell from './Cell';
import { CellArray } from '../util/types';
import { useCallback } from 'react';

interface IGridProps {
  cells: CellArray;
  setCell: (x: number, y: number, alive?: boolean) => void;
  onDrop: (data: string, x: number, y: number) => void;
}

export default function Grid({ cells, setCell, onDrop }: IGridProps) {
  const handleDrag = useCallback(
    function (x: number, y: number) {
      setCell(x, y, true);
    },
    [setCell],
  );

  return (
    <div className="game">
      <div className="row">
        {cells.map((column, x) => (
          <div className="column" key={`column${x}`}>
            {column.map((cell, y) => (
              <Cell
                key={`cell${x}${y}`}
                alive={cell}
                x={x}
                y={y}
                onClick={setCell}
                onDrag={handleDrag}
                onDrop={onDrop}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
