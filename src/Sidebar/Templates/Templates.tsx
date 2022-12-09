import React from 'react';
import { CellArray } from '../../util/types';
import patterns from './patterns';

export default function Templates() {
  function handleDragStart(event: React.DragEvent, pattern: CellArray) {
    event.dataTransfer.setData('text', JSON.stringify(pattern));
    event.dataTransfer.effectAllowed = 'copy';
  }

  return (
    <>
      {patterns.map(pattern => (
        <React.Fragment key={pattern.name}>
          <h2>{pattern.name}</h2>
          <div className="template" draggable="true" onDragStart={event => handleDragStart(event, pattern.pattern)}>
            Drag and Drop
          </div>
        </React.Fragment>
      ))}
    </>
  );
}
