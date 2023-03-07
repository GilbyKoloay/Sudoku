import { useState, useCallback } from 'react';
import { View, Button } from 'react-native';
import { InputSudokuSize, SelectSudokuBoxGroupSize, SelectDifficulty } from '../components';
import { checkIfNumberIsPrime, countTotalOfSudokuBoxGroupSize } from '../functions';
import {
  styles as globalStyles,
  interfaces as globalInterfaces
} from '../global';



const sudokuSizeLimit: number = 25;
const difficulty: {
  easy: number,
  medium: number,
  hard: number
} = {
  easy: 0.25,
  medium: 0.5,
  hard: 0.75
};



export default function({ navigation }: { navigation: any }) {
  const [sudokuSize, setSudokuSize] = useState <string> ('');
  const [isSudokuSizePlayable, setIsSudokuSizePlayable] = useState <boolean> (false);
  const [sudokuSizeNotPlayableErrorMessage, setSudokuSizeNotPlayableErrorMessage] = useState <string> ('');
  const [sudokuBoxGroupSizeList, setSudokuBoxGroupSizeList] = useState <globalInterfaces['sudokuBoxGroupSizeList']> ([]);
  const [selectedBoxGroupSize, setSelectedBoxGroupSize] = useState <number> (0);
  const [selectedDifficulty, setSelectedDifficulty] = useState <number> (difficulty.easy);



  const checkIfSudokuSizeIsPlayable = useCallback((inputtedSudokuSize: any) => {
    setSudokuSize(inputtedSudokuSize);
    setIsSudokuSizePlayable(false);
    setSudokuBoxGroupSizeList([]);
    setSelectedBoxGroupSize(0);
    setSelectedDifficulty(difficulty.easy);

    inputtedSudokuSize = parseInt(inputtedSudokuSize); // change the inputted size to number type to calculate it easily

    if(isNaN(inputtedSudokuSize)) {
      setSudokuSizeNotPlayableErrorMessage('');
    }
    else if(inputtedSudokuSize <= 5) {
      setSudokuSizeNotPlayableErrorMessage('* Size must be more than 5.');
    }
    else if(inputtedSudokuSize > sudokuSizeLimit) {
      setSudokuSizeNotPlayableErrorMessage("* lmao don't crash the game mate.");
    }
    else if(checkIfNumberIsPrime(inputtedSudokuSize)) {
      setSudokuSizeNotPlayableErrorMessage('* Size is a prime number.');
    }
    else {
      setIsSudokuSizePlayable(true);
      setSudokuSizeNotPlayableErrorMessage('');
      setSudokuBoxGroupSizeList(countTotalOfSudokuBoxGroupSize(inputtedSudokuSize));
    }
  }, [sudokuSize]);



  return (
    <View style={globalStyles.screen}>
      <InputSudokuSize props={{sudokuSize, checkIfSudokuSizeIsPlayable, sudokuSizeNotPlayableErrorMessage}} />
      {isSudokuSizePlayable && <SelectSudokuBoxGroupSize props={{sudokuBoxGroupSizeList, selectedBoxGroupSize, setSelectedBoxGroupSize}}/>}
      {isSudokuSizePlayable && <SelectDifficulty props={{difficulty, selectedDifficulty, setSelectedDifficulty}}/>}
      {isSudokuSizePlayable && (
        <Button
          title='Create Game / Game'
          onPress={() => navigation.navigate('Game', {
            sudokuSize: parseInt(sudokuSize),
            sudokuBoxGroupSize: sudokuBoxGroupSizeList[selectedBoxGroupSize],
            difficulty: selectedDifficulty,
          })}
          color='#00EC00'
        />
      )}
      <View style={{height: 50}} />
    </View>
  );
};
