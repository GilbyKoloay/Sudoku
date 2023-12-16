import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

import { RootStackParamList } from '../../navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'Poppins-Regular',
    fontSize: 32,
  },
});

const Splash: React.FC<Props> = ({ navigation }): React.JSX.Element => {
  useEffect(() => {
    setTimeout(() => navigation.replace('Home'), 500);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, flexDirection: 'row' }}>
      <View style={[styles.wrapper, { backgroundColor: '#1c1917' }]}>
        <Text style={[styles.title, { color: '#f5f5f4', textAlign: 'right' }]}>
          Sud
        </Text>
      </View>

      <View style={[styles.wrapper, { backgroundColor: '#f5f5f4' }]}>
        <Text style={[styles.title, { color: '#1c1917' }]}>oku</Text>
      </View>
    </SafeAreaView>
  );
};

export default Splash;
