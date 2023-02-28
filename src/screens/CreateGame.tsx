import React, { useState, useCallback } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Button
} from 'react-native';
import globalStyles from './_globalStyles';



const styles = StyleSheet.create({
  section: {
    padding: 5
  },
  textBig: {
    fontSize: 17.5,
    color: '#404040'
  },
  textSmall: {
    fontSize: 15,
    color: '#404040'
  },
  textErrorSmall: {
    fontSize: 15,
    color: '#FF4040'
  },
  textInput: {
    padding: 5,
    borderWidth: 1,
    fontSize: 15,
    color: '#404040'
  },
  option: {
    flex: 1,
    borderWidth: 1,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

interface interfaces {
  sudokuBoxGroupSizeList: Array<{row: number, col: number}>
};

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



function checkIfNumberIsPrime(value: number): boolean {
  for(let number=2; number<value; number++) {
    if(value % number === 0) return false;
  }

  return true;
}

function countTotalOfSudokuBoxGroupSize(size: number): interfaces["sudokuBoxGroupSizeList"] {
  const sudokuBoxGroupSizeList: interfaces["sudokuBoxGroupSizeList"] = [];

  for(let rowCount=2; rowCount<size/2; rowCount++) {
    for(let colCount=rowCount; colCount<=size/2; colCount++) {
      (rowCount * colCount === size) && sudokuBoxGroupSizeList.push({row: rowCount, col: colCount});
    }
  }

  return sudokuBoxGroupSizeList;
}



const InputSudokuSize = ({ props }: { props: {
  sudokuSize: string,
  checkIfSudokuSizeIsPlayable: Function,
  sudokuSizeNotPlayableErrorMessage: string
}}): JSX.Element => {
  const { sudokuSize, checkIfSudokuSizeIsPlayable, sudokuSizeNotPlayableErrorMessage } = props;

  return (
    <View style={styles.section}>
      <Text style={styles.textBig}>Input Sudoku Size: </Text>
      <TextInput
        style={styles.textInput}
        keyboardType='number-pad'
        value={sudokuSize}
        onChangeText={value => checkIfSudokuSizeIsPlayable(value)}
      />
      {((sudokuSizeNotPlayableErrorMessage).length > 0) && <Text style={styles.textErrorSmall}>{sudokuSizeNotPlayableErrorMessage}</Text>}
    </View>
  );
};

const SelectSudokuBoxGroupSize = ({ props }: { props: {
  sudokuBoxGroupSizeList: interfaces["sudokuBoxGroupSizeList"],
  selectedBoxGroupSize: number,
  setSelectedBoxGroupSize: Function
}}): JSX.Element => {
  const { sudokuBoxGroupSizeList, selectedBoxGroupSize, setSelectedBoxGroupSize } = props;

  return (
    <View style={styles.section}>
      <Text style={styles.textBig}>Select Sudoku Box Group Size: </Text>
      <View style={{flexDirection: 'row'}}>
        {sudokuBoxGroupSizeList.map((value, index) => (
          <TouchableOpacity
            key={index}
            style={(selectedBoxGroupSize === index) ? StyleSheet.compose(styles.option, {backgroundColor: '#00CC00'}) : styles.option}
            delayPressIn={0}
            onPressIn={() => setSelectedBoxGroupSize(index)}
            activeOpacity={0.5}
          >
            <Text style={styles.textSmall}>{value.row} x {value.col}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const SelectDifficulty = ({ props }: { props: {
  selectedDifficulty: number,
  setSelectedDifficulty: Function,
}}): JSX.Element => {
  const { selectedDifficulty, setSelectedDifficulty } = props;
  
  return (
    <View style={styles.section}>
      <Text style={styles.textBig}>Select Difficulty: </Text>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          style={(selectedDifficulty === difficulty.easy) ? StyleSheet.compose(styles.option, {backgroundColor: '#00CC00'}) : styles.option}
          delayPressIn={0}
          onPressIn={() => setSelectedDifficulty(difficulty.easy)}
          activeOpacity={0.5}
        >
          <Text style={styles.textSmall}>Easy</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={(selectedDifficulty === difficulty.medium) ? StyleSheet.compose(styles.option, {backgroundColor: '#00CC00'}) : styles.option}
          delayPressIn={0}
          onPressIn={() => setSelectedDifficulty(difficulty.medium)}
          activeOpacity={0.5}
        >
          <Text style={styles.textSmall}>Medium</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={(selectedDifficulty === difficulty.hard) ? StyleSheet.compose(styles.option, {backgroundColor: '#00CC00'}) : styles.option}
          delayPressIn={0}
          onPressIn={() => setSelectedDifficulty(difficulty.hard)}
          activeOpacity={0.5}
        >
          <Text style={styles.textSmall}>Hard</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};



export default function({ navigation }: { navigation: any }) {
  const [sudokuSize, setSudokuSize] = useState <string> ('');
  const [isSudokuSizePlayable, setIsSudokuSizePlayable] = useState <boolean> (false);
  const [sudokuSizeNotPlayableErrorMessage, setSudokuSizeNotPlayableErrorMessage] = useState <string> ('');
  const [sudokuBoxGroupSizeList, setSudokuBoxGroupSizeList] = useState <interfaces["sudokuBoxGroupSizeList"]> ([]);
  const [selectedBoxGroupSize, setSelectedBoxGroupSize] = useState <number> (0);
  const [selectedDifficulty, setSelectedDifficulty] = useState <number> (difficulty.easy);



  const checkIfSudokuSizeIsPlayable = useCallback((inputtedSudokuSize: any) => {console.log('not using useCallback (checkIfSudokuSizeIsPlayable)');
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
      {isSudokuSizePlayable && <SelectSudokuBoxGroupSize props={{sudokuBoxGroupSizeList, selectedBoxGroupSize, setSelectedBoxGroupSize}} />}
      {isSudokuSizePlayable && <SelectDifficulty props={{selectedDifficulty, setSelectedDifficulty}} />}
      {isSudokuSizePlayable && (
        <Button
          title="Create Game"
          onPress={() => navigation.navigate('Game', {
            size: parseInt(sudokuSize),
            boxGroupSize: sudokuBoxGroupSizeList[selectedBoxGroupSize],
            difficulty
          })}
          color='#00EC00'
        />
      )}
    </View>
  );
}
