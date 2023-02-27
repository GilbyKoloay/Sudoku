import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Button
} from 'react-native';
import _globalStyles from './_globalStyles';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10
  },
  text: {
    color: '#202020',
    fontSize: 20
  },
  textInput: {
    borderWidth: 1,
    fontSize: 15,
    padding: 5
  },
  textError: {
    color: 'red',
    fontSize: 15
  },
  boxConfigurationOptionWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  boxGroupConfigurationOption: {
    borderWidth: 1,
    flex: 1,
    alignItems: 'center'
  },
  boxConfigurationOptionSelected: {
    backgroundColor: 'green'
  }
});

export default function CreateGame({ navigation }: { navigation: any }) {
  const sizeLimit = 25;
  const difficultyNumber = {
    easy: 0.5,
    medium: 0.75,
    hard: 0.8
  }

  const [size, setSize] = useState <string> ('');
  const [sizableStatus, setSizableStatus] = useState <boolean> (false);
  const [sizeErrorMessage, setSizeErrorMessage] = useState <string> ('');
  const [boxGroupConfiguration, setBoxConfiguration] = useState <Array<{row: number, column: number}>> ([]);
  const [boxGroupConfigurationOption, setBoxConfigurationOption] = useState <number> (0);
  const [difficulty, setDifficulty] = useState <number> (difficultyNumber.easy);

  

  function sizableStatusCheck(size: string) {
    setSize(size);
    setSizableStatus(false);
    setBoxConfiguration([]);
    setBoxConfigurationOption(0);
    
    // check if number is more than 5 and less than size limit
    if(parseInt(size) > 5 && parseInt(size) <= sizeLimit) {
      
      // prime number check
      for(let count=2; count<parseInt(size); count++) {
        if(parseInt(size) % count === 0) {
          
          // if number is not prime, count the total of box configuration
          let boxConfigurationTemp: Array<{row: number, column: number}> = [];
          for(let countOne=2; countOne<parseInt(size)/2; countOne++) {
            for(let countTwo=countOne; countTwo<=parseInt(size)/2; countTwo++) {
              (countOne * countTwo === parseInt(size)) && boxConfigurationTemp.push({
                row: countOne,
                column: countTwo
              });
            }
          }
          setBoxConfiguration(boxConfigurationTemp);
          setSizableStatus(true);
        }
      }
    } else if(parseInt(size) >= sizeLimit) {
      setSizeErrorMessage("lmao don't crash the game mate.");
    } else {
      setSizeErrorMessage('* Sudoku size must not be a prime number and more than 5.');
    }
  };
  


  return(
    <View style={_globalStyles.screen}>
      <Text style={styles.text}>Input Sudoku size: </Text>
      <TextInput 
        style={StyleSheet.compose(styles.text, styles.textInput)} 
        placeholder='must not be a prime number & more than 5' 
        keyboardType='number-pad' 
        value={size.toString()} 
        onChangeText={value => sizableStatusCheck(value)}
      />
      {(size !== '' && sizableStatus === false) && <Text style={styles.textError}>{sizeErrorMessage}</Text>}

      {sizableStatus && (
        <View style={styles.boxConfigurationOptionWrapper}>
          {boxGroupConfiguration.map((value, index) => (
            <TouchableOpacity key={index} style={(index === boxGroupConfigurationOption) ? StyleSheet.compose(styles.boxGroupConfigurationOption, styles.boxConfigurationOptionSelected) : styles.boxGroupConfigurationOption} onPress={() => setBoxConfigurationOption(index)}>
              <Text style={styles.text}>{value.row} x {value.column}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {sizableStatus && (
        <View>
          <Text style={styles.text}>Choose difficulty:</Text>
          <View style={styles.boxConfigurationOptionWrapper}>
            <TouchableOpacity style={(difficultyNumber.easy === difficulty) ? StyleSheet.compose(styles.boxGroupConfigurationOption, styles.boxConfigurationOptionSelected) : styles.boxGroupConfigurationOption} onPress={() => setDifficulty(difficultyNumber.easy)}>
              <Text style={styles.text}>Easy</Text>
            </TouchableOpacity>
            <TouchableOpacity style={(difficultyNumber.medium === difficulty) ? StyleSheet.compose(styles.boxGroupConfigurationOption, styles.boxConfigurationOptionSelected) : styles.boxGroupConfigurationOption} onPress={() => setDifficulty(difficultyNumber.medium)}>
              <Text style={styles.text}>Medium</Text>
            </TouchableOpacity>
            <TouchableOpacity style={(difficultyNumber.hard === difficulty) ? StyleSheet.compose(styles.boxGroupConfigurationOption, styles.boxConfigurationOptionSelected) : styles.boxGroupConfigurationOption} onPress={() => setDifficulty(difficultyNumber.hard)}>
              <Text style={styles.text}>Hard</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {sizableStatus && (
        <Button
          title='Create Game'
          onPress={() => navigation.navigate('Game', {
            size: parseInt(size),
            boxGroupConfiguration,
            boxGroupConfigurationOption,
            difficulty
          })}
        />
      )}
    </View>
  );
};
