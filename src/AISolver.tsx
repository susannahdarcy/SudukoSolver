/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  cloneDeep, each, findIndex, flatten, floor, isEmpty,
} from 'lodash-es';
import { ICell } from './types/ICell';
import {
  getCellGrouping,
  getCellsInColumn, getValuesFromCellArray,
} from './SudokuValidater';

// eslint-disable-next-line @typescript-eslint/no-unused-vars,arrow-body-style
const getPossibleValuesForCell = (cell: ICell) => {
  // Get cells row,
  // get cells column,
  // get cells group,
  // find missing values from row, column, group
  return [1, 2, 3, 4, 5, 6, 7, 8, 9];
};

const getDomainsForCells = (table: ICell[][]) => {
  // Make a dict, or cell index to list of all possible valid values of cell.
  const domains = new Map<number, number[]>();

  each(table, (row) => each(row, (cell) => {
    domains.set(cell.index, getPossibleValuesForCell(cell));
  }));
  return domains;
};

const isTableComplete = (table: ICell[][]) => {
  // check is table has no empty cells
  const flat: ICell[] = flatten(table);
  // console.log(flat);
  for (let i = 0; i < flat.length; i += 1) {
    // console.log(flat[i].value);
    if (flat[i].value === 0) {
      // console.log('hi');
      return false;
    }
  }

  return true;
};

const getUnassignedCell = (table: ICell[][]) => {
  // const flat: ICell[] = flatten(table);

  for (let i = 0; i < 9; i += 1) {
    for (let j = 0; j < 9; j += 1) {
      if (table[i][j].value === 0) {
        return [i, j];
      }
    }
  }

  return -1;
};

const convert1DIndexTo2DIndex = (index1D: number) => [Math.floor(index1D / 9), index1D % 9];

const isValid = (table: ICell[][], cellIndexes: number[], value: number) => {
  // const [i, j] = convert1DIndexTo2DIndex(cellIndex);
  const [i, j] = cellIndexes;
  const groupNumber = floor(i / 3) + floor(j / 3);

  for (let index = 0; index < 9; index += 1) {
    if (table[i][index].value === value) {
      return false;
    }
  }

  for (let index = 0; index < 9; index += 1) {
    if (table[index][j].value === value) {
      return false;
    }
  }

  const boxX = floor(j / 3);
  const boxY = floor(i / 3);
  for (let index = boxY * 3; index < (boxY * 3) + 3; index += 1) {
    for (let index2 = boxX * 3; index2 < (boxX * 3) + 3; index2 += 1) {
      if (table[index][index2].value === value) {
        return false;
      }
    }
  }
  // console.log(value);
  // const invalidValues: number[][] = [];
  // const row = getValuesFromCellArray(table[i]);
  // // console.log('row %O', row);
  // for (let index = 0; index < row.length; index += 1) {
  //   if (row[index] === value) {
  //     // console.log('out 1');
  //     return false;
  //   }
  // }
  //
  // const column = getValuesFromCellArray(getCellsInColumn(table, j));
  // // console.log('col %O', column);
  // for (let index = 0; index < column.length; index += 1) {
  //   if (column[index] === value) {
  //     // console.log('out 2');
  //     return false;
  //   }
  // }
  //
  // const group = getValuesFromCellArray(getCellGrouping(table, groupNumber));
  // // console.log('group %O', group);
  // for (let index = 0; index < group.length; index += 1) {
  //   if (group[index] === value) {
  //     // console.log('out 3');
  //     return false;
  //   }
  // }
  // console.log('out 4');
  // invalidValues.push(getValuesFromCellArray(getCellsInColumn(table, j)));
  // invalidValues.push(getValuesFromCellArray(getCellGrouping(table, groupNumber)));

  // console.log(flatten(invalidValues));
  // console.log(value);
  // console.log(flatten(invalidValues));
  // console.log(findIndex(flatten(invalidValues), value));
  // console.log(findIndex(flatten(invalidValues), (e) => e === value) === -1);
  // return (findIndex(flatten(invalidValues), (e) => e === value) === -1);

  // check if value is in column, row and group.

  // group = floor(i/3) + floor(j/3)

  return true;
};

const backtrackingSearch = (table: ICell[][], stateChange: (table: ICell[][]) => void) => {
  const cellIndexes = getUnassignedCell(table);
  if (cellIndexes === -1) {
    console.log('-1');
    return true;
  }
  const [i, j] = cellIndexes;
  for (let value = 1; value < 10; value += 1) {
    if (isValid(table, cellIndexes, value)) {
      // eslint-disable-next-line no-param-reassign
      table[i][j].value = value;
      if (backtrackingSearch(table, stateChange)) {
        console.log(cellIndexes);
        return true;
      }
      // eslint-disable-next-line no-param-reassign
      table[i][j].value = 0;
    }
  }
  return false;
};

function AISolver(table: ICell[][], stateChange: (table: ICell[][]) => void) {
  const copy = cloneDeep(table);
  const domains = getDomainsForCells(table);
  console.log(table);
  backtrackingSearch(copy, stateChange);
  console.log(copy);

  return copy;
}

export default AISolver;
