import React from 'react';
import { StyleSheet, StatusBar, Button, View, SafeAreaView, Text, Alert, TouchableOpacity, Image} from 'react-native';

export default function App() {
  return (
    // This is the whole app container.
    <SafeAreaView style={styles.container}>
      {/* TOP AREA: Welcome, and edit and add buttons */}

      {/* TOP AREA: This is one row. */}
      <View style={styles.topContainer}>
        <Text style={styles.title}>Hey there,{'\n'}Ketsib</Text>

        <View style={styles.topbuttons}>
        <Button
            title="Edit"
            color="#4169E1"
            onPress={() => Alert.alert('Edit Tab Goes Here')}
          />
        </View>

        <View style={styles.topbuttons}>
        <TouchableOpacity 
            style={{height:40}}
            onPress={() => Alert.alert('Add habit tab goes here')}>
            <Image source={require('./assets/plus.png')}  style={styles.img}/>
          </TouchableOpacity>
        </View>
      </View>

      {/* MIDDLE AREA: Habit menu */}
      <View style={styles.menu}>
      </View>

      {/* BOTTOM AREA: This is the bottom row. */}
      <View style={styles.bottom}>
        <Button
        title="Main Menu"
        onPress={() => Alert.alert('Main Menu Tab goes here')}
        />
        <Button
        title="Statistics"
        color="#f194ff"
        onPress={() => Alert.alert('Statistics Tab goes here')}
        />
      </View>

    </SafeAreaView>
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
  topbuttons:{
    flex: 1
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
