interface ICell {
  value: number;
  index?: number;
  prefilled?: boolean;
  alterTable?: Function;
}

// const Cell2: ICell = {
//   value: 0,
//   preFilled: false,
// };

export default ICell;
