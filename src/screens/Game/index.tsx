import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { Pressable, SafeAreaView, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from '../../components';
import { globalStyles } from '../../global';
import { RootStackParamList } from '../../navigation';
import { RootState, app } from '../../redux';
import createSudoku from './createSudoku';

type Props = NativeStackScreenProps<RootStackParamList, 'Game'>;

export type Sudoku = [[SudokuCell]];

export type SudokuCell = {
  actualValue?: number;
  userValue?: number | null;
  isLocked?: boolean;
  notes?: number[];
};

export const sudokuSize = 9;

const Game: React.FC<Props> = ({ navigation }): React.JSX.Element => {
  const dispatch = useDispatch();
  const { primaryColor, secondaryColor, gameMode } = useSelector(
    (state: RootState) => state.app,
  );
  const [sudoku, setSudoku] = useState<Sudoku>([[{}]]);
  const [selectedSudoku, setSelectedSudoku] = useState<number[]>([-1, -1]);
  const [isGameCompleted, setIsGameCompleted] = useState<boolean>(false);

  useEffect(() => {
    setSudoku(createSudoku(gameMode));
  }, []);

  useEffect(() => {
    if (sudoku.length > 1 && isSudokuCompleted()) {
      setSelectedSudoku([-1, -1]);
      setIsGameCompleted(true);
    }
  }, [sudoku]);

  function handleSwitchThemeOnPress(): void {
    dispatch(app.switchTheme());
  }

  function handleCellOnPress(row: number, col: number): void {
    setSelectedSudoku([row, col]);
  }

  function handleNumberOnPress(number: number): void {
    if (
      selectedSudoku[0] >= 0 &&
      selectedSudoku[1] >= 0 &&
      !sudoku[selectedSudoku[0]][selectedSudoku[1]].isLocked
    ) {
      let newSudoku: Sudoku = [...sudoku];

      if (newSudoku[selectedSudoku[0]][selectedSudoku[1]].userValue === number)
        newSudoku[selectedSudoku[0]][selectedSudoku[1]].userValue = null;
      else newSudoku[selectedSudoku[0]][selectedSudoku[1]].userValue = number;

      setSudoku(newSudoku);
    }
  }

  function isSudokuCompleted(): boolean {
    let isCompleted = true;

    for (let row = 0; row < sudokuSize; row++) {
      for (let col = 0; col < sudokuSize; col++) {
        if (
          !sudoku[row][col].isLocked &&
          sudoku[row][col].actualValue !== sudoku[row][col].userValue
        )
          isCompleted = false;
      }
    }

    return isCompleted;
  }

  return (
    <SafeAreaView
      style={[
        globalStyles.screen,
        { backgroundColor: primaryColor, justifyContent: 'space-between' },
      ]}
    >
      <View style={{ width: '50%', alignSelf: 'flex-end' }}>
        <Button onPress={handleSwitchThemeOnPress} size='md'>
          Switch Theme
        </Button>
      </View>

      {sudoku.length === 1 ? (
        <Text
          style={[
            globalStyles.textLg,
            { color: secondaryColor, textAlign: 'center' },
          ]}
        >
          Loading ...
        </Text>
      ) : (
        <View style={{ borderWidth: 1, borderColor: secondaryColor }}>
          {[...new Array(sudokuSize)].map((_, rowIndex) => (
            <View
              key={rowIndex}
              style={{
                flexDirection: 'row',
              }}
            >
              {[...new Array(sudokuSize)].map((__, colIndex) => (
                <Pressable
                  key={colIndex}
                  style={{
                    flex: 1,
                    borderWidth: 1,
                    borderTopColor:
                      rowIndex % 3 === 0 ? secondaryColor : primaryColor,
                    borderBottomColor:
                      (rowIndex - 2) % 3 === 0 ? secondaryColor : primaryColor,
                    borderLeftColor:
                      colIndex % 3 === 0 ? secondaryColor : primaryColor,
                    borderRightColor:
                      (colIndex - 2) % 3 === 0 ? secondaryColor : primaryColor,
                    aspectRatio: 1,
                  }}
                  onPress={() => handleCellOnPress(rowIndex, colIndex)}
                  disabled={isGameCompleted}
                >
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor:
                        rowIndex === selectedSudoku[0] &&
                        colIndex === selectedSudoku[1]
                          ? secondaryColor
                          : 'transparent',
                    }}
                  >
                    {sudoku[rowIndex][colIndex].isLocked ? (
                      <Text style={[globalStyles.textLg, { color: '#737373' }]}>
                        {sudoku[rowIndex][colIndex].actualValue}
                      </Text>
                    ) : (
                      <Text
                        style={[
                          globalStyles.textLg,
                          {
                            color:
                              sudoku[rowIndex][colIndex].actualValue !==
                              sudoku[rowIndex][colIndex].userValue
                                ? '#ef4444'
                                : rowIndex === selectedSudoku[0] &&
                                  colIndex === selectedSudoku[1]
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
      )}

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        {[...new Array(sudokuSize)].map((_, index) => (
          <View key={index} style={{ flex: 1 }}>
            <Button
              onPress={() => handleNumberOnPress(index + 1)}
              size='lg'
              disabled={isGameCompleted}
            >
              {index + 1}
            </Button>
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
};

export default Game;
