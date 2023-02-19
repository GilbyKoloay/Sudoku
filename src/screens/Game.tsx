import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';

const styles = StyleSheet.create({
  screen: {
    display: 'flex',
    flex: 1,
    padding: 5,

    borderWidth: 1,
  },
  boxValue: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 20,
    color: '#606060',

    // borderWidth: 1,
  },
  box: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    aspectRatio: 1,
    borderWidth: 0.5,
    borderColor: '#ACACAC',

    // borderWidth: 1,
    // borderColor: 'red',
  },
  boxWrapper: {
    flexDirection: 'row',

    // borderWidth: 1,
    // borderColor: 'yellow',
  },
  boxGroup: {
    flex: 1,
    borderWidth: 0.5,
    borderColor: '#202020',

    // borderWidth: 1,
    // borderColor: 'green',
  },
  boxGroupWrapper: {
    flexDirection: 'row',

    // borderWidth: 1,
    // borderColor: 'cyan',
  },
  boxAll: {
    borderWidth: 0.5,
    borderColor: '#202020',

    // borderWidth: 1,
    // borderColor: 'purple',
  }
});

export default function Game({ navigation, route }: { navigation: object, route: any }) {
  const { size, boxGroupConfiguration, boxGroupConfigurationOption } = route.params;

  const [boxValue, setBoxValue] = useState <Array<number>> ([]);
  const [boxJSX, setBoxJSX] = useState <{
    box: Array<JSX.Element>,
    boxWrapper: Array<JSX.Element>,
    boxGroup: Array<JSX.Element>,
    boxGroupWrapper: Array<JSX.Element>,
    boxAll: JSX.Element,
  }> ({
    box: [],
    boxWrapper: [],
    boxGroup: [],
    boxGroupWrapper: [],
    boxAll: <></>,
  });


  
  const createBox = (size: number) => {
    const box: Array<JSX.Element> = boxValue.map((value, index) => (
      <View key={index} style={styles.box}>
        <Text style={styles.boxValue}>{value}</Text>
      </View>
    ));
    const boxWrapper: Array<JSX.Element> = fillBoxWithJSXElement(box, boxGroupConfiguration[boxGroupConfigurationOption][1], boxGroupConfiguration[boxGroupConfigurationOption][1], styles.boxWrapper);
    const boxGroup: Array<JSX.Element> = fillBoxWithJSXElement(boxWrapper, boxGroupConfiguration[boxGroupConfigurationOption][0], boxGroupConfiguration[boxGroupConfigurationOption][0], styles.boxGroup);
    const boxGroupWrapper: Array<JSX.Element> = fillBoxWithJSXElement(boxGroup, size/boxGroupConfiguration[boxGroupConfigurationOption][1], boxGroupConfiguration[boxGroupConfigurationOption][0], styles.boxGroupWrapper);
    const boxAll = <View style={styles.boxAll}>{boxGroupWrapper}</View>;

    return boxAll;
  }
  
  const fillBoxWithValue = (size: number) => {
    let box: Array<number> = [];

    for(let count=1; count<=size*size; count++) {
      box.push(count);
    }
    
    return box;
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

  useEffect(() => {
    setBoxValue(fillBoxWithValue(size));
  }, []);



  return(
    <View style={styles.screen}>
      {createBox(size)}
    </View>
  );
}
