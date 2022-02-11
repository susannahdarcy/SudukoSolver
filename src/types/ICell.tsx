interface ICell {
  value: number;
  index: number;
  prefilled: boolean;
  isInError: boolean;
}

interface ICellConponent extends ICell {
  handleSetTable: Function;
}

// const Cell2: ICell = {
//   value: 0,
//   preFilled: false,
// };

export type { ICell, ICellConponent };
