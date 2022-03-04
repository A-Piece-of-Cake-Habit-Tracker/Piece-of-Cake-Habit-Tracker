import React from 'react';
import { StyleSheet, StatusBar, Image} from 'react-native';
import { NativeBaseProvider, Text, Box, Button } from 'native-base';

export default function App() {
  return (
    <NativeBaseProvider>
      <Box flex={1} bg="#fff" alignItems="center" justifyContent="center">
        <Text>Open up App.js to start working on your app!</Text>
      </Box>

      <Box alignItems="center" style={styles.button}>
        <Button onPress={() => console.log("hello world")}>Click Me</Button>
      </Box>

    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column', // main axis
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 10: 0,
    backgroundColor: '#eee',
  },
  topContainer: {
    flexDirection: 'row', // main axis
    justifyContent: 'space-around', // along main axis
    alignItems: 'flex-start', // along cross axis
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 10: 0,
    backgroundColor: '#aaa',
  },
  title: {
    flex: 3,
    textAlign: 'left',
    color: "black",
    fontSize: 45,
    paddingLeft: 20,
    paddingRight: 20,
    lineHeight: 45,
  },
  top:{
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  topbuttons: {
    flex: 1
  },
  img: {
    width:35,
    height:35
  },
  menu:{
    flex:1,
    justifyContent: 'center',
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    bottom: 40,
    backgroundColor: '#aaa'
  }
});
