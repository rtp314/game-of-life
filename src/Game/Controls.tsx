import React, { useRef, useState } from 'react';
import debounce from '../util/debounce';
import { defaultGridSize, maxGridSize, minGridSize } from './defaults';

interface IControlsProps {
  setOutputWidth: React.Dispatch<React.SetStateAction<number>>;
  setOutputHeight: React.Dispatch<React.SetStateAction<number>>;
  stepGame: () => void;
  startGame: () => void;
  stopGame: () => void;
  clearCells: () => void;
}

export default function Controls({
  setOutputWidth,
  setOutputHeight,
  stepGame,
  startGame,
  stopGame,
  clearCells,
}: IControlsProps) {
  const [width, setWidth] = useState(defaultGridSize);
  const [height, setHeight] = useState(defaultGridSize);
  const mouseStartX = useRef<number>(0);
  const mouseStartY = useRef<number>(0);
  const stickToMouse = useRef<boolean>(false);
  const controlsRef = useRef<HTMLDivElement>(null);

  function handleSetWidth(event: React.ChangeEvent<HTMLInputElement>) {
    const newWidth = Number(event.target.value);
    setWidth(newWidth);
    function adjustAndSet() {
      if (newWidth < minGridSize) setOutputWidth(minGridSize);
      else if (newWidth > maxGridSize) setOutputWidth(maxGridSize);
      else setOutputWidth(newWidth);
    }
    debounce(adjustAndSet);
  }

  function handleSetHeight(event: React.ChangeEvent<HTMLInputElement>) {
    const newHeight = Number(event.target.value);
    setHeight(newHeight);
    function adjustAndSet() {
      if (newHeight < minGridSize) setOutputHeight(minGridSize);
      else if (newHeight > maxGridSize) setOutputHeight(maxGridSize);
      else setOutputHeight(newHeight);
    }
    debounce(adjustAndSet);
  }

  function handleStartMove(event: React.MouseEvent) {
    mouseStartX.current = event.clientX;
    mouseStartY.current = event.clientY;
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', (event: MouseEvent) => {
      document.removeEventListener('mousemove', handleMouseMove);
    });
  }

  function handleMouseMove(event: MouseEvent) {
    if (controlsRef.current) {
      const movedXBy = event.clientX - mouseStartX.current;
      const movedYBy = event.clientY - mouseStartY.current;
      mouseStartX.current = event.clientX;
      mouseStartY.current = event.clientY;
      controlsRef.current.style.left = `${controlsRef.current.offsetLeft + movedXBy}px`;
      controlsRef.current.style.top = `${controlsRef.current.offsetTop + movedYBy}px`;
    }
  }

  return (
    <div className="controls">
      <div ref={controlsRef} className="moveable-controls" onMouseDown={handleStartMove}>
        <div className="controls-buttons">
          <button onClick={stepGame}>Step</button>
          <button onClick={startGame}>Start</button>
          <button onClick={stopGame}>Stop</button>
          <button onClick={clearCells}>Clear</button>
        </div>
        <div className="controls-inputs">
          <input type="number" value={width} onChange={handleSetWidth} />
          <input type="number" value={height} onChange={handleSetHeight} />
        </div>
      </div>
    </div>
  );
}
