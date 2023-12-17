type Cell = {
  actualValue?: number;
  userValue?: number | null;
  isLocked?: boolean;
  notes?: number[];
};

type Sudoku = [[SudokuCell]];

export { Cell, Sudoku };
