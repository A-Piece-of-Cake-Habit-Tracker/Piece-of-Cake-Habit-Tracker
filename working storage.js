import React, { useEffect, useState } from "react";
// import { View, Text, StatusBar, TextInput, Button, FlatList } from "react-native";
import { View, StatusBar, TextInput, FlatList } from "react-native";
import * as SQLite from "expo-sqlite";
import { NativeBaseProvider, HStack, VStack, Center, Box, Button, Text, Modal, FormControl, Input, UseTheme} from 'native-base';

const db = SQLite.openDatabase("e:\\database\\habitTracker.db");

function Bottom () {
    return <NativeBaseProvider>
        <HStack width={375} maxWidth="100%" space={3} justifyContent="space-evenly">
            <Box alignItems="center">
              <Button
                variant="solid"
                colorScheme="secondary"
                onPress={() => Alert.alert("This is the Main Menu tab")}>
                <Text fontSize="xl" fontWeight="bold" color="white">
                  Main Menu
                </Text>
              </Button>
            </Box>
            <Box alignItems="center">
              <Button
                variant="solid"
                colorScheme="secondary"
                onPress={() => Alert.alert("This is the Statistics tab")}>
                <Text fontSize="xl" fontWeight="bold" color="white">
                  Statistics
                </Text>
              </Button>
            </Box>
        </HStack>
      </NativeBaseProvider>;
  }

const App = () => {
    const [showModal, setShowModal] = useState(false);
    const [habit, setHabit] = useState("");
    const [habits, setHabits] = useState([]);
  
    const createTables = () => {
      db.transaction(txn => {
        txn.executeSql(
          `CREATE TABLE IF NOT EXISTS habits (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(20))`,
          [],
          (sqlTxn, res) => {
            console.log("table created successfully");
          },
          error => {
            console.log("error on creating table " + error.message);
          },
        );
      });
    };
  
    const addHabit = () => {
      if (!habit) {
        alert("Enter habit");
        return false;
      }
  
      db.transaction(txn => {
        txn.executeSql(
          `INSERT INTO habits (name) VALUES (?)`,
          [habit],
          (sqlTxn, res) => {
            console.log(`${habit} habit added successfully`);
            getHabits();
            setHabit("");
          },
          error => {
            console.log("error on adding habit " + error.message);
          },
        );
      });
    };
  
    const getHabits = () => {
      db.transaction(txn => {
        txn.executeSql(
          `SELECT * FROM habits ORDER BY id DESC`,
          [],
          (sqlTxn, res) => {
            console.log("habits retrieved successfully");
            let len = res.rows.length;
  
            if (len > 0) {
              let results = [];
              for (let i = 0; i < len; i++) {
                let item = res.rows.item(i);
                results.push({ id: item.id, name: item.name });
              }
  
              setHabits(results);
            }
          },
          error => {
            console.log("error on getting habits " + error.message);
          },
        );
      });
    };
  
    const renderHabit = ({ item }) => {
      return (
        <View style={{
          flexDirection: "row",
          paddingVertical: 12,
          paddingHorizontal: 10,
          borderBottomWidth: 1,
          borderColor: "#ddd",
        }}>
          <Text style={{ marginRight: 9 }}>{item.id}</Text>
          <Text>{item.name}</Text>
        </View>
      );
    };
  
    useEffect(async () => {
      await createTables();
      await getHabits();
    }, []);

    const validate = values => {
        const errors = {};
      
        if (!values.habitName) {
          errors.habitName = 'Required';
        }
        if (!values.recurrence) {
          errors.recurrence = 'Required';
        }
        if (!values.goal) {
          errors.goal = 'Required';
        }
      
        return errors;
      };
  
    return (
      <NativeBaseProvider>
        <Center maxWidth="100%" flex={1} justifyContent="space-between" px="3">
        
        {/* ===================================== HEADER ===================================== */}
            <HStack width={375} maxWidth="100%" space={3} justifyContent="space-between" pt={StatusBar.currentHeight + 15}>
            <VStack pl={2} alignItems="flex-start" >
                <Text fontSize="4xl" fontWeight="bold" color="black">
                    Hey there,
                </Text>
                <Text mt={-3} fontSize="4xl" fontWeight="bold" color="black">
                    Rowena
                </Text>
            </VStack>
            <Box alignItems="center">
                <Button
                variant="ghost"
                onPress={() => Alert.alert("This is the Edit Habit tab")}>
                <Text fontSize="xl" fontWeight="bold" color="cyan.600">
                    Edit
                </Text>
                </Button>
            </Box>
            <Box ml={-20} mr={-20} h="10" w="10" alignItems="center">
                <Button
                h="10" w="10"
                alignItems="center"
                variant="ghost"
                bgColor={'white'}
                shadow={3}
                rounded="full"
                onPress={() => setShowModal(true)}>
                <Text fontSize="2xl" lineHeight="25.5" fontWeight="bold" color="cyan.600">
                    +
                </Text>
                </Button>
            </Box>
            <Center>
                <Modal name="addHabitModal" isOpen={showModal} onClose={() => setShowModal(false)}>
                <Modal.Content maxWidth="400px">
                    <Modal.CloseButton />
                    <Modal.Header>Add a habit</Modal.Header>
                    <Modal.Body>
                    <Center>
                        <VStack width="100%" space={3}>
                        <FormControl isRequired>
                            <FormControl.Label>Name of habit</FormControl.Label>
                            <Input
                            width="100%"
                            placeholder="Drink water"
                            value={habit}
                            onChangeText={setHabit}
                             />
                        </FormControl>

                        <Button variant="outline" onPress={addHabit} colorScheme="pink">
                            Submit
                        </Button>

                        </VStack>
                    </Center>
                    </Modal.Body>
                </Modal.Content>
                </Modal>
            </Center>
            </HStack>



            {/* <StatusBar backgroundColor="#222" /> */}
    
            {/* <TextInput
            placeholder="Enter habit"
            value={habit}
            onChangeText={setHabit}
            style={{ marginHorizontal: 8 }}
            />
    
            <Button variant="solid" title="Submit" onPress={addHabit} /> */}
    
            <FlatList
            data={habits}
            renderItem={renderHabit}
            key={cat => cat.id}
            />



            {/* <Bottom /> */}
        </Center>
      </NativeBaseProvider>
    );
  };
  
  export default App;