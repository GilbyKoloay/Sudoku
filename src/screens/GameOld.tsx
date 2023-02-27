import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import _globalStyles from './_globalStyles';

const styles = StyleSheet.create({
  boxText: {
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  box: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // aspectRatio: 1, // google
    height: 30, // google
    width: 30, // google
    borderWidth: 1,
    borderColor: '#ccc',
  },
  boxRow: {
    flexDirection: 'row',
  },
});

export default function({ route }: { navigation: object, route: any }) {
  // const { size, boxGroupConfiguration, boxGroupConfigurationOption } : { size: number, boxGroupConfiguration: Array<{row: number, column: number}>, boxGroupConfigurationOption: number } = route.params;
  const size = 6;
  const boxGroupConfiguration = [{row: 2, column: 3}];
  const boxGroupConfigurationOption = 0;

  const [boxIndex, setBoxIndex] = useState <{
    row: Array<number>[],
    column: Array<number>[],
    group: Array<number>[],
  }> ({
    row: [],
    column: [],
    group: [],
  });
  const [boxValue, setBoxValue] = useState <Array<number>> ([]);
  const [boxNote, setBoxNote] = useState <Array<JSX.Element>> ([]);
  const [box, setBox] = useState <Array<JSX.Element>> ([]);



  const renderBox = () => {
    // box.forEach((row, rowIndex) => {
    //   if(rowIndex % size === 0) {
    //     box.forEach((value, index) => {
    //       console.log(`row [${rowIndex}] | index [${index}]`);
    //     });
    //   }
    // });

    // if(box.length === 0) {
      return <Text>Box is empty</Text>
    // }
    
    // return box.map((row, rowIndex) => {
    //   if(rowIndex % size === 0) {
    //     return(
    //       <View key={(rowIndex/size)} style={styles.boxRow}>
    //         {box.map((box, boxIndex) => {
    //           if(boxIndex>=rowIndex && boxIndex<rowIndex+size) {
    //             return box;
    //           }
    //         })}
    //       </View>
    //     );
    //   }
    // });
  };



  // const boxOnPress = (boxIndex: number) => {
  //   console.log(`boxIndex (${boxIndex}) | row () & column ()`);
  // };

  // const setBoxBorder = (box: Array<JSX.Element>, type: string, borderOf: Array<number>[]) => {
  //   const boxGroupBorderSize: number = 2;
  //   const boxGroupBorderColor: string = '#404040';
  //   const borderStyle = {
  //     row: {
  //       top: {
  //         borderTopWidth: boxGroupBorderSize,
  //         borderTopColor: boxGroupBorderColor,
  //       },
  //       bottom: {
  //         borderBottomWidth: boxGroupBorderSize,
  //         borderBottomColor: boxGroupBorderColor,
  //       },
  //     },
  //     column: {
  //       start: {
  //         borderStartWidth: boxGroupBorderSize,
  //         borderStartColor: boxGroupBorderColor,
  //       },
  //       end: {
  //         borderEndWidth: boxGroupBorderSize,
  //         borderEndColor: boxGroupBorderColor,
  //       },
  //     },
  //   };

  //   const borderTopOrStartWidth = (type === 'row') ? 'borderTopWidth' : (type === 'column') && 'borderStartWidth';
  //   const borderBottomOrEndWidth = (type === 'row') ? 'borderBottomWidth' : (type === 'column') && 'borderEndWidth';
  //   const borderTopOrStartColor = (type === 'row') ? 'borderTopColor' : (type === 'column') && 'borderStartColor';
  //   const borderBottomOrEndColor = (type === 'row') ? 'borderBottomColor' : (type === 'column') && 'borderEndColor';

  //   borderOf.forEach((borderOfIndexValue, borderOfIndex) => {
  //     borderOfIndexValue.forEach(boxIndex => {
  //       // console.log('boxIndex', boxIndex);

  //       // top/start
  //       if(borderOfIndex === 0) {
  //         box[boxIndex].props.style = {...box[boxIndex].props.style, ...(type === 'row') ? borderStyle.row.top : (type === 'column') && borderStyle.column.start};
  //       }

  //       // middle
  //       if(borderOfIndex > 0) {

  //         // row(s) middle
  //         if(type === 'row' && borderOfIndex % boxGroupConfiguration[boxGroupConfigurationOption].row === 0) {
  //           box[boxIndex-size].props.style = {...box[boxIndex].props.style, ...borderStyle.row.bottom};
  //           box[boxIndex].props.style = {...box[boxIndex].props.style, ...borderStyle.row.top};
            
  //         }
          
  //         // column(s) middle
  //         else if(type === 'column' && borderOfIndex % boxGroupConfiguration[boxGroupConfigurationOption].column === 0) {
  //           box[boxIndex-1].props.style = {...box[boxIndex].props.style, ...borderStyle.column.end};
  //           box[boxIndex].props.style = {...box[boxIndex].props.style, ...borderStyle.column.start};
  //         }
  //       }

  //       // bottom/end
  //       if(borderOfIndex + 1 === size) {
  //         box[boxIndex].props.style = {...box[boxIndex].props.style, ...(type === 'row') ? borderStyle.row.bottom : (type === 'column') && borderStyle.column.end};
  //       }
  //     });
  //   });

  //   // middle

  //   //   // row(s) middle
  //   //   if(boxRowIndex > 0 && boxRowIndex % boxGroupConfiguration[boxGroupConfigurationOption].row === 0) {
  //   //     boxRowIndexValue.forEach(boxIndex => {
  //   //       box[boxIndex-size].props.style = {...box[boxIndex].props.style, borderBottomColor: boxGroupBorderColor};
  //   //       box[boxIndex].props.style = {...box[boxIndex].props.style, borderTopColor: boxGroupBorderColor};
  //   //     });
  //   //   }

  //   //   // column(s) middle
  //   //   if(boxColumnIndex > 0 && boxColumnIndex % boxGroupConfiguration[boxGroupConfigurationOption].column === 0) {
  //   //     boxColumnIndexValue.forEach(boxIndex => {
  //   //       box[boxIndex-1].props.style = {...box[boxIndex].props.style, borderEndColor: boxGroupBorderColor};
  //   //       box[boxIndex].props.style = {...box[boxIndex].props.style, borderStartColor: boxGroupBorderColor};
  //   //     });
  //   //   }



  //   // // set box row border
  //   // boxRowIndex.forEach((boxRowIndexValue, boxRowIndex) => {
  //   //   // row top
  //   //   if(boxRowIndex === 0) {
  //   //     boxRowIndexValue.forEach(boxIndex => {
  //   //       box[boxIndex].props.style = {...box[boxIndex].props.style, borderTopWidth: boxGroupBorderSize, borderTopColor: boxGroupBorderColor};
  //   //     });
  //   //   }

  //   //   // row(s) middle
  //   //   if(boxRowIndex > 0 && boxRowIndex % boxGroupConfiguration[boxGroupConfigurationOption].row === 0) {
  //   //     boxRowIndexValue.forEach(boxIndex => {
  //   //       box[boxIndex-size].props.style = {...box[boxIndex].props.style, borderBottomColor: boxGroupBorderColor};
  //   //       box[boxIndex].props.style = {...box[boxIndex].props.style, borderTopColor: boxGroupBorderColor};
  //   //     });
  //   //   }

  //   //   // row bottom
  //   //   if(boxRowIndex + 1 === size) {
  //   //     boxRowIndexValue.forEach(boxIndex => {
  //   //       box[boxIndex].props.style = {...box[boxIndex].props.style, borderBottomWidth: boxGroupBorderSize, borderBottomColor: boxGroupBorderColor};
  //   //     });
  //   //   }
  //   // });

  //   // // set box column border
  //   // boxColumnIndex.forEach((boxColumnIndexValue, boxColumnIndex) => {
  //   //   // column start
  //   //   if(boxColumnIndex === 0) {
  //   //     boxColumnIndexValue.forEach(boxIndex => {
  //   //       box[boxIndex].props.style = {...box[boxIndex].props.style, borderStartWidth: boxGroupBorderSize, borderStartColor: boxGroupBorderColor};
  //   //     });
  //   //   }

  //   //   // column(s) middle
  //   //   if(boxColumnIndex > 0 && boxColumnIndex % boxGroupConfiguration[boxGroupConfigurationOption].column === 0) {
  //   //     boxColumnIndexValue.forEach(boxIndex => {
  //   //       box[boxIndex-1].props.style = {...box[boxIndex].props.style, borderEndColor: boxGroupBorderColor};
  //   //       box[boxIndex].props.style = {...box[boxIndex].props.style, borderStartColor: boxGroupBorderColor};
  //   //     });
  //   //   }
      
  //   //   // column end
  //   //   if(boxColumnIndex + 1 === size) {
  //   //     boxColumnIndexValue.forEach(boxIndex => {
  //   //       box[boxIndex].props.style = {...box[boxIndex].props.style, borderEndWidth: boxGroupBorderSize, borderEndColor: boxGroupBorderColor};
  //   //     });
  //   //   }
  //   // });

  //   box.forEach((value, index) => {
  //     // console.log(`box [${index}]\t= `, value.props.style);
  //   });

  //   // console.log(box[0].props.height);
  // };



  function createBox() {
    const thisBoxIndex: {
      row: Array<number>[],
      column: Array<number>[],
      group: Array<number>[],
    } = createBoxIndex();
    const thisBoxValue: Array<number> = createBoxValue('medium', thisBoxIndex);
    let thisBox: Array<JSX.Element> = [];

    for(let boxCount=0; boxCount<size*size; boxCount++) {
      thisBox.push(
        <TouchableOpacity key={boxCount} style={styles.box}>
          <Text style={styles.boxText}>{thisBoxValue[boxCount]}</Text>
        </TouchableOpacity>
      );
    }

    setBox(thisBox);

    // setBoxBorder(box, 'row', boxRowIndex); // row
    // setBoxBorder(box, 'column', boxColumnIndex); // column
  };

  function createBoxIndex() {
    const boxRowIndex: Array<number>[] = [];
    const boxColumnIndex: Array<number>[] = [];
    const boxGroupIndex: Array<number>[] = [];
    
    // set array of index
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

    return {
      row: boxRowIndex,
      column: boxColumnIndex,
      group: boxGroupIndex,
    };
  };

  function createBoxValue(difficulty: string, boxIndex: {row: Array<number>[], column: Array<number>[], group: Array<number>[]}) {
    let boxValues: Array<number> = [];
    let percentage: number = 0;

    // set the percentage (total of number to be used) based on difficulty
    switch(difficulty) {
      case 'hard':
        percentage = 2.5;
        break;
      case 'medium':
        percentage = 5;
        break;
      case 'easy':
        percentage = 7.5;
        break;
    }
    
    // for(let index=0, rowIndex=0; index<size*size; index++) {
    //   if(isValueFittable(boxValues, boxIndex, Math.floor((Math.random()*10) + 1))) {

    //   }

    //   ((index+1) % size === 0) && rowIndex++;
    // }
    isBoxValueExist(boxValues, boxIndex, Math.floor((Math.random()*size) + 1))
    

    // console.log(`percentage = ${percentage}`);
    // console.log('boxValues', boxValues);
    return boxValues;
  };

  function isBoxValueExist(boxValues: Array<number>, boxIndex: {row: Array<number>[], column: Array<number>[], group: Array<number>[]}, value: number) {
    let fit: boolean;
    let location: {row: number, column: number, group: number};

    // get the location of value
    
    console.log(`value = ${value}`);

    // check if value exist in row
    // const location

    fit = true;

    return fit;
  }

  useEffect(() => {
    createBox();
  }, []);



  return(
    <View style={_globalStyles.screen}>
      {renderBox()}
    </View>
  );
}
