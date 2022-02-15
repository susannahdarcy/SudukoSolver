import React, { useState } from 'react';
import {
  range, map, each, split, toNumber, cloneDeep, flatten, isEmpty,
} from 'lodash-es';
import { ICell, ICellComponent } from './types/ICell';
import Cell from './Cell';
import vaildateSudoku from './SudokuValidater';

const table = map(range(9), () => {
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
// convert index into cell by i = index / 9: j = index % 9
const convert1DIndexTo2DIndex = (index1D: number) => [Math.floor(index1D / 9), index1D % 9];

const inputedSudoku: string = '004300209005009001070060043006002087190007400050083000600000105003508690042910300';

const inputSudoku = (sudokuString: string) => {
  const inputArray: number[] = map(split(sudokuString, ''), toNumber);

  each(inputArray, (value: number, i: number) => {
    const index: number[] = convert1DIndexTo2DIndex(i);

    table[index[0]][index[1]] = {
      value,
      prefilled: value !== 0,
      index: i,
      isInError: false,
    };
  });
};

inputSudoku(inputedSudoku);

function Sudoku() {
  const [sudokuTable, setTable] = useState(table);
  const flatTable = flatten(sudokuTable);

  const handleSetTable = (i: number, value: number) => {
    const index: number[] = convert1DIndexTo2DIndex(i);
    const copy = cloneDeep(sudokuTable);
    copy[index[0]][index[1]].value = value;
    copy[index[0]][index[1]].index = i;
    copy[index[0]][index[1]].isInError = false;
    setTable(copy);
  };

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

    setTable(copy);
  };

  const loadButton = () => {
    console.log('click');
  };

  const clearButton = () => {
    console.log('click');
  };

  const solveButton = () => {
    console.log('click');
  };

  const checkButton = () => {
    const cellsInError = vaildateSudoku(sudokuTable);
    setErrorsInTable(cellsInError);
  };

  return (
    <div className="container w-168 mx-auto py-10">
      <div className="py-2 grid grid-cols-3">
        <button type="button" className="col-start-1 place-self-start font-mono" onClick={loadButton}>
          Load next level
        </button>

        <button type="button" className="col-start-3 place-self-end font-mono" onClick={clearButton}>
          Clear it
        </button>
      </div>

      <div className="grid grid-cols-9">
        {map(flatTable, ({
          value, index, prefilled, isInError,
        }: ICellComponent) => (
          <Cell
            key={index}
            {... {
              value, index, prefilled, isInError,
            }}
            handleSetTable={handleSetTable}
          />
        ))}
      </div>

      <div className="py-2 grid grid-cols-3">
        <button type="button" className="col-start-1 place-self-start font-mono" onClick={solveButton}>
          Solve it for me
        </button>

        <button type="button" className="col-start-3 place-self-end font-mono" onClick={checkButton}>
          Check it
        </button>
      </div>
    </div>
  );
}

export default Sudoku;
