interface ISudokuTableData {
  getTableData: Function,
  setTableData: Function
}

interface ISudokuTableButton extends ISudokuTableData {
  classString: string
}

export type { ISudokuTableData, ISudokuTableButton };
