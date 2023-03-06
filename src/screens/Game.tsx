import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import { styles as globalStyles} from '../global';

const styles = StyleSheet.create({});

interface interfaces {
  box: Array<
    Array<{
      value: number;
      userValue: number;
      note: Array<number>;
      JSX: JSX.Element;
    }>
  >;
}

const SudokuBox = ({props}: {props: {box: interfaces['box']}}): JSX.Element => {
  const {box} = props;

  return <View></View>;
};

export default function ({route}: {route: any}): JSX.Element {
  const {
    sudokuSize,
    sudokuBoxGroupSize,
    difficulty,
  }: {
    sudokuSize: number;
    sudokuBoxGroupSize: number;
    difficulty: number;
  } = route.params;

  const [box, setBox] = useState<interfaces['box']>([]);

  return (
    <View style={globalStyles.screen}>
      <SudokuBox props={{box}} />
    </View>
  );
}
