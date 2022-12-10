import { CellArray } from '../../util/types';

interface IPatternProps {
  name: string;
  pattern: CellArray;
}

export default function Pattern({ name, pattern }: IPatternProps) {
  function handleDragStart(event: React.DragEvent, pattern: CellArray) {
    event.dataTransfer.setData('text', JSON.stringify(pattern));
    event.dataTransfer.effectAllowed = 'copy';
  }

  return (
    <>
      <h2>{name}</h2>
      <div className="pattern" draggable="true" onDragStart={event => handleDragStart(event, pattern)}>
        <PatternPreview pattern={pattern} />
      </div>
    </>
  );
}

interface IPatternPreviewProps {
  pattern: CellArray;
}

function PatternPreview({ pattern }: IPatternPreviewProps) {
  return (
    <>
      {pattern.map(column => (
        <div className="pattern-column">
          {column.map(cell => (
            <div className="pattern-cell" data-alive={cell}></div>
          ))}
        </div>
      ))}
    </>
  );
}
