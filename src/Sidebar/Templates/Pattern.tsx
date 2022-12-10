import useDragImage from '../../Game/useDragImage';
import { CellArray } from '../../util/types';

interface IPatternProps {
  name: string;
  pattern: CellArray;
}

export default function Pattern({ name, pattern }: IPatternProps) {
  const { createPatternPreview, DragImage } = useDragImage();

  function handleDragStart(event: React.DragEvent, pattern: CellArray) {
    event.dataTransfer.setData('text', JSON.stringify(pattern));
    const patternDiv = createPatternPreview(pattern);
    event.dataTransfer.setDragImage(patternDiv, 0, 0);
    event.dataTransfer.effectAllowed = 'copy';
  }

  return (
    <>
      <h3>{name}</h3>
      <div className="pattern" draggable="true" onDragStart={event => handleDragStart(event, pattern)}>
        {pattern.map(column => (
          <div className="pattern-column">
            {column.map(cell => (
              <div className="pattern-cell" data-alive={cell}></div>
            ))}
          </div>
        ))}
      </div>
      <DragImage />
    </>
  );
}
