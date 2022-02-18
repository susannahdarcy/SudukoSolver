import { cloneDeep, flatten, map } from 'lodash-es';
import React from 'react';
import { ISudokuTableData } from './types/ISudoku';
import { ICellComponent } from './types/ICell';
import Cell from './Cell';

// Convert 1D array to 2D array functions
function convert1DIndexTo2DIndex(index1D: number) { return [Math.floor(index1D / 9), index1D % 9]; }

function SudokuTable({ getTableData, setTableData }: ISudokuTableData) {
  const sudokuTable = getTableData();
  const flatTable = flatten(sudokuTable);

  const handleSetTable = (i: number, value: number) => {
    const index: number[] = convert1DIndexTo2DIndex(i);
    const copy = cloneDeep(sudokuTable);
    copy[index[0]][index[1]].value = value;
    copy[index[0]][index[1]].index = i;
    copy[index[0]][index[1]].isInError = false;
    setTableData(copy);
  };

  return (
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
  );
}

export { SudokuTable, convert1DIndexTo2DIndex };
