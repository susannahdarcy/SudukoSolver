import './App.css';
import React from 'react';
import Sudoku from './Sudoku';

function App() {
  return (
    <div className="p-10">
      <h1 className="text-4xl font-black font-mono text-center overline">
        Sudoku|Solver
      </h1>
      <Sudoku />
    </div>
  );
}

export default App;
