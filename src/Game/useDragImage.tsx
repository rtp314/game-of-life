import { useRef } from 'react';
import { CellArray } from '../util/types';

/**
 * To use, call createPatternPreview with the pattern on dragstart. Make sure <DragImage /> is rendered somewhere in your component.
 * @returns createPatternPreview - function to be called with a CellArray on dragstart
 * @returns DragImage - react component to be rendered anywhere within your component
 */
export default function useDragImage() {
  const dragImageRef = useRef<HTMLDivElement>(null);

  function createPatternPreview(pattern: CellArray) {
    const preview = document.createElement('div');
    preview.classList.add('row');
    pattern.forEach(column => {
      const columnDiv = document.createElement('div');
      columnDiv.classList.add('column');
      column.forEach(cell => {
        const cellDiv = document.createElement('div');
        cellDiv.classList.add('cell');
        cellDiv.dataset.alive = cell.toString();
        columnDiv.append(cellDiv);
      });
      preview.append(columnDiv);
    });
    dragImageRef.current?.append(preview);
    return preview;
  }

  function DragImage() {
    return (
      <div
        style={{ display: 'fixed', top: '0px', left: '0px', transform: 'translateX(-200%)' }}
        ref={dragImageRef}
      ></div>
    );
  }

  return { createPatternPreview, DragImage };
}
