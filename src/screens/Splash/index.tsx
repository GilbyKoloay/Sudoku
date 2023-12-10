import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect } from 'react';
import { SafeAreaView, Text } from 'react-native';

import { RootStackParamList } from '../../navigation';
import { globalStyles } from '../../global';

type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>

const Splash: React.FC<Props> = ({ navigation }): React.JSX.Element => {
  useEffect(() => {
    setTimeout(() => navigation.replace('Home'), 500);
  }, []);

  return (
    <SafeAreaView style={globalStyles.screen}>
      <Text style={globalStyles.text}>Splash</Text>
    </SafeAreaView>
  );
};

export default Splash;
