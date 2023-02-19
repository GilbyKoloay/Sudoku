import React from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text
} from 'react-native';



const styles = StyleSheet.create({
  screen: {
    display: 'flex',
    flex: 1,
    padding: 5,

    borderWidth: 1,
  },
  boxAll: {
    flexDirection: 'row',
    borderWidth: 0.5,
    borderColor: '#202020'
    
    // ,borderWidth: 2
    // ,borderColor: 'blue'
  },
  boxGroupWrapper: {
    flex: 1

    // ,borderWidth: 2
    // ,borderColor: 'cyan'
  },
  boxGroup: {
    borderWidth: 0.5,
    borderColor: '#202020'

    // ,borderWidth: 2
    // ,borderColor: 'green'
  },
  boxWrapper: {
    flexDirection: 'row'

    // ,borderWidth: 2
    // ,borderColor: 'yellow'
  },
  box: {
    // justifyContent: 'center',
    // alignItems: 'center',
    flex: 1,
    borderWidth: 0.5,
    borderColor: '#ACACAC',
    aspectRatio: 1,

    // ,borderWidth: 2
    // ,borderColor: 'red'
  },
  boxValue: {
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#606060',
    flex: 1,
    fontSize: 20

    // ,borderWidth: 1
    // ,borderColor: 'red'
  }
});



export default function Game({ navigation, route }: { navigation: object, route: any }) {
  const { size, boxGroupConfiguration, boxGroupConfigurationOption } = route.params;
 
  const createBox = (size: number) => {
    const boxValue: Array<number> =  fillBoxWithValue(size * size);

    let box: Array<JSX.Element>;
    let boxWrapper: Array<JSX.Element> = [];
    let boxGroup: Array<JSX.Element> = [];
    let boxGroupWrapper: Array<JSX.Element> = [];
    let boxAll: JSX.Element | undefined;

    // fill box
    box = boxValue.map((value, index) => (
      <View key={index} style={styles.box}>
        <Text style={styles.boxValue}>{value}</Text>
      </View>
    ));
    
    // fill boxWrapper
    boxWrapper = fillBoxWithJSXElement(box, boxGroupConfiguration[boxGroupConfigurationOption][1], boxGroupConfiguration[boxGroupConfigurationOption][1], styles.boxWrapper);

    // fill boxGroup
    boxGroup = fillBoxWithJSXElement(boxWrapper, boxGroupConfiguration[boxGroupConfigurationOption][0], boxGroupConfiguration[boxGroupConfigurationOption][1], styles.boxGroup);

    // fill boxGroupWrapper
    boxGroupWrapper = fillBoxWithJSXElement(boxGroup, size/boxGroupConfiguration[boxGroupConfigurationOption][0], boxGroupConfiguration[boxGroupConfigurationOption][1], styles.boxGroupWrapper);
    
    // fill boxAll
    boxAll = <View style={styles.boxAll}>
      {boxGroupWrapper.map(value => value)}
    </View>

    return(
      <ScrollView style={{display: 'flex', flex: 1}}>
        <Text>Allowed to play. {`Number is ${size}`}</Text>
        <Text>Configurations: </Text>
        {boxGroupConfiguration.map((val: number, index: number) => <Text key={index}>{val}</Text>)}

        <Text>Choose: Row ({boxGroupConfiguration[boxGroupConfigurationOption][0]}) | Column ({boxGroupConfiguration[boxGroupConfigurationOption][1]})</Text>
        {boxAll}
      </ScrollView>
    );
  };

  const fillBoxWithValue = (boxTotal: number) => {
    let boxValue: Array<number> = [];

    for(let count=1; count<=boxTotal; count++) {
      boxValue.push(count);
    }
    
    return boxValue;
  };

  const fillBoxWithJSXElement = (
    from: Array<JSX.Element>,
    boxGroupConfiguration: number,
    key: number,
    style: object,
  ) => {
    const box: Array<JSX.Element> = [];

    from.forEach((value1, index1) => {
      if(index1 % boxGroupConfiguration === 0) {
        box.push(
          <View key={index1/key} style={style}>
            {from.map((value2, index2) => {
              if(index2>=index1 && index2<index1+boxGroupConfiguration) {
                return value2;
              }
            })}
          </View>
        );
      }
    });

    return box;
  };



  return(
    <View style={styles.screen}>
      {createBox(size)}
    </View>
  );
}
