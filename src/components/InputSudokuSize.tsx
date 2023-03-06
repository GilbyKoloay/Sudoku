import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { styles as globalStyles } from '../global';



export default function({ props }: { props: {
  sudokuSize: string,
  checkIfSudokuSizeIsPlayable: Function,
  sudokuSizeNotPlayableErrorMessage: string
}}) {
  const { sudokuSize, checkIfSudokuSizeIsPlayable, sudokuSizeNotPlayableErrorMessage } = props;


  
  return (
    <View style={globalStyles.section}>
      <Text style={globalStyles.textMedium}>Input Sudoku Size: </Text>
      <TextInput
        style={globalStyles.textInput}
        keyboardType='number-pad'
        value={sudokuSize}
        onChangeText={(value) => checkIfSudokuSizeIsPlayable(value)}
      />
      {sudokuSizeNotPlayableErrorMessage.length > 0 && (
        <Text style={globalStyles.textErrorSmall}>{sudokuSizeNotPlayableErrorMessage}</Text>
      )}
    </View>
  );
};
