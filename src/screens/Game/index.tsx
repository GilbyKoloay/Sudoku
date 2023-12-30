import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { Pressable, SafeAreaView, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from '../../components';
import { colors } from '../../constants';
import { app } from '../../redux';
import { screen, text } from '../../styles';
import type { ReduxState } from '../../types';
import { NavigationParamList } from '../../types';
import LostModal from './LostModal';
import type { Sudoku } from './Types';
import WonModal from './WonModal';
import createSudoku from './createSudoku';

type Props = NativeStackScreenProps<NavigationParamList, 'Game'>;

const size = 9;

function isCompleteChecker(sudoku: Sudoku): boolean {
  let isOver = true;

  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      if (
        !sudoku[row][col].isLocked &&
        sudoku[row][col].actualValue !== sudoku[row][col].userValue
      )
        isOver = false;
    }
  }

  return isOver;
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
  const [time, setTime] = useState<number>(0);
  const [timeInterval, setTimeInterval] = useState<NodeJS.Timeout | null>(null);
  const [lives, setLives] = useState<number>(3);
  const [gameState, setGameState] = useState<'inProgress' | 'lost' | 'won'>('inProgress');
  const [isLostModalVisible, setIsLostModalVisible] = useState<boolean>(false);
  const [isWonModalVisible, setIsWonModalVisible] = useState<boolean>(false);

  useEffect(() => {
    setSudoku(createSudoku(gameMode, 9));
  }, []);
  
  /**
   * time starter
   */
  useEffect(() => {
    if (sudoku.length > 1) {
      if (!timeInterval) {
        const interval = setInterval(() => {
          setTime(prev => prev+1);
        }, 1000);
        
        setTimeInterval(interval);
      }
    }

    return () => {
      if (timeInterval) clearInterval(timeInterval);
    }
  }, [sudoku]);

  /**
   * check if game is completed or not
   */
  useEffect(() => {
    if (sudoku.length > 1 && isCompleteChecker(sudoku)) {
      if (timeInterval) clearInterval(timeInterval);
      setSelected({ row: -1, col: -1 });
      setGameState('won');
      setIsWonModalVisible(true);
    }
  }, [sudoku]);

  /**
   * check if lives are out or not
   */
  useEffect(() => {
    if (lives === 0) {
      if (timeInterval) clearInterval(timeInterval);
      setSelected({ row: -1, col: -1 });
      setGameState('lost');
      setIsLostModalVisible(true);
    }
  }, [lives]);

  function handleMenuOnPress(): void {
    navigation.goBack();
  }

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

      /**
       * if the cell has value of 5 and the user press number 5, the cell will be emptied
       * if the cell is empty and the user press number 5, the cell will be 5
       */
      if (newSudoku[selected.row][selected.col].userValue === number)
        newSudoku[selected.row][selected.col].userValue = null;
      else newSudoku[selected.row][selected.col].userValue = number;

      /**
       * incorrect value checker
       */
      if ((sudoku[selected.row][selected.col].userValue) && (sudoku[selected.row][selected.col].actualValue !== number)) setLives(prev => prev-1);

      setSudoku(newSudoku);
    }
  }

  function wonModalHandleGoToLeaderboardOnPress() {
    navigation.replace('Leaderboard');
  }

  return (
    <SafeAreaView
      style={[
        screen.screen,
        { backgroundColor: primaryColor, justifyContent: 'space-between' },
      ]}
    >
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Button onPress={handleMenuOnPress} size='md'>
          Go back to Menu
        </Button>
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
          <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end'}}>
            <Text style={[text.md, { color: secondaryColor }]}>
              Time: {time}
            </Text>
            {(gameState === 'won') && <Text style={[text.lg, {color: colors.green}]}>Game Won</Text>}
            {(gameState === 'lost') && <Text style={[text.lg, {color: colors.red}]}>Game Lost</Text>}
            <Text style={[text.md, { color: secondaryColor }]}>
              {lives > 1 ? 'Lives' : 'Live'}: {lives}
            </Text>
          </View>

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
                    disabled={(gameState !== 'inProgress')}
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
                        <Text style={[text.lg, { color: colors.neutral }]}>
                          {sudoku[rowIndex][colIndex].actualValue}
                        </Text>
                      ) : ((gameState === 'inProgress') || (sudoku[rowIndex][colIndex].userValue === sudoku[rowIndex][colIndex].actualValue)) ? (
                        <Text
                          style={[
                            text.lg,
                            {
                              color:
                                sudoku[rowIndex][colIndex].actualValue !==
                                sudoku[rowIndex][colIndex].userValue
                                  ? colors.red
                                  : rowIndex === selected.row &&
                                    colIndex === selected.col
                                  ? primaryColor
                                  : secondaryColor,
                            },
                          ]}
                        >
                          {sudoku[rowIndex][colIndex].userValue}
                        </Text>
                      ) : (
                        <Text style={[text.lg, {color: colors.green}]}>
                          {sudoku[rowIndex][colIndex].actualValue}
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
              disabled={(gameState !== 'inProgress')}
            >
              {index + 1}
            </Button>
          </View>
        ))}
      </View>

      <LostModal visible={isLostModalVisible} setVisible={setIsLostModalVisible} />

      <WonModal
        visible={isWonModalVisible}
        setVisible={setIsWonModalVisible}
        time={time}
        handleGoToLeaderboardOnPress={
          wonModalHandleGoToLeaderboardOnPress
        }
      />
    </SafeAreaView>
  );
};

export default Game;
