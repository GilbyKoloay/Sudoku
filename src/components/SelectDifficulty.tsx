import { View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import { styles as globalStyles } from '../global';



export default function({ props }: { props: {
  difficulty: any,
  selectedDifficulty: number,
  setSelectedDifficulty: Function
}}) {
  const { difficulty, selectedDifficulty, setSelectedDifficulty } = props;

  

  return (
    <View style={globalStyles.section}>
      <Text style={globalStyles.textMedium}>Select Difficulty: </Text>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          style={(selectedDifficulty === difficulty.easy)
            ? StyleSheet.compose(globalStyles.option, {backgroundColor: '#00CC00'})
            : globalStyles.option
          }
          delayPressIn={0}
          onPressIn={() => setSelectedDifficulty(difficulty.easy)}
          activeOpacity={0.5}
        >
          <Text style={globalStyles.textSmall}>Easy</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={(selectedDifficulty === difficulty.medium)
            ? StyleSheet.compose(globalStyles.option, {backgroundColor: '#00CC00'})
            : globalStyles.option
          }
          delayPressIn={0}
          onPressIn={() => setSelectedDifficulty(difficulty.medium)}
          activeOpacity={0.5}
        >
          <Text style={globalStyles.textSmall}>Medium</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={(selectedDifficulty === difficulty.hard)
            ? StyleSheet.compose(globalStyles.option, {backgroundColor: '#00CC00'})
            : globalStyles.option
          }
          delayPressIn={0}
          onPressIn={() => setSelectedDifficulty(difficulty.hard)}
          activeOpacity={0.5}
        >
          <Text style={globalStyles.textSmall}>Hard</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
