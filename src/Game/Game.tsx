import { useState } from 'react';
import './Game.scss';
import Grid from './Grid';
import useGameStep from './useGameStep';
import Controls from './Controls';
import { defaultGridSize } from './defaults';

export default function Game() {
  const [outputWidth, setOutputWidth] = useState(defaultGridSize);
  const [outputHeight, setOutputHeight] = useState(defaultGridSize);
  const { cells, setCell, stepGame, startGame, stopGame, clearCells, onDrop } = useGameStep(outputWidth, outputHeight);

  return (
    <div className="game">
      <h1>Conway's Game of Life</h1>
      <Grid cells={cells} setCell={setCell} onDrop={onDrop} />
      <Controls
        setOutputWidth={setOutputWidth}
        setOutputHeight={setOutputHeight}
        stepGame={stepGame}
        startGame={startGame}
        stopGame={stopGame}
        clearCells={clearCells}
      />
    </div>
  );
}
