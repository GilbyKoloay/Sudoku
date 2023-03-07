import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import {
  styles as globalStyles,
  interfaces as globalInterfaces
} from '../global';



export default function({ props }: { props: {
  sudokuBoxGroupSizeList: globalInterfaces["sudokuBoxGroupSizeList"],
  selectedBoxGroupSize: number,
  setSelectedBoxGroupSize: Function
}}) {
  const { sudokuBoxGroupSizeList, selectedBoxGroupSize, setSelectedBoxGroupSize } = props;

  return (
    <View style={globalStyles.section}>
      <Text style={globalStyles.textSmall}>Select Sudoku Box Group Size: </Text>
      <View style={{flexDirection: 'row'}}>
        {sudokuBoxGroupSizeList.map((value, index) => (
          <TouchableOpacity
            key={index}
            style={(selectedBoxGroupSize === index)
              ? StyleSheet.compose(globalStyles.option, {backgroundColor: '#00CC00'})
              : globalStyles.option
            }
            delayPressIn={0}
            onPressIn={() => setSelectedBoxGroupSize(index)}
            activeOpacity={0.5}
          >
            <Text style={globalStyles.textSmall}>{value.row} x {value.col}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};
