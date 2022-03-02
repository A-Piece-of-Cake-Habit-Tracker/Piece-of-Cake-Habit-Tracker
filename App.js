import React from 'react';
import { StyleSheet, Button, View, SafeAreaView, Text, Alert, TouchableOpacity, Image} from 'react-native';

const App = () => (
  <SafeAreaView style={styles.container}>
    {/* TOP AREA: Welcome, and edit and add buttons */}
    <View style={styles.top}>
    <Text style={styles.title}>
        Welcome, Ketsib
    </Text>
    <View style={styles.topbuttons}>
    <Button
        title="Edit"
        color="#4169E1"
        onPress={() => Alert.alert('Edit Tab Goes Here')}
      />
    <TouchableOpacity 
        style={{height:40}}
        onPress={() => Alert.alert('Add habit tab goes here')}>
        <Image source={require('./plus.png')}  style={styles.img}/>
      </TouchableOpacity>
    </View>
    </View>

    {/* MIDDLE AREA: Habit menu */}
    <View style={styles.menu}>
    </View>

    {/* BOTTOM AREA: Menu and stats tabs buttons */}
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


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 16,
    marginVertical: 36
  },
  title: {
    textAlign: 'left',
    marginVertical: 8,
  },
  top:{
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  topbuttons:{
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  menu:{
    flex:1,
    justifyContent: 'center',
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  }
});

export default App;