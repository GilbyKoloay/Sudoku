import { sudokuSize } from '.';
import type { Sudoku, SudokuCell } from '.';

type Difficulty = 'Easy' | 'Medium' | 'Hard';

function setCell(sudoku: Sudoku): Sudoku {
  let newSudoku: Sudoku = sudoku;
  const object: SudokuCell = {
    actualValue: 0,
    userValue: null,
    isLocked: true,
    notes: [],
  };

  for (let row = 0; row < sudokuSize; row++) {
    newSudoku[row] = [{}];
    for (let col = 0; col < sudokuSize; col++) {
      newSudoku[row][col] = object;
    }
  }

  return newSudoku;
}

function setCellsValue(sudoku: Sudoku): Sudoku {
  let newSudoku: Sudoku = sudoku;
  let actualValues: number[][] = [];

  for (let row = 0; row < sudokuSize; row++) {
    actualValues[row] = [];
    for (let col = 0; col < sudokuSize; col++) {
      actualValues[row][col] = 0;
    }
  }

  function isValid(num: number, row: number, col: number): boolean {
    for (let ind = 0; ind < sudokuSize; ind++) {
      if (
        actualValues[row][ind] === num ||
        actualValues[ind][col] === num ||
        actualValues[3 * Math.floor(row / 3) + Math.floor(ind / 3)][
          3 * Math.floor(col / 3) + (ind % 3)
        ] === num
      )
        return false;
    }
    return true;
  }

  function checkActualValues(): boolean {
    for (let row = 0; row < sudokuSize; row++) {
      for (let col = 0; col < sudokuSize; col++) {
        if (actualValues[row][col] === 0) {
          const numbers = Array.from(
            { length: sudokuSize },
            (_, index) => index + 1,
          );
          numbers.sort(() => Math.random() - 0.5);

          for (const num of numbers) {
            if (isValid(num, row, col)) {
              actualValues[row][col] = num;
              if (checkActualValues()) return true;
              actualValues[row][col] = 0;
            }
          }
          return false;
        }
      }
    }
    return true;
  }

  checkActualValues();

  for (let row = 0; row < sudokuSize; row++) {
    for (let col = 0; col < sudokuSize; col++) {
      newSudoku[row][col] = {
        ...newSudoku[row][col],
        actualValue: actualValues[row][col],
      };
    }
  }

  return newSudoku;
}

function setLockedCells(sudoku: Sudoku, difficulty: Difficulty): Sudoku {
  let newSudoku: Sudoku = sudoku;
  const sudokuLength: number = sudokuSize * sudokuSize;
  const easyPercentage = (sudokuLength * 40) / 100;
  // const mediumPercentage = sudokuLength*60/100;
  const mediumPercentage = (sudokuLength * 1) / 100;
  const hardPercentage = (sudokuLength * 80) / 100;
  let lockedCount: number =
    difficulty === 'Easy'
      ? easyPercentage
      : difficulty === 'Medium'
      ? mediumPercentage
      : hardPercentage;

  while (lockedCount > 0) {
    const randomRow = Math.floor(Math.random() * sudokuSize);
    const randomCol = Math.floor(Math.random() * sudokuSize);

    if (newSudoku[randomRow][randomCol].isLocked) {
      newSudoku[randomRow][randomCol].isLocked = false;
      lockedCount--;
    }
  }

  return newSudoku;
}

export default function createSudoku(difficulty: Difficulty): Sudoku {
  let newSudoku: Sudoku = [[{}]];
  newSudoku = setCell(newSudoku);
  newSudoku = setCellsValue(newSudoku);
  newSudoku = setLockedCells(newSudoku, difficulty);

  return newSudoku;
}
