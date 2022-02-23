interface ISudokuTableData {
  getTableData: Function,
  setTableData: Function
}

interface ISudokuTableButton extends ISudokuTableData {
  classString: string
}

interface ISudokuTableAndQuizState extends ISudokuTableData {
  getCurrentQuiz: Function,
  setCurrentQuiz: Function
}

interface ISudokuTableAndQuizButton extends ISudokuTableAndQuizState {
  classString: string
}

interface ISudokuTableAndSuccessModelState extends ISudokuTableData {
  getShowSuccessModal: Function,
  setShowSuccessModal: Function
}

interface ISudokuTableAndSuccessModelButton extends ISudokuTableAndSuccessModelState {
  classString: string
}
export type {
  ISudokuTableData, ISudokuTableButton,
  ISudokuTableAndQuizState, ISudokuTableAndQuizButton,
  ISudokuTableAndSuccessModelState, ISudokuTableAndSuccessModelButton,
};
