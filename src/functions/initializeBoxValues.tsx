import { interfaces as globalInterfaces } from '../global';



export default function(sudokuSize: number): globalInterfaces['box'] {console.log("now in 'initializeBoxValues()'");
    let box: globalInterfaces['box'] = [];

    let noteDefaultValue: Array<number> = [];
        for(let noteCount = 0; noteCount < sudokuSize; noteCount++) {
        noteDefaultValue.push(0);
        box.push([]);
    }

    for(let row = 0; row < sudokuSize; row++) {
        for(let col = 0; col < sudokuSize; col++) {
            box[row].push({
                value: 0,
                userValue: 0,
                note: noteDefaultValue,
                JSX: <></>
            });
        }
    }

    return box;
};
