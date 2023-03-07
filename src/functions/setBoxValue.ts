import { interfaces as globalInterfaces } from '../global';
import { initializeBoxValues, isBoxValueFittable } from '../functions';



export default function(
    box: globalInterfaces['box'],
    sudokuSize: number,
    sudokuBoxGroupSize: globalInterfaces['sudokuBoxGroupSize']
    ): globalInterfaces['box'] {console.log("now in 'setBoxValue()'");
    for(let row = 0; row < sudokuSize; row++) {
        for(let col = 0, generatedValueCount = 0; col < sudokuSize; ) {
            const generatedValue = Math.floor(Math.random() * sudokuSize + 1);
            console.log('\n');
            if(isBoxValueFittable(sudokuSize, box, row, col, generatedValue, sudokuBoxGroupSize)) {
                console.log(`SUCCEED inputted ${generatedValue} on [${row}][${col}]`);
                box[row][col].value = generatedValue;
                generatedValueCount = 0;
                col++;
            }
            else {
                console.log(`FAILED inputted ${generatedValue} on [${row}][${col}]`);
                generatedValueCount++;
            }

            // console.log(`row (${row}) | col (${col}) | generatedValueCount (${generatedValueCount}) | max = (${Math.round((sudokuSize*sudokuSize)/2)}) | ${generatedValueCount === Math.round((sudokuSize*sudokuSize)/2)}`);
            if (generatedValueCount === Math.round((sudokuSize * sudokuSize) / 2)) {
                // console.log('RESETTED');
                row = -1;
                box = initializeBoxValues(sudokuSize);
                break;

                // if(col === 0) {
                //   row-=2;
                //   col=sudokuSize-1;
                // } else {
                //   col--;
                // }
                // box[row][col].value = 0;
            }
        }
    }

    return box;
};
