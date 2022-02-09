import { difference, each, map } from 'lodash-es';
import ICell from './types/ICell';

const getValuesFromCellTable = (cellTable: ICell[][]) => {
  const table = map(cellTable, (cellRow) => map(cellRow, (cell) => cell.value));
  console.log(table);
};

const getValuesFromCellArray = (cellArray: ICell[]) => {
  const array = map(cellArray, (cell) => cell.value);
  console.log(array);
  return array;
};

const checkCellArray = (cells: ICell[]) => {
  const values = getValuesFromCellArray(cells);
  const CHECKER_ARRAY = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const dif = difference(CHECKER_ARRAY, values);
  console.log(dif);
  const errorIndex: number[] = [];
  each(dif, (error) => {
    each(cells, (cell) => {
      if (cell.value === error) {
        // nullish coalescing operator
        errorIndex.push(cell.index);
      }
    });
  });
  console.log(errorIndex);
  return errorIndex;
};

function vaildateSudoku(table: ICell[][]) {
  getValuesFromCellTable(table);
  getValuesFromCellArray(table[0]);

  checkArray([9, 9, 7, 6, 5, 4, 3, 2, 1]);
  // Check all rows

  // Check all Columns
  // Check squares
}

export default vaildateSudoku;
