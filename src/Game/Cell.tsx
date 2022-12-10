import React from 'react';

interface ICellProps {
  alive: boolean;
  onClick: (x: number, y: number) => void;
  onDrag: (x: number, y: number) => void;
  onDrop: (data: string, x: number, y: number) => void;
  x: number;
  y: number;
}

const element = document.createElement('div');

function Cell({ alive, onClick, onDrag, onDrop, x, y }: ICellProps) {
  function handleDragStart(event: React.DragEvent) {
    event.dataTransfer.setDragImage(element, 0, 0);
    event.dataTransfer.setData('text', 'none');
    event.dataTransfer.effectAllowed = 'link';
    onDrag(x, y);
  }
  function handleDragOver(event: React.DragEvent) {
    event.preventDefault();
    if (event.dataTransfer.effectAllowed === 'link') onDrag(x, y);
  }
  function handleDrop(event: React.DragEvent) {
    event.preventDefault();
    if (event.dataTransfer.effectAllowed === 'copy') {
      const data = event.dataTransfer.getData('text');
      onDrop(data, x, y);
    }
  }

  return (
    <div
      draggable="true"
      className="cell"
      data-alive={alive}
      onClick={() => onClick(x, y)}
      onDragOver={handleDragOver}
      onDragStart={handleDragStart}
      onDrop={handleDrop}
    />
  );
}

export default React.memo(Cell);
