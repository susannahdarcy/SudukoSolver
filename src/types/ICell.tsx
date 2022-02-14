interface ICell {
  value: number;
  index: number;
  prefilled: boolean;
  isInError: boolean;
}

interface ICellComponent extends ICell {
  handleSetTable: Function;
}

export type { ICell, ICellComponent };
