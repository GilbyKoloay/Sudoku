import {
    TouchableOpacity,
    StyleSheet,
    View,
    Text
} from 'react-native';
import { interfaces as globalInterfaces } from '../global';



const styles = StyleSheet.create({
    box: {
        flex: 1,
        aspectRatio: 1,

        borderWidth: 1
    },
    boxNoteRow: {
        flexDirection: 'row',
        flex: 1
    },
    boxText: {
        textAlign: 'center',
        textAlignVertical: 'center',
        flex: 1
    }
});



export default function(
    box: globalInterfaces['box'],
    sudokuSize: number,
    sudokuBoxGroupSize: globalInterfaces['sudokuBoxGroupSize']
    ): globalInterfaces['box'] {console.log("now in 'setBoxJSX()'");
    for(let count = 0, row = 0; row < sudokuSize; row++) {
        for(let col = 0; col < sudokuSize; col++) {
            if(box[row][col].userValue === 0) {
                box[row][col].JSX = (
                    <TouchableOpacity
                        key={count}
                        style={styles.box}
                    >
                        {box[row][col].note.map((row, noteRowIndex) => {
                            if(noteRowIndex % sudokuBoxGroupSize.col === 0) {
                                return (
                                    <View
                                        key={noteRowIndex / sudokuBoxGroupSize.col}
                                        style={styles.boxNoteRow}
                                    >
                                        {box[row][col].note.map((noteValue, noteIndex) => {
                                            if(noteIndex >= noteRowIndex && noteIndex < noteRowIndex + sudokuBoxGroupSize.col) {
                                                return (
                                                    <Text key={noteIndex} style={styles.boxText}>
                                                        {(noteValue === 0) ? '' : noteValue}
                                                    </Text>
                                                );
                                            }
                                        })}
                                    </View>
                                );
                            }
                        })}
                    </TouchableOpacity>
                );
            }
            else {
                box[row][col].JSX = (
                    <TouchableOpacity
                        key={count}
                        style={styles.box}
                    >
                        <Text style={styles.boxText}>{box[row][col].userValue}</Text>
                    </TouchableOpacity>
                );
            }

            count++;
        }
    }

    return box;
};
