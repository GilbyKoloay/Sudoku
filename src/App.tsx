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
    borderWidth: 0.75,

    // borderWidth: 2,
    // borderColor: 'blue',
  },
  boxGroupWrapper: {
    flex: 1,

    // borderWidth: 2,
    // borderColor: 'cyan',
  },
  boxGroup: {
    borderWidth: 0.75,

    // borderWidth: 2,
    // borderColor: 'green',
  },
  boxWrapper: {
    flexDirection: 'row',

    // borderWidth: 2,
    // borderColor: 'yellow',
  },
  box: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    borderWidth: 0.5,

    // borderWidth: 2,
    // borderColor: 'red',
  },
});



export default function App() {
  const CreateBox = (size: number) => {
    if(!SizableCheck(size)) {
      return (
        <View><Text>Not allowed to play. {`Number is ${size}`}</Text></View>
      );
    }

    const boxGroupConfiguration: any = SizableCheck(size);
    const option = 0;
    const boxValue: Array<number> =  FillBoxWithValue(size * size);

    let box: Array<JSX.Element>;
    let boxWrapper: Array<JSX.Element> = [];
    let boxGroup: Array<JSX.Element> = [];
    let boxGroupWrapper: Array<JSX.Element> = [];
    let boxAll: JSX.Element | undefined;

    // fill box
    box = boxValue.map((value, index) => (
      <View key={index} style={styles.box}>
        <Text>{value}</Text>
      </View>
    ));
    
    // fill boxWrapper
    boxWrapper = FillBoxWithJSXElement(box, boxGroupConfiguration[option][1], boxGroupConfiguration[option][1], styles.boxWrapper);

    // fill boxGroup
    boxGroup = FillBoxWithJSXElement(boxWrapper, boxGroupConfiguration[option][0], boxGroupConfiguration[option][1], styles.boxGroup);

    // fill boxGroupWrapper
    boxGroupWrapper = FillBoxWithJSXElement(boxGroup, size/boxGroupConfiguration[option][0], boxGroupConfiguration[option][1], styles.boxGroupWrapper);
    
    // fill boxAll
    boxAll = <View style={styles.boxAll}>
      {boxGroupWrapper.map(value => value)}
    </View>

    return(
      <ScrollView style={{display: 'flex', flex: 1}}>
        <Text>Allowed to play. {`Number is ${size}`}</Text>
        <Text>Configurations: </Text>
        {boxGroupConfiguration.map((val: number, index: number) => <Text key={index}>{val}</Text>)}

        <Text>Choose: Row ({boxGroupConfiguration[option][0]}) | Column ({boxGroupConfiguration[option][1]})</Text>
        {boxAll}
      </ScrollView>
    );
  };

  const SizableCheck = (number: number) => {
    // check if number is lower than 6
    if(number < 6) {
      return false;
    }

    // check if number is prime
    for(let count=2; count<number; count++) {
      if (number % count == 0) {
        // if number is not prime, count the total of Box Group configuration
        let boxGroupConfiguration: Array<number>[] = [];
        for(let countOne=2; countOne<=number/2; countOne++) {
          for(let countTwo=countOne; countTwo<=number/2; countTwo++) {
            (countOne * countTwo === number) && boxGroupConfiguration.push([countOne, countTwo]);
          }
        }
        return boxGroupConfiguration;
      }
    }
    return false; // if number is prime
  };

  const FillBoxWithValue = (boxTotal: number) => {
    let boxValue: Array<number> = [];

    for(let count=1; count<=boxTotal; count++) {
      boxValue.push(count);
    }
    
    return boxValue;
  };

  const FillBoxWithJSXElement = (
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
      {CreateBox(9)}
    </View>
  );
}
