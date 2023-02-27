import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import stylesGlobal from './_globalStyles';

const styles = StyleSheet.create({
  boxRow: {
    flexDirection: 'row'
  },
  box: {
    flex: 1,
    aspectRatio: 1

    ,borderWidth: 1
  },
  boxText: {
    textAlign: 'center',
    textAlignVertical: 'center',
    flex: 1
  },
  boxNoteRow: {
    flexDirection: 'row',
    flex: 1
  }
});



export default function({ route }: { navigation: object, route: any }) {
  const { size, boxGroupConfiguration, boxGroupConfigurationOption, difficulty } : {
    size: number,
    boxGroupConfiguration: Array<{
      row: number,
      column: number
    }>,
    boxGroupConfigurationOption: number,
    difficulty: number
  } = route.params;

  const [box, setBox] = useState <Array<Array<{
    value: number,
    userValue: number,
    note: Array<number>,
    JSX: JSX.Element
  }>>> ([]);



  const renderBox = () => {
    if(box.length === 0) {
      return <Text>Loading ...</Text>
    }

    return box.map((row, rowIndex) => (
      <View key={rowIndex} style={styles.boxRow}>
        {row.map(box => box.JSX)}
      </View>
    ));
  };



  function createBox() {
    let thisBox: Array<{
      value: number,
      userValue: number,
      note: Array<number>,
      JSX: JSX.Element
    }>[] = initializeBoxObjectValue();

    thisBox = setBoxValue(thisBox);
    thisBox = setBoxUserValue(thisBox);
    thisBox = setBoxJSX(thisBox);

    setBox(thisBox);
  }

  function initializeBoxObjectValue() {
    let box: Array<{
      value: number,
      userValue: number,
      note: Array<number>,
      JSX: JSX.Element
    }>[] = [];

    let noteDefaultValue: Array<number> = [];
    for(let noteCount=0; noteCount<size; noteCount++) {
      noteDefaultValue.push(0);
      box.push([]);
    }

    for(let row=0; row<size; row++) {
      for(let col=0; col<size; col++) {
        box[row].push({
          value: 0,
          userValue: 0,
          note: noteDefaultValue,
          JSX: <></>
        });
      }
    }

    return box;
  }

  function setBoxValue(
    box: Array<Array<{
      value: number,
      userValue: number,
      note: Array<number>,
      JSX: JSX.Element
    }>>
  ) {
    for(let row=0; row<size; row++) {
      for(let col=0, generatedValueCount=0; col<size; ) {
        const generatedValue = Math.floor((Math.random()*size) + 1);
        // console.log('\n');
        if(isBoxValueFittable(box, row, col, generatedValue)) {
          // console.log(`SUCCEED inputted ${generatedValue} on [${row}][${col}]`);
          box[row][col].value = generatedValue;
          generatedValueCount = 0;
          col++;
        } else {
          // console.log(`FAILED inputted ${generatedValue} on [${row}][${col}]`);
          generatedValueCount++;
        }

        // console.log(`row (${row}) | col (${col}) | generatedValueCount (${generatedValueCount}) | max = (${Math.round((size*size)/2)}) | ${generatedValueCount === Math.round((size*size)/2)}`);
        if(generatedValueCount === Math.round((size*size)/2)) {
          // console.log('RESETTED');
          row = -1;
          box = initializeBoxObjectValue();
          break;

          // if(col === 0) {
          //   row-=2;
          //   col=size-1;
          // } else {
          //   col--;
          // }
          // box[row][col].value = 0;
        }
      }
    }

    return box;
  }

  function isBoxValueFittable(
    box: Array<Array<{
      value: number,
      userValue: number,
      note: Array<number>,
      JSX: JSX.Element
    }>>,
    rowTarget: number,
    colTarget: number,
    generatedValue: number
  ) {
    let fittable: boolean = true;
    // console.log(`testing (${generatedValue}) on box[${rowTarget}][${colTarget}]`);

    // row check
    for(let col=0; col<size; col++) {
      if(generatedValue === box[rowTarget][col].value) {
        fittable = false;
      }
    }

    // col check
    for(let row=0; row<size; row++) {
      if(generatedValue === box[row][colTarget].value) {
        fittable = false;
      }
    }

    // find the min/max for group check
    let rowMax: number = 0;
    let rowMin: number = 0;
    let colMax: number = 0;
    let colMin: number = 0;
    for(let row=rowTarget; row<size; row++) {
      for(let col=colTarget; col<size; col++) {
        if((col+1) % boxGroupConfiguration[boxGroupConfigurationOption].column === 0 && colMax === 0) {
          colMax = col+1;
          break;
        }
      }
      if((row+1) % boxGroupConfiguration[boxGroupConfigurationOption].row === 0 && rowMax === 0) {
        rowMax = row+1;
        break;
      }
    }
    for(let row=rowTarget; row>=0; row--) {
      for(let col=colTarget; col>=0; col--) {
        if(col % boxGroupConfiguration[boxGroupConfigurationOption].column === 0 && colMin === 0) {
          colMin = col;
          break;
        }
      }
      if(row % boxGroupConfiguration[boxGroupConfigurationOption].row === 0 && rowMin === 0) {
        rowMin = row;
        break;
      }
    }
    
    // group check
    for(let row=rowMin; row<rowMax; row++) {
      for(let col=colMin; col<colMax; col++) {
        if(generatedValue === box[row][col].value) {
          fittable = false;
        }
      }
    }

    return fittable;
  }

  function setBoxUserValue(
    box: Array<Array<{
      value: number,
      userValue: number,
      note: Array<number>,
      JSX: JSX.Element
    }>>
  ) {
    for(let count=0; count<Math.round((size*size)-(size*size)*difficulty); ) {
      const row = Math.floor((Math.random() * (size-1)) + 1);
      const col = Math.floor((Math.random() * (size-1)) + 1);

      if(box[row][col].userValue === 0) {
        box[row][col].userValue = box[row][col].value;
        count++;
      }
    }

    return box;
  }

  function setBoxJSX(
    box: Array<Array<{
      value: number,
      userValue: number,
      note: Array<number>,
      JSX: JSX.Element
    }>>
  ) {
    for(let count=0, row=0; row<size; row++) {
      for(let col=0; col<size; col++) {
        if(box[row][col].userValue === 0) {
          box[row][col].JSX = (
            <TouchableOpacity key={count} style={styles.box}>
              {box[row][col].note.map((row, noteRowIndex) => {
                if(noteRowIndex % boxGroupConfiguration[boxGroupConfigurationOption].column === 0) {
                  return(
                    <View key={noteRowIndex/boxGroupConfiguration[boxGroupConfigurationOption].column} style={styles.boxNoteRow}>
                      {box[row][col].note.map((noteValue, noteIndex) => {
                        if(noteIndex >= noteRowIndex && noteIndex < noteRowIndex+boxGroupConfiguration[boxGroupConfigurationOption].column) {
                          return <Text key={noteIndex} style={styles.boxText}>{(noteValue === 0) ? '' : noteValue}</Text>;
                        }
                      })}
                    </View>
                  );
                }
              })}
            </TouchableOpacity>
          );
        } else {
          box[row][col].JSX = (
            <TouchableOpacity key={count} style={styles.box}>
              <Text style={styles.boxText}>{box[row][col].userValue}</Text>
            </TouchableOpacity>
          );
        }

        count++;
      }
    }

    return box;
  }

  useEffect(() => {
    createBox();
  }, []);



  return(
    <View style={stylesGlobal.screen}>
      {renderBox()}
    </View>
  );
}
