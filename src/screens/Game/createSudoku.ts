import { GameMode } from '../../types';
import { Cell, Sudoku } from './Types';

function setCell(sudoku: Sudoku, size: number): Sudoku {
  let newSudoku: Sudoku = sudoku;
  const object: Cell = {
    actualValue: 0,
    userValue: null,
    isLocked: true,
    notes: [],
  };

  for (let row = 0; row < size; row++) {
    newSudoku[row] = [{}];
    for (let col = 0; col < size; col++) {
      newSudoku[row][col] = object;
    }
  }

  return newSudoku;
}

function setCellsValue(sudoku: Sudoku, size: number): Sudoku {
  let newSudoku: Sudoku = sudoku;
  let actualValues: number[][] = [];

  for (let row = 0; row < size; row++) {
    actualValues[row] = [];
    for (let col = 0; col < size; col++) {
      actualValues[row][col] = 0;
    }
  }

  function isValid(num: number, row: number, col: number): boolean {
    for (let ind = 0; ind < size; ind++) {
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
    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        if (actualValues[row][col] === 0) {
          const numbers = Array.from({ length: size }, (_, index) => index + 1);
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

  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      newSudoku[row][col] = {
        ...newSudoku[row][col],
        actualValue: actualValues[row][col],
      };
    }
  }

  return newSudoku;
}

function setLockedCells(
  sudoku: Sudoku,
  gameMode: GameMode,
  size: number,
): Sudoku {
  let newSudoku: Sudoku = sudoku;
  const sudokuLength: number = size * size;
  const easyPercentage = (sudokuLength * 40) / 100;
  const mediumPercentage = (sudokuLength * 60) / 100;
  const hardPercentage = (sudokuLength * 80) / 100;
  let lockedCount: number =
    gameMode === 'Easy'
      ? easyPercentage
      : gameMode === 'Medium'
      ? mediumPercentage
      : hardPercentage;

  while (lockedCount > 0) {
    const randomRow = Math.floor(Math.random() * size);
    const randomCol = Math.floor(Math.random() * size);

    if (newSudoku[randomRow][randomCol].isLocked) {
      newSudoku[randomRow][randomCol].isLocked = false;
      lockedCount--;
    }
  }

  return newSudoku;
}

/**
 *
 * @param gameMode refer to GameMode type.
 * @returns 2 dimensional array which element is an object. The object is using the Cell type.
 */
export default function createSudoku(gameMode: GameMode, size: number): Sudoku {
  let newSudoku: Sudoku = [[{}]];
  newSudoku = setCell(newSudoku, size);
  newSudoku = setCellsValue(newSudoku, size);
  newSudoku = setLockedCells(newSudoku, gameMode, size);

  return newSudoku;
}
