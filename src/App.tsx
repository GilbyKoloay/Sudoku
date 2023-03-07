import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CreateGame, Game, GameOld } from './screens';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='CreateGame'
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name='CreateGame' component={CreateGame} />
        <Stack.Screen name='Game' component={Game} />
        <Stack.Screen name='GameOld' component={GameOld} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
