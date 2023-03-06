export default function (size: number): Array<{row: number; col: number}> {
    const sudokuBoxGroupSizeList: Array<{row: number; col: number}> = [];

    for (let rowCount = 2; rowCount < size / 2; rowCount++) {
        for (let colCount = rowCount; colCount <= size / 2; colCount++) {
            rowCount * colCount === size &&
            sudokuBoxGroupSizeList.push({row: rowCount, col: colCount});
        }
    }

    return sudokuBoxGroupSizeList;
}
