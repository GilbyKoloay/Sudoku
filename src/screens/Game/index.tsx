import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView, Text } from 'react-native';

import { globalStyles } from '../../global';
import { RootStackParamList } from '../../navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Game'>

const Game: React.FC<Props> = ({ navigation }): React.JSX.Element => {
  return (
    <SafeAreaView style={globalStyles.screen}>
    <Text style={globalStyles.text}>Game</Text>
    </SafeAreaView>
  );
};

export default Game;
