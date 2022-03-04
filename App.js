import React from 'react';
<<<<<<< Updated upstream
import { StyleSheet, Button, View, SafeAreaView, Text, Alert } from 'react-native';

const App = () => (
  <SafeAreaView style={styles.container}>
    <View>
      <Text style={styles.title}>
        A Piece of Cake: Habit Tracker
      </Text>
      <Button
=======
import { StyleSheet, StatusBar, Button, View, SafeAreaView, Text, Alert, TouchableOpacity, Image} from 'react-native';
import { NativeBaseProvider, Box } from "native-base";

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

      {/* <NativeBaseProvider>
        <Box>Hello world</Box>
      </NativeBaseProvider> */}

      {/* MIDDLE AREA: Habit menu */}
      <View style={styles.menu}>
      </View>

      {/* BOTTOM AREA: This is the bottom row. */}
      <View style={styles.bottom}>
        <Button
>>>>>>> Stashed changes
        title="Main Menu"
        onPress={() => Alert.alert('Main Menu Tab goes here')}
      />
    </View>
    <View>
      <Button
        title="Statistics"
        color="#f194ff"
        onPress={() => Alert.alert('Statistics Tab goes here')}
      />
    </View>
    <View>
      <Button
        title="Add Habit"
        color="#3ded97"
        onPress={() => Alert.alert('Add Habit Tab goes here')}
      />
    </View>
    <View>
      <Button
        title="Edit Habit"
        color="#f9e076"
        onPress={() => Alert.alert('Edit Habit Tab goes here')}
      />
    </View>
  </SafeAreaView>
);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 16,
  },
  title: {
    textAlign: 'center',
    marginVertical: 8,
  },
});

export default App;