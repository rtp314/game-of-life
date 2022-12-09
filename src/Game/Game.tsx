import React, { useState, useRef } from 'react';
import './Game.css';
import Grid from './Grid';
import useGameStep from './useGameStep';
import debounce from '../util/debounce';

const maxGridSize = 100;
const minGridSize = 10;
const defaultGridSize = 20;

export default function Game() {
  const [width, setWidth] = useState(defaultGridSize);
  const [height, setHeight] = useState(defaultGridSize);
  const [outputWidth, setOutputWidth] = useState(defaultGridSize);
  const [outputHeight, setOutputHeight] = useState(defaultGridSize);
  const { cells, setCell, stepGame, startGame, stopGame, clearCells, onDrop } = useGameStep(outputWidth, outputHeight);

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
    <div className="game">
      <h1>Conway's Game of Life</h1>
      <Grid cells={cells} setCell={setCell} onDrop={onDrop} />
      <button onClick={stepGame}>Step</button>
      <button onClick={startGame}>Start</button>
      <button onClick={stopGame}>Stop</button>
      <button onClick={clearCells}>Clear</button>

      <input type="number" value={width} onChange={handleSetWidth} />
      <input type="number" value={height} onChange={handleSetHeight} />
    </div>
  );
}
