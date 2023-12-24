import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState, useEffect } from 'react';
import { SafeAreaView, Text } from 'react-native';

import { supabaseClient } from '../../helpers';
import { screen } from '../../styles';
import { NavigationParamList } from '../../types';
import { useSelector } from 'react-redux';
import type { ReduxState } from '../../types';

type Props = NativeStackScreenProps<NavigationParamList, 'Leaderboard'>;
type Leaderboard = {
  id: string;
  createdAt: Date;
  username: string | null;
  score: number;
  note: string;
};

const Leaderboard: React.FC<Props> = ({ navigation }): React.ReactNode => {
  const { gameMode, primaryColor } = useSelector(
    (state: ReduxState) => state.app,
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [leaderboard, setLeaderboard] = useState<Leaderboard[]>([]);

  useEffect(() => {
    getLeaderboard();
  }, []);

  async function getLeaderboard() {
    const { data, error } = await supabaseClient
      .from('leaderboard')
      .select();
    
    if (error) {
      setLeaderboard([]);
    }

    if (data) {
      setLeaderboard(data);
    }
  }

  return (
    <SafeAreaView style={[screen.screen, {backgroundColor: primaryColor}]}>
      <Text>Leaderboard</Text>
      {<Text>{isLoading ? 'loading' : 'loaded'}</Text>}
    </SafeAreaView>
  );
};

export default Leaderboard;
