import { interfaces as globalInterfaces } from "../global";



export default function(size: number): globalInterfaces['sudokuBoxGroupSizeList'] {
    const sudokuBoxGroupSizeList: globalInterfaces['sudokuBoxGroupSizeList'] = [];

    for(let rowCount = 2; rowCount < size / 2; rowCount++) {
        for(let colCount = rowCount; colCount <= size / 2; colCount++) {
            (rowCount * colCount === size) && sudokuBoxGroupSizeList.push({row: rowCount, col: colCount});
        }
    }

    return sudokuBoxGroupSizeList;
};
