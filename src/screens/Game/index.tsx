import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { Pressable, SafeAreaView, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from '../../components';
import { app } from '../../redux';
import { screen, text } from '../../styles';
import type { ReduxState } from '../../types';
import { NavigationParamList } from '../../types';
import CongratulationModal from './CongratulationModal';
import type { Sudoku } from './Types';
import createSudoku from './createSudoku';

type Props = NativeStackScreenProps<NavigationParamList, 'Game'>;

const size = 9;

function isCompleteChecker(sudoku: Sudoku): boolean {
  let isCompleted = true;

  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      if (
        !sudoku[row][col].isLocked &&
        sudoku[row][col].actualValue !== sudoku[row][col].userValue
      )
        isCompleted = false;
    }
  }

  return isCompleted;
}

const Game: React.FC<Props> = ({ navigation }): React.ReactNode => {
  const dispatch = useDispatch();
  const { primaryColor, secondaryColor, gameMode } = useSelector(
    (state: ReduxState) => state.app,
  );
  const [sudoku, setSudoku] = useState<Sudoku>([[{}]]);
  const [selected, setSelected] = useState<{ row: number; col: number }>({
    row: -1,
    col: -1,
  });
  const [score, setScore] = useState<number>(0);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  useEffect(() => {
    setSudoku(createSudoku(gameMode, 9));
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (sudoku.length > 1) {
      timer = setInterval(() => setScore(prev => prev + 1), 1000);

      if (isCompleteChecker(sudoku)) {
        if (timer) clearInterval(timer);
        setSelected({ row: -1, col: -1 });
        setIsCompleted(true);
        setIsModalVisible(true);
      }
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [sudoku]);

  function handleSwitchThemeOnPress(): void {
    dispatch(app.switchTheme());
  }

  function handleCellOnPress(row: number, col: number): void {
    setSelected({ row, col });
  }

  function handleNumberOnPress(number: number): void {
    if (
      selected.row >= 0 &&
      selected.col >= 0 &&
      !sudoku[selected.row][selected.col].isLocked
    ) {
      let newSudoku: Sudoku = [...sudoku];

      if (newSudoku[selected.row][selected.col].userValue === number)
        newSudoku[selected.row][selected.col].userValue = null;
      else newSudoku[selected.row][selected.col].userValue = number;

      setSudoku(newSudoku);
    }
  }

  function congratulationModalHandleGoToLeaderboardOnPress() {
    navigation.replace('Leaderboard');
  }

  return (
    <SafeAreaView
      style={[
        screen.screen,
        { backgroundColor: primaryColor, justifyContent: 'space-between' },
      ]}
    >
      <View style={{ width: '50%', alignSelf: 'flex-end' }}>
        <Button onPress={handleSwitchThemeOnPress} size='md'>
          Switch Theme
        </Button>
      </View>

      {sudoku.length === 1 ? (
        <Text style={[text.lg, { color: secondaryColor, textAlign: 'center' }]}>
          Loading ...
        </Text>
      ) : (
        <View>
          <Text style={[text.md, { color: secondaryColor }]}>
            Score: {score}
          </Text>

          <View style={{ borderWidth: 1, borderColor: secondaryColor }}>
            {[...new Array(size)].map((_, rowIndex) => (
              <View
                key={rowIndex}
                style={{
                  flexDirection: 'row',
                }}
              >
                {[...new Array(size)].map((__, colIndex) => (
                  <Pressable
                    key={colIndex}
                    style={{
                      flex: 1,
                      borderWidth: 1,
                      borderTopColor:
                        rowIndex % 3 === 0 ? secondaryColor : primaryColor,
                      borderBottomColor:
                        (rowIndex - 2) % 3 === 0
                          ? secondaryColor
                          : primaryColor,
                      borderLeftColor:
                        colIndex % 3 === 0 ? secondaryColor : primaryColor,
                      borderRightColor:
                        (colIndex - 2) % 3 === 0
                          ? secondaryColor
                          : primaryColor,
                      aspectRatio: 1,
                    }}
                    onPress={() => handleCellOnPress(rowIndex, colIndex)}
                    disabled={isCompleted}
                  >
                    <View
                      style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor:
                          rowIndex === selected.row && colIndex === selected.col
                            ? secondaryColor
                            : 'transparent',
                      }}
                    >
                      {sudoku[rowIndex][colIndex].isLocked ? (
                        <Text style={[text.lg, { color: '#737373' }]}>
                          {sudoku[rowIndex][colIndex].actualValue}
                        </Text>
                      ) : (
                        <Text
                          style={[
                            text.lg,
                            {
                              color:
                                sudoku[rowIndex][colIndex].actualValue !==
                                sudoku[rowIndex][colIndex].userValue
                                  ? '#ef4444'
                                  : rowIndex === selected.row &&
                                    colIndex === selected.col
                                  ? primaryColor
                                  : secondaryColor,
                            },
                          ]}
                        >
                          {sudoku[rowIndex][colIndex].userValue}
                        </Text>
                      )}
                    </View>
                  </Pressable>
                ))}
              </View>
            ))}
          </View>
        </View>
      )}

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        {[...new Array(size)].map((_, index) => (
          <View key={index} style={{ flex: 1 }}>
            <Button
              onPress={() => handleNumberOnPress(index + 1)}
              size='lg'
              disabled={isCompleted}
            >
              {index + 1}
            </Button>
          </View>
        ))}
      </View>

      <CongratulationModal
        visible={isModalVisible}
        setVisible={setIsModalVisible}
        score={score}
        handleGoToLeaderboardOnPress={
          congratulationModalHandleGoToLeaderboardOnPress
        }
      />
    </SafeAreaView>
  );
};

export default Game;
