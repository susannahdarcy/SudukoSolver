import {
  cloneDeep, each, isEmpty, map, pullAt, split, toNumber,
} from 'lodash-es';
import React from 'react';
import { convert1DIndexTo2DIndex } from './SudokuTable';
import { vaildateSudoku } from './SudokuValidater';
import { ISudokuTableAndQuizButton, ISudokuTableButton } from './types/ISudoku';
import AISolver from './AISolver';
import loadExamples from './LoadExamples';
import { CellState } from './types/ICell';

function CheckTableButton({ getTableData, setTableData, classString }: ISudokuTableButton) {
  const sudokuTable = getTableData();

  const setErrorsInTable = (indexesOfCellsInError: string[]) => {
    const copy = cloneDeep(sudokuTable);
    // Set all cells to be not in error
    if (isEmpty(indexesOfCellsInError)) {
      for (let i = 0; i < 9; i += 1) {
        for (let j = 0; j < 9; j += 1) {
          copy[i][j].cellState = CellState.CORRECT;
        }
      }
    }

    each(indexesOfCellsInError, (i) => {
      const index: number[] = convert1DIndexTo2DIndex(parseInt(i, 10));
      copy[index[0]][index[1]].cellState = CellState.ERROR;
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
        copy[i][j].cellState = CellState.UNKNOWN;
        if (!copy[i][j].prefilled) copy[i][j].value = 0;
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

function SolveTableButton({
  getTableData, setTableData, classString,
}: ISudokuTableButton) {
  const sudokuTable = cloneDeep(getTableData());

  const solveTable = () => {
    const solvingProcess = AISolver(sudokuTable);

    const showProcessInterval = setInterval(() => {
      const processTable = cloneDeep(sudokuTable);
      const cell = pullAt(solvingProcess, 0)[0];
      if (cell) {
        const [i, j] = convert1DIndexTo2DIndex(cell.index);
        processTable[i][j].value = cell.value;
        processTable[i][j].cellState = cell.cellState;
        setTableData(processTable);

        // Table to keep track of changes;
        sudokuTable[i][j].value = cell.value;
        sudokuTable[i][j].cellState = cell.cellState;
      } else {
        clearInterval(showProcessInterval);
      }
    }, 10);
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
