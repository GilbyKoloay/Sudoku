import { View, Text, StyleSheet } from 'react-native';
import { interfaces as globalInterfaces } from '../global';



const styles = StyleSheet.create({
  sudokuBox: {
    borderWidth: 1,
    flex: 1
  },
  boxRow: {flexDirection: 'row'},
});



export default function({ props }: { props: {box: globalInterfaces['box']} }) {console.log("now in 'SudokuBox'");
  const { box } = props;

  if(box.length === 0) return <Text>Loading ...</Text>

  return (
    <View style={styles.sudokuBox}>
      {box.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.boxRow}>
          {row.map(box => box.JSX)}
        </View>
      ))}
    </View>
  );
};
