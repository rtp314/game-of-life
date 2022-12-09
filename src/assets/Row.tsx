import Cell from '../Game/Cell';

interface IRowProps {
  width: number;
  cells: boolean[];
  x: number;
}

export default function Row({ width, cells, x }: IRowProps) {
  return (
    <div>
      {cells.map((cell, y) => (
        <Cell x={x} y={y} />
      ))}
    </div>
  );
}
