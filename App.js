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
=======
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
            <Image source={require('./plus.png')}  style={styles.img}/>
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
>>>>>>> Stashed changes

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column', // main axis
    flex: 1,
<<<<<<< Updated upstream
    justifyContent: 'center',
    marginHorizontal: 16,
  },
  title: {
    textAlign: 'center',
    marginVertical: 8,
  },
});

export default App;
=======
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
>>>>>>> Stashed changes
