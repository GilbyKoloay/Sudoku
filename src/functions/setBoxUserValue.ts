import { interfaces as globalInterfaces } from "../global";



export default function(
    box: globalInterfaces['box'],
    sudokuSize: number,
    difficulty: number
    ): globalInterfaces['box'] {console.log("now in 'setBoxUserValue()'");
    for(let count = 0; count < Math.round((sudokuSize * sudokuSize) - (sudokuSize * sudokuSize) * difficulty); ) {
        const row = Math.floor(Math.random() * (sudokuSize - 1) + 1);
        const col = Math.floor(Math.random() * (sudokuSize - 1) + 1);
        console.log(`box[${row}][${col}].value (${box[row][col].value}) \t|\t box[${row}][${col}].userValue (${box[row][col].userValue}) \t|\t count (${count})`);
        if(box[row][col].userValue === 0) {//console.log(`count (${count}) < ${Math.round((sudokuSize * sudokuSize) - (sudokuSize * sudokuSize) * difficulty)} \t|\t box[${row}][${col}].userValue (${box[row][col].userValue}) === 0`);
            box[row][col].userValue = box[row][col].value;
            count++;
        }
    }console.log("end of 'setBoxUserValue()'");
    console.log(`for = ${Math.round((sudokuSize * sudokuSize) - (sudokuSize * sudokuSize) * difficulty)}`);
    return box;
};
