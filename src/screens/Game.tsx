import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import _globalStyles from './_globalStyles';

const styles = StyleSheet.create({
  screen: {
    display: 'flex',
    flex: 1,
    padding: 5,

    borderWidth: 1,
  },
  boxText: {
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  box: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    aspectRatio: 1,
    borderWidth: 0.5,
  },
  boxRow: {
    flexDirection: 'row',
  },
});

export default function Game({ route }: { navigation: object, route: any }) {
  // const { size, boxGroupConfiguration, boxGroupConfigurationOption } = route.params;
  const size = 6;
  const boxGroupConfiguration = [{row: 2, column: 3}];
  const boxGroupConfigurationOption = 0;

  const [box, setBox] = useState <Array<JSX.Element>> ([]);
  const [boxValue, setBoxValue] = useState <Array<number>> ([]);
  const [boxNote, setBoxNote] = useState <Array<JSX.Element>> ([]);
  
  const [boxRow, setBoxRow] = useState <{
    index: Array<number>[],
    value: Array<number>[],
  }> ({
    index: [],
    value: [],
  });

  const [boxColumn, setBoxColumn] = useState <{
    index: Array<number>[],
    value: Array<number>[],
  }> ({
    index: [],
    value: [],
  });

  const [boxGroup, setBoxGroup] = useState <{
    index: Array<number>[],
    value: Array<number>[],
  }> ({
    index: [],
    value: [],
  });



  const setBoxWithIndex = () => {
    const box: Array<JSX.Element> = [];
    const boxRowIndex: Array<number>[] = [];
    const boxColumnIndex: Array<number>[] = [];
    const boxGroupIndex: Array<number>[] = [];

    // set box
    for(let index=0; index<size*size; index++) {
      box.push(
        <TouchableOpacity key={index} style={styles.box} onPress={() => boxOnPress(index)}>
          <Text style={styles.boxText}>{index}</Text>
        </TouchableOpacity>
      );
    }

    // set box index array
    for(let index=0; index<size; index++) {
      boxRowIndex.push([]);
      boxColumnIndex.push([]);
      boxGroupIndex.push([]);
    }

    // set box row index
    for(let row=0; row<size; row++) {
      for(let index=row*size; index<(row*size)+size; index++) {
        boxRowIndex[row].push(index);
      }
    }

    // set box column index
    for(let column=0; column<size; column++) {
      for(let index=column; index<size*size; index+=size) {
        boxColumnIndex[column].push(index);
      }
    }

    // set box group index
    for(let boxGroupRow=0; boxGroupRow<boxGroupConfiguration[boxGroupConfigurationOption].column; boxGroupRow++) {
      for(let index=boxGroupRow*((size*size)/boxGroupConfiguration[boxGroupConfigurationOption].column), group = boxGroupRow*boxGroupConfiguration[boxGroupConfigurationOption].row; index<(boxGroupRow*((size*size)/boxGroupConfiguration[boxGroupConfigurationOption].column)) + (size*size)/boxGroupConfiguration[boxGroupConfigurationOption].column; index++) {
        if(index % boxGroupConfiguration[boxGroupConfigurationOption].column === 0) {
          group++
        }
        if(index % size === 0) {
          group = boxGroupRow*boxGroupConfiguration[boxGroupConfigurationOption].row;
        }
        boxGroupIndex[group].push(index);
      }
    }

    setBox(box);
    setBoxRow({index: boxRowIndex, value: boxRow.value});
    setBoxColumn({index: boxColumnIndex, value: boxColumn.value});
    setBoxGroup({index: boxGroupIndex, value: boxGroup.value});
  };

  const makeBox = () => {
    return box.map((row, rowIndex) => {
      if(rowIndex % size === 0) {
        return(
          <View key={(rowIndex/size)} style={styles.boxRow}>
            {box.map((box, boxIndex) => {
              if(boxIndex>=rowIndex && boxIndex<rowIndex+size) {
                return box;
              }
            })}
          </View>
        );
      }
    });
  };

  const boxOnPress = (boxIndex: number) => {
    console.log(`boxIndex (${boxIndex}) | row () & column ()`);
  };


  
  useEffect(() => {
    setBoxWithIndex();
  }, []);



  return(
    <View style={_globalStyles.screen}>
      {makeBox()}
    </View>
  );
}
