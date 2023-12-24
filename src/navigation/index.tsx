import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Game, Home, Splash, Leaderboard } from '../screens';
import { NavigationParamList } from '../types';

const Stack = createNativeStackNavigator<NavigationParamList>();

const Navigation: React.FC = (): React.ReactNode => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Splash'
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name='Splash' component={Splash} />
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='Game' component={Game} />
        <Stack.Screen name='Leaderboard' component={Leaderboard} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
