import { interfaces as globalInterfaces } from "../global";



export default function(
    sudokuSize: number,
    box: globalInterfaces['box'],
    rowTarget: number,
    colTarget: number,
    generatedValue: number,
    sudokuBoxGroupSize: globalInterfaces['sudokuBoxGroupSize']
    ): boolean {
    let isFittable: boolean = true;

    console.log(`testing (${generatedValue}) on box[${rowTarget}][${colTarget}]`);

    // row check
    for(let col = 0; col < sudokuSize; col++) {
        if(generatedValue === box[rowTarget][col].value) {
            isFittable = false;
        }
    }

    // col check
    for(let row = 0; row < sudokuSize; row++) {
        if(generatedValue === box[row][colTarget].value) {
            isFittable = false;
        }
    }

    // find the group's min & max value for group check
    let rowMax: number = 0;
    let rowMin: number = 0;
    let colMax: number = 0;
    let colMin: number = 0;
    for(let row = rowTarget; row < sudokuSize; row++) {
        for(let col = colTarget; col < sudokuSize; col++) {
            if((col + 1) % sudokuBoxGroupSize.col === 0 && colMax === 0) {
                colMax = col + 1;
                break;
            }
        }
        if((row + 1) % sudokuBoxGroupSize.row === 0 && rowMax === 0) {
            rowMax = row + 1;
            break;
        }
    }
    for(let row = rowTarget; row >= 0; row--) {
        for(let col = colTarget; col >= 0; col--) {
            if(col % sudokuBoxGroupSize.col === 0 && colMin === 0) {
                colMin = col;
                break;
            }
        }
        if(row % sudokuBoxGroupSize.row === 0 && rowMin === 0) {
            rowMin = row;
            break;
        }
    }

    // group check
    for(let row = rowMin; row < rowMax; row++) {
        for(let col = colMin; col < colMax; col++) {
            if(generatedValue === box[row][col].value) {
                isFittable = false;
            }
        }
    }

    return isFittable;
};
