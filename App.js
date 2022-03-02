import React from 'react';
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