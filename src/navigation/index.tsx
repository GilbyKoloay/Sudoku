import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Game, Home, Splash } from '../screens';

export type RootStackParamList = {
  Splash: undefined,
  Home: undefined,
  Game: undefined
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const Navigation: React.FC = (): React.JSX.Element => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Game" component={Game} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
