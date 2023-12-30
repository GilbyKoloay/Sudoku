import { ScrollView, Text, View } from 'react-native';
import { useSelector } from 'react-redux';

import { colors } from '../../constants';
import { text } from '../../styles';
import { ReduxState } from '../../types';
import { Leaderboard } from './Types';

type Props = {
  list: Leaderboard[] | null;
};

const List: React.FC<Props> = ({ list }): React.ReactNode => {
  const { primaryColor, secondaryColor } = useSelector(
    (state: ReduxState) => state.app,
  );

  return (
    <View style={{marginTop: 16, flex: 1}}>
      {!list ? (
        <Text style={[text.md, {color: secondaryColor, textAlign: 'center'}]}>Loading ...</Text>
      ) : (list.length === 0) ? (
        <Text style={[text.md, {color: secondaryColor, textAlign: 'center'}]}>Empty</Text>
      ) : (
        <ScrollView>
          {list.map((data, index) => (
            <View key={index} style={{flexDirection: 'row', alignItems: 'center', paddingVertical: 4, borderTopWidth: index ? 1: 0, borderColor: (primaryColor === colors.darkest) ? colors.dark : colors.light}}>
              <Text style={[text.md, {color: secondaryColor, flex: 2, textAlign: 'center'}]}>{index+1}</Text>
              <View style={{flex: 7}}>
                <Text style={[text.md, {color: secondaryColor}]}>{data.username}</Text>
                {data.note && <Text style={[text.sm, {color: colors.neutral}]}>{data.note}</Text>}
              </View>
              <View style={{flex: 3}}>
                <Text style={[text.md, {color: secondaryColor, textAlign: 'center'}]}>{data.time}</Text>
                <Text style={[text.sm, {color: colors.neutral, textAlign: 'center'}]}>{data.createdAt.toString().slice(0, 10)}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};



export default List;
