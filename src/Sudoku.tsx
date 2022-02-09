import React, { useState } from 'react';
import {
  range, map, each, split, toNumber, cloneDeep,
} from 'lodash-es';
import ICell from './types/ICell';
import Cell from './Cell';
import vaildateSudoku from './SudokuValidater';

const table = map(range(9), () => {
  const row: ICell[] = [];
  each(range(9), () => {
    const cell: ICell = {
      value: 0,
      prefilled: false,
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
  const inputArray: number[] = map(split(sudokuString, ('')), (i) => toNumber(i));
  each(inputArray, (prefilledValue: number, i: number) => {
    if (prefilledValue) {
      const index: number[] = convert1DIndexTo2DIndex(i);
      table[index[0]][index[1]] = {
        value: prefilledValue,
        prefilled: true,
      };
    }
  });
};

inputSudoku(inputedSudoku);

function Sudoku() {
  const [sudokuTable, setTable] = useState(table);

  const alterTable = (i: number, value: number) => {
    const index: number[] = convert1DIndexTo2DIndex(i);
    const copy = cloneDeep(sudokuTable);
    copy[index[0]][index[1]].value = value;
    setTable(copy);
  };

  vaildateSudoku(sudokuTable);
  let i = -1;
  return (
    <div className="grid grid-cols-9">
      {map(sudokuTable, (row) => map(row, (cell: ICell) => {
        i += 1;
        return (
          <Cell
            key={i}
            value={cell.value}
            index={i}
            prefilled={cell.prefilled}
            alterTable={alterTable}
          />
        );
      }))}
    </div>
  );
}

export default Sudoku;
