import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { globalStyles } from '../../global';
import { RootStackParamList } from '../../navigation';
import { RootState, app } from '../../redux';
import Button from './Button';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>

const Home: React.FC<Props> = ({ navigation }): React.JSX.Element => {
  const dispatch = useDispatch();
  const { mode, primaryColor } = useSelector((state: RootState) => state.app);

  function handleModeOnPress() {
    dispatch(app.switchMode());
  }

  function handleNewGameOnPress() {
    navigation.push('Game');
  }

  function handleSwitchThemeOnPress() {
    dispatch(app.switchTheme());
  }

  return (
    <SafeAreaView
      style={[globalStyles.screen, {
        backgroundColor: primaryColor,
        justifyContent: 'center',
        alignItems: 'center'
      }]}
    >
      <View style={{width: '50%', gap: 16}}>
        <Button onPress={handleNewGameOnPress}>New Game</Button>
        <Button onPress={handleModeOnPress} type='outline'>Mode: {mode}</Button>
        <Button onPress={handleSwitchThemeOnPress} type='outline'>Switch Theme</Button>
      </View>
    </SafeAreaView>
  );
};

export default Home;
