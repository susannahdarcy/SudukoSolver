import React, { useState } from 'react';
import {
  range, map, each, split, toNumber, cloneDeep,
} from 'lodash-es';
import { ICell } from './types/ICell';
import loadExamples from './LoadExamples';
import {
  CheckTableButton,
  ClearTableButton,
  LoadTableButton,
  SolveTableButton,
} from './SudokuButtons';
import { SudokuTable } from './SudokuTable';

const basetable = map(range(9), () => {
  const row: ICell[] = [];
  each(range(9), () => {
    const cell: ICell = {
      value: 0,
      prefilled: false,
      index: 0,
      isInError: false,
    };

    row.push(cell);
  });
  return row;
});

// Convert 1D array to 2D array functions
function convert1DIndexTo2DIndex(index1D: number) { return [Math.floor(index1D / 9), index1D % 9]; }

function inputSudoku(sudokuString: string) {
  const inputtedTable = cloneDeep(basetable);
  const inputArray: number[] = map(split(sudokuString, ''), toNumber);

  each(inputArray, (value: number, i: number) => {
    const index: number[] = convert1DIndexTo2DIndex(i);
    inputtedTable[index[0]][index[1]] = {
      value,
      prefilled: value !== 0,
      index: i,
      isInError: false,
    };
  });

  return inputtedTable;
}

function Sudoku() {
  const firstSudokuString = loadExamples(0);
  const firstTable = inputSudoku(firstSudokuString);

  const [sudokuTable, setTable] = useState(firstTable);

  const getTableData = () => sudokuTable;

  const setTableData = (table: ICell[][]) => {
    setTable(table);
  };

  const [currentQuizNumber, setCurrentQuizNumber] = useState(0);

  const getCurrentQuiz = () => currentQuizNumber;

  const setCurrentQuiz = (quizNumber:number) => {
    setCurrentQuizNumber(quizNumber);
  };

  return (
    <div className="container w-168 mx-auto py-10">
      <div className="py-2 grid grid-cols-3">
        <LoadTableButton
          {... {
            getTableData, setTableData, getCurrentQuiz, setCurrentQuiz,
          }}
          classString="col-start-1 place-self-start font-mono"
        />

        <ClearTableButton
          {... { getTableData, setTableData }}
          classString="col-start-3 place-self-end font-mono"
        />
      </div>

      <SudokuTable
        {... { getTableData, setTableData }}
      />

      <div className="py-2 grid grid-cols-3">
        <SolveTableButton
          {... { getTableData, setTableData }}
          classString="col-start-1 place-self-start font-mono"
        />

        <CheckTableButton
          {... { getTableData, setTableData }}
          classString="col-start-3 place-self-end font-mono"
        />
      </div>
    </div>
  );
}

export { Sudoku, convert1DIndexTo2DIndex };
