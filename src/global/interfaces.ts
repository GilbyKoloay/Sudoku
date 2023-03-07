export default interface interfaces{
    sudokuBoxGroupSizeList: Array<{
        row: number,
        col: number
    }>,
    
    box: Array<Array<{
        value: number,
        userValue: number,
        note: Array<number>,
        JSX: JSX.Element
    }>>,

    sudokuBoxGroupSize: {
        row: number,
        col: number
    }
};
