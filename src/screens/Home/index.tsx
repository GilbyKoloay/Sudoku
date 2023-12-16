import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from '../../components';
import { globalStyles } from '../../global';
import { RootStackParamList } from '../../navigation';
import { RootState, app } from '../../redux';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const Home: React.FC<Props> = ({ navigation }): React.JSX.Element => {
  const dispatch = useDispatch();
  const { gameMode, primaryColor } = useSelector(
    (state: RootState) => state.app,
  );

  function handleModeOnPress() {
    dispatch(app.switchGameMode());
  }

  function handleNewGameOnPress() {
    navigation.push('Game');
  }

  function handleSwitchThemeOnPress() {
    dispatch(app.switchTheme());
  }

  return (
    <SafeAreaView
      style={[
        globalStyles.screen,
        {
          backgroundColor: primaryColor,
          justifyContent: 'center',
          alignItems: 'center',
        },
      ]}
    >
      <View style={{ width: '75%', gap: 16 }}>
        <Button onPress={handleNewGameOnPress} type='solid' size='lg'>
          New Game
        </Button>
        <Button onPress={handleModeOnPress} type='outline' size='lg'>
          Mode: {gameMode}
        </Button>
        <Button onPress={handleSwitchThemeOnPress} type='outline' size='lg'>
          Switch Theme
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default Home;
