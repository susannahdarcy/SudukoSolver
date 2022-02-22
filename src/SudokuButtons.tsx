import {
  cloneDeep, each, isEmpty, map, split, toNumber,
} from 'lodash-es';
import React from 'react';
import { convert1DIndexTo2DIndex } from './SudokuTable';
import { vaildateSudoku } from './SudokuValidater';
import { ISudokuTableAndQuizButton, ISudokuTableButton } from './types/ISudoku';
import AISolver from './AISolver';
import loadExamples from './LoadExamples';

function CheckTableButton({ getTableData, setTableData, classString }: ISudokuTableButton) {
  const sudokuTable = getTableData();

  const setErrorsInTable = (indexesOfCellsInError: string[]) => {
    const copy = cloneDeep(sudokuTable);
    // Set all cells to be not in error
    if (isEmpty(indexesOfCellsInError)) {
      for (let i = 0; i < 9; i += 1) {
        for (let j = 0; j < 9; j += 1) {
          copy[i][j].isInError = false;
        }
      }
    }

    each(indexesOfCellsInError, (i) => {
      const index: number[] = convert1DIndexTo2DIndex(parseInt(i, 10));
      copy[index[0]][index[1]].isInError = true;
    });

    setTableData(copy);
  };

  const checkTable = () => {
    const cellsInError = vaildateSudoku(sudokuTable);
    setErrorsInTable(cellsInError);
  };

  return (
    <button
      type="button"
      className={classString}
      onClick={checkTable}
    >
      Check it
    </button>
  );
}

function ClearTableButton({ getTableData, setTableData, classString }: ISudokuTableButton) {
  const sudokuTable = getTableData();

  const clearTable = () => {
    const copy = cloneDeep(sudokuTable);

    for (let i = 0; i < 9; i += 1) {
      for (let j = 0; j < 9; j += 1) {
        if (!copy[i][j].prefilled) {
          copy[i][j].value = 0;
          copy[i][j].isInError = false;
        }
      }
    }

    setTableData(copy);
  };

  return (
    <button
      type="button"
      className={classString}
      onClick={clearTable}
    >
      Clear it
    </button>
  );
}

function LoadTableButton({
  getTableData, setTableData, getCurrentQuiz, setCurrentQuiz, classString,
}: ISudokuTableAndQuizButton) {
  const sudokuTable = getTableData();
  let currentQuizNumber = getCurrentQuiz();

  const loadTable = () => {
    currentQuizNumber += 1;
    const sudokuString = loadExamples(currentQuizNumber);

    const nextTable = cloneDeep(sudokuTable);
    const inputArray: number[] = map(split(sudokuString, ''), toNumber);

    each(inputArray, (value: number, i: number) => {
      const index: number[] = convert1DIndexTo2DIndex(i);
      nextTable[index[0]][index[1]] = {
        value,
        prefilled: value !== 0,
        index: i,
        isInError: false,
      };
    });

    setTableData(nextTable);
    setCurrentQuiz(currentQuizNumber);
  };

  return (
    <button
      type="button"
      className={classString}
      onClick={loadTable}
    >
      Load next puzzle
    </button>
  );
}

function SolveTableButton({ getTableData, setTableData, classString }: ISudokuTableButton) {
  const sudokuTable = getTableData();

  const solveTable = () => {
    const solvedTable = AISolver(sudokuTable);
    setTableData(solvedTable);
  };

  return (
    <button
      type="button"
      className={classString}
      onClick={solveTable}
    >
      Solve it for me
    </button>
  );
}

export {
  CheckTableButton, ClearTableButton, LoadTableButton, SolveTableButton,
};
