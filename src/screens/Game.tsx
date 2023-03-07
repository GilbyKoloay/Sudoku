import { useState, useEffect } from 'react';
import { View } from 'react-native';
import { SudokuBox } from '../components';
import {
  initializeBoxValues,
  setBoxValue,
  setBoxUserValue,
  setBoxJSX
} from '../functions';
import {
  styles as globalStyles,
  interfaces as globalInterfaces
} from '../global';



export default function({ navigation, route }: { navigation: object; route: any }) {
  const { sudokuSize, sudokuBoxGroupSize, difficulty }: {
    sudokuSize: number,
    sudokuBoxGroupSize: globalInterfaces['sudokuBoxGroupSize'],
    difficulty: number
  } = route.params;
  const [box, setBox] = useState <globalInterfaces['box']> ([]);



  function createBox(): void {console.log("now in 'createBox()'")
    let thisBox: globalInterfaces['box'] = initializeBoxValues(sudokuSize);
    thisBox = setBoxValue(thisBox, sudokuSize, sudokuBoxGroupSize);
    thisBox = setBoxUserValue(thisBox, sudokuSize, difficulty);
    thisBox = setBoxJSX(thisBox, sudokuSize, sudokuBoxGroupSize);

    setBox(thisBox);
    console.log("end of 'createBox()'");
  }



  useEffect(() => {
    createBox();
  }, []);



  return (
    <View style={globalStyles.screen}>
      <SudokuBox props={{box}} />
    </View>
  );
};
