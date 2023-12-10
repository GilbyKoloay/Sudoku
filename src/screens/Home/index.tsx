import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect } from 'react';
import { SafeAreaView, Text } from 'react-native';

import { RootStackParamList } from '../../navigation';
import { globalStyles } from '../../global';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>

const Home: React.FC<Props> = ({ navigation }): React.JSX.Element => {
  useEffect(() => {
    navigation.navigate('Home');
  }, []);

  return (
    <SafeAreaView style={globalStyles.screen}>
    <Text style={globalStyles.text}>Home</Text>
    </SafeAreaView>
  );
};

export default Home;
