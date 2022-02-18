import sudokuExamples from './assets/sudokuExample.json';

function loadExamples(quizNumber:number) {
  return sudokuExamples[quizNumber][0];
}

export default loadExamples;
