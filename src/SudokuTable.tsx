import { cloneDeep, flatten, map } from 'lodash-es';
import React from 'react';
import { ISudokuTableData } from './types/ISudoku';
import { CellState, ICellComponent } from './types/ICell';
import Cell from './Cell';

// Convert 1D array to 2D array functions
function convert1DIndexTo2DIndex(index1D: number) { return [Math.floor(index1D / 9), index1D % 9]; }

function SudokuTable({ getTableData, setTableData }: ISudokuTableData) {
  const sudokuTable = getTableData();
  const flatTable = flatten(sudokuTable);

  const handleSetTable = (index: number, value: number) => {
    const [i, j] = convert1DIndexTo2DIndex(index);
    const copy = cloneDeep(sudokuTable);
    copy[i][j].value = value;
    copy[i][j].index = index;
    copy[i][j].cellState = CellState.UNKNOWN;
    setTableData(copy);
  };

  return (
    <div className="grid grid-cols-9">
      {map(flatTable, ({
        value, index, prefilled, cellState,
      }: ICellComponent) => (
        <Cell
          key={index}
          {... {
            value, index, prefilled, cellState,
          }}
          handleSetTable={handleSetTable}
        />
      ))}
    </div>
  );
}

export { SudokuTable, convert1DIndexTo2DIndex };
