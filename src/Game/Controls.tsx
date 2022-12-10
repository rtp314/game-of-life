import { useState } from 'react';
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
  return (
    <div className="controls">
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
  );
}
