import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { useSelector } from 'react-redux';

import { Button } from '../../components';
import { supabaseClient } from '../../helpers';
import { screen, text } from '../../styles';
import type { GameMode, ReduxState } from '../../types';
import { NavigationParamList } from '../../types';
import List from './List';
import type { Leaderboard as LeaderboardType } from './Types';

type Props = NativeStackScreenProps<NavigationParamList, 'Leaderboard'>;

async function getLeaderboard(
  leaderboardName: GameMode,
): Promise<LeaderboardType[]> {
  const { data } = await supabaseClient
    .from(`${leaderboardName}Leaderboard`)
    .select()
    .order('time');

  return data || [];
}

const Leaderboard: React.FC<Props> = ({ navigation }): React.ReactNode => {
  const { primaryColor, secondaryColor } = useSelector(
    (state: ReduxState) => state.app,
  );
  const [easyLeaderboard, setEasyLeaderboard] = useState<LeaderboardType[] | null>(null);
  const [mediumLeaderboard, setMediumLeaderboard] = useState<LeaderboardType[] | null>(
    null,
  );
  const [hardLeaderboard, setHardLeaderboard] = useState<LeaderboardType[] | null>(null);
  const [selectedLeaderboard, setSelectedLeaderboard] = useState<GameMode>('Easy');

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

  function handleEasyOnPress() {
    setSelectedLeaderboard('Easy');
  }

  function handleMediumOnPress() {
    setSelectedLeaderboard('Medium');
  }

  function handleHardOnPress() {
    setSelectedLeaderboard('Hard');
  }

  return (
    <SafeAreaView style={[screen.screen, { backgroundColor: primaryColor }]}>
      <Text style={[text.lg, {color: secondaryColor, textAlign: 'center'}]}>Leaderboard</Text>

      <View style={{marginTop: 16, flexDirection: 'row', gap: 16}}>
        <View style={{flex: 1}}>
          <Button onPress={handleEasyOnPress} size='md' type={(selectedLeaderboard === 'Easy') ? 'solid' : 'none'} disabled={selectedLeaderboard === 'Easy'}>Easy</Button>
        </View>
        <View style={{flex: 1}}>
          <Button onPress={handleMediumOnPress} size='md' type={(selectedLeaderboard === 'Medium') ? 'solid' : 'none'} disabled={selectedLeaderboard === 'Medium'}>Medium</Button>
        </View>
        <View style={{flex: 1}}>
          <Button onPress={handleHardOnPress} size='md' type={(selectedLeaderboard === 'Hard') ? 'solid' : 'none'} disabled={selectedLeaderboard === 'Hard'}>Hard</Button>
        </View>
      </View>

      {(selectedLeaderboard === 'Easy') && <List list={easyLeaderboard} />}
      {(selectedLeaderboard === 'Medium') && <List list={mediumLeaderboard} />}
      {(selectedLeaderboard === 'Hard') && <List list={hardLeaderboard} />}
    </SafeAreaView>
  );
};

export default Leaderboard;
