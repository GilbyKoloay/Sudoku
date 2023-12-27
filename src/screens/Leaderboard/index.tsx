import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { SafeAreaView, Text } from 'react-native';
import { useSelector } from 'react-redux';

import { supabaseClient } from '../../helpers';
import { screen } from '../../styles';
import type { GameMode, ReduxState } from '../../types';
import { NavigationParamList } from '../../types';
import type { Leaderboard as LeaderboardType } from './Types';

type Props = NativeStackScreenProps<NavigationParamList, 'Leaderboard'>;

async function getLeaderboard(
  leaderboardName: GameMode,
): Promise<LeaderboardType[]> {
  const { data } = await supabaseClient
    .from(`${leaderboardName}Leaderboard`)
    .select();

  return data || [];
}

const Leaderboard: React.FC<Props> = ({ navigation }): React.ReactNode => {
  const { gameMode, primaryColor } = useSelector(
    (state: ReduxState) => state.app,
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [easyLeaderboard, setEasyLeaderboard] = useState<LeaderboardType[]>([]);
  const [mediumLeaderboard, setMediumLeaderboard] = useState<LeaderboardType[]>(
    [],
  );
  const [hardLeaderboard, setHardLeaderboard] = useState<LeaderboardType[]>([]);

  useEffect(() => {
    getLeaderboards();
  }, []);

  async function getLeaderboards(): Promise<void> {
    const newEasyLeaderboard = await getLeaderboard('Easy');
    const newMediumLeaderboard = await getLeaderboard('Medium');
    const newHardLeaderboard = await getLeaderboard('Hard');

    setEasyLeaderboard(newEasyLeaderboard);
    setMediumLeaderboard(newMediumLeaderboard);
    setHardLeaderboard(newHardLeaderboard);
  }

  return (
    <SafeAreaView style={[screen.screen, { backgroundColor: primaryColor }]}>
      <Text>Leaderboard</Text>
      {<Text>{isLoading ? 'loading' : 'loaded'}</Text>}
    </SafeAreaView>
  );
};

export default Leaderboard;
