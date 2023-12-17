import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

import { colors } from '../../constants';
import type { NavigationParamList } from '../../types';

type Props = NativeStackScreenProps<NavigationParamList, 'Splash'>;

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

const Splash: React.FC<Props> = ({ navigation }): React.ReactNode => {
  useEffect(() => {
    setTimeout(() => navigation.replace('Home'), 500);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, flexDirection: 'row' }}>
      <View style={[styles.wrapper, { backgroundColor: colors.darkest }]}>
        <Text
          style={[styles.title, { color: colors.light, textAlign: 'right' }]}
        >
          Sud
        </Text>
      </View>

      <View style={[styles.wrapper, { backgroundColor: colors.lightest }]}>
        <Text style={[styles.title, { color: colors.dark }]}>oku</Text>
      </View>
    </SafeAreaView>
  );
};

export default Splash;
