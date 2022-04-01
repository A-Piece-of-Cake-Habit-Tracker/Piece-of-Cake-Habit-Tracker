import React, { useEffect, useState } from "react";
// import { View, Text, StatusBar, TextInput, Button, FlatList } from "react-native";
import { AppRegistry, Dimensions, Alert, View, StatusBar, TextInput, FlatList, SectionList } from "react-native";
import * as SQLite from "expo-sqlite";
import { NativeBaseProvider, HStack, VStack, Center, Box, Button, Pressable, Text, Modal, FormControl, Input, Radio, UseTheme, Spacer, Divider, ScrollView, Icon, IconButton, AlertDialog, Slide } from 'native-base';
import { MaterialCommunityIcons, Entypo, Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import {LogBox} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/native';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import OutsideView from 'react-native-detect-press-outside';

LogBox.ignoreLogs(['NativeBase:']);

const db = SQLite.openDatabase("e:\\database\\habitTracker.db");

var height = Dimensions.get('window').height;
var width = Dimensions.get('window').width;


function Bottom () {
  // var height = Dimensions.get('window').height;
  // var width = Dimensions.get('window').width;
  const navigation = useNavigation(); 
  const [toggleStatistics, settoggleStatistics] = useState(false); //for Home and Statistics button
  return <NativeBaseProvider>
      <Box flexDirection="row" alignItems="center" width={width} height = "125" style={{backgroundColor: "#10BCE1"}} m="0">
      {toggleStatistics &&
        <NativeBaseProvider>
        <HStack width={width} height = "125" maxWidth="100%" space={3} justifyContent="space-evenly">
          <Box alignItems="center">
            <IconButton 
            variant = "unstyled"
            onPress={() => {settoggleStatistics(false); navigation.navigate("Main")}} 
            icon={<Icon as={MaterialCommunityIcons} name="home-variant" />} _icon={{
                color: "rgb(128,233,250)",
                size: "lg"
              }}_pressed={{
                _icon: {
                  color: "white"
                }
              }}
            />
          </Box>
          <Box alignItems="center">
            <IconButton 
              variant = "unstyled"
              onPress={() => {settoggleStatistics(true); navigation.navigate("Statistics")}} 
              icon={<Icon as={Entypo} name="bar-graph" />} _icon={{
                  color: "white",
                  size: "lg"
                }} _pressed={{
                  _icon: {
                      color: "white",
                    }
                }}
            />
          </Box>
        </HStack>
        </NativeBaseProvider>
      }
      {!toggleStatistics &&
        <NativeBaseProvider>
        <HStack width={width} height = "125" maxWidth="100%" space={3} justifyContent="space-evenly">
          <Box alignItems="center">
            <IconButton 
            variant = "unstyled"
            onPress={() => {settoggleStatistics(false); navigation.navigate("Main")}} 
            icon={<Icon as={MaterialCommunityIcons} name="home-variant" />} _icon={{
                color: "white",
                size: "lg"
              }}_pressed={{
                _icon: {
                  color: "white"
                }
              }}
            />
          </Box>
          <Box alignItems="center">
            <IconButton 
              variant = "unstyled"
              onPress={() => {settoggleStatistics(true); navigation.navigate("Statistics")}} 
              icon={<Icon as={Entypo} name="bar-graph" />} _icon={{
                  color: "rgb(128,233,250)",
                  size: "lg"
                }} _pressed={{
                  _icon: {
                      color: "white",
                    }
                }}
            />
          </Box>
        </HStack>  
        </NativeBaseProvider>          
      }
      </Box> 
      </NativeBaseProvider>;
  }
  

const Stack = createNativeStackNavigator();

const App =() =>{
  return (
  <NavigationContainer>
    <Stack.Navigator>
        <Stack.Screen component= {Main} name ="Main" options={{headerShown:false}} />
        <Stack.Screen component= {Statistics} name = "Statistics" options={{headerShown:false}}/>
    </Stack.Navigator>
  </NavigationContainer>
  );
};

const Main = ({navigation}) => {
    const [showModal, setShowModal] = useState(false);
    const [habitName, setHabitName] = useState("");
    const [recurrence, setRecurrence] = useState("");
    const [formOfMeasurement, setFormOfMeasurement] = useState("");
    const [id, setHabitId] = useState(0);
    const [goal, setGoal] = useState("");
    const [progress, setProgress] = useState("");
    const [habits, setHabits] = useState([]);
    const [toggleEdit, setToggleEdit] = useState(false);
    const [date, setDate] = useState(null); //ADDED
    const [isOpen, setIsOpen] = useState(false); //FOR DELETE
    const onClose = () => setIsOpen(false); //FOR DELETE
    const cancelRef = React.useRef(null); //FOR DELETE
    const [isViewHabit, setIsViewHabit] = React.useState(false); //FOR VIEW HABIT 
    const [habitNameDisplay, setHabitNameDisplay] = useState("");
    const [recurrenceDisplay, setRecurrenceDisplay] = useState("");
    const [goalDisplay, setGoalDisplay] = useState("");
    const [formOfMeasurementDisplay, setFormOfMeasurementDisplay] = useState("");
    const [skipsDisplay, setSkipsDisplay] = useState("");

    //useEffect added
    useEffect(() => {
      let today = new Date();
      let month=today.getMonth()+1;
      let m= 'Jan';
      if (month==2)
      {
        m='Jan';
      }
      else if (month==2)
      {
        m='Feb';
      }
      else if (month==3)
      {
        m='Mar';
      }
      else if (month==4)
      {
        m='Apr';
      }
      else if (month==5)
      {
        m='May';
      }
      else if (month==6)
      {
        m='June';
      }
      else if (month==7)
      {
        m='July';
      }
      else if (month==8)
      {
        m='Aug';
      }
      else if (month==9)
      {
        m='Sept';
      }
      else if (month==10)
      {
        m='Oct';
      }
      else if (month==11)
      {
        m='Nov';
      }
      else if (month==12)
      {
        m='Dec';
      }
      let day=today.getDay();
      let d= 'Sun';
      if (day==0)
      {
        d='Sun';
      }
      else if (day==1)
      {
        d='Mon';
      }
      else if (day==2)
      {
        d='Tue';
      }
      else if (day==3)
      {
        d='Wed';
      }
      else if (day==4)
      {
        d='Thurs';
      }
      else if (day==5)
      {
        d='Fri';
      }
      else if (day==6)
      {
        d='Sat';
      }
      let date = d+ ', '+ m + ' '+ today.getDate();
      setDate(date);
    }, []);

  
    const createTables = () => {
      db.transaction(txn => {
        txn.executeSql(
          // `DROP TABLE habits`,
          `CREATE TABLE IF NOT EXISTS habits (id INTEGER PRIMARY KEY AUTOINCREMENT, habitName TEXT, recurrence INTEGER, formOfMeasurement INTEGER, goal INTEGER, progress INTEGER)`,
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
      const incomplete = []


      if (!habitName) {
        incomplete.push("name of habit")
      }

      if (!recurrence) {
        incomplete.push("recurrence")
      }

      if (!formOfMeasurement) {
        incomplete.push("form of measurement")
      }

      if (!goal) {
        incomplete.push("goal")
      }

      if (!habitName || !recurrence || !formOfMeasurement || !goal) {
        var str = "Please enter the ";
        for(var i = 0; i < incomplete.length; i++) {
          if (incomplete.length == 1){
            str += incomplete[i] + ".";
          }
          else if (incomplete.length != 1 && i == incomplete.length - 1){
            str += "and " + incomplete[i] + ".";
          } else {
            str += incomplete[i] + ", ";
          }
        }
        console.log(str);
        Alert.alert(
          "Incomplete habit details",
          str,
          [{text: 'OK', style: 'destructive'}]
        );
        return false;
      }


      if (!(/^[0-9]*$/.test(recurrence))){
        console.log("2 Please enter a valid integer for the recurrence.");
        Alert.alert(
          "Invalid habit details",
          "Please enter a valid integer for the recurrence.",
          [{text: 'OK', style: 'destructive'}]
        );
        return false;
      }

      if (!(/^[0-9]*$/.test(goal))){
        console.log("2 Please enter a valid integer for the goal.");
        Alert.alert(
          "Invalid habit details",
          "Please enter a valid integer for the goal.",
          [{text: 'OK', style: 'destructive'}]
        );
        return false;
      }

      const progress = 0;
      
      const insertSql =
      "INSERT INTO habits (habitName,recurrence,formOfMeasurement,goal,progress) VALUES ('" +
      habitName +
      "'," +
      recurrence +
      "," +
      formOfMeasurement +
      "," +
      goal +
      "," +
      progress +
      ")";

      console.log(insertSql)
  
      db.transaction(txn => {
        txn.executeSql(
          insertSql,
          [],
          (sqlTxn, res) => {
            console.log(`Added successfully: ${habitName} ${recurrence} ${formOfMeasurement} ${goal} ${progress}`);
            // console.log(`Added successfully: ${habitName}`);
            getHabits();
            setHabitName("");
            setRecurrence("");
            setFormOfMeasurement("");
            setGoal("");
          },
          error => {
            console.log("error on adding habit " + error.message);
          },
        );
      });

      setShowModal(false);
    };
  
    const editHabit = () => {
        const updateSql =
        "UPDATE habits SET habitName='" +
        habitName +
        "', recurrence='" +
        recurrence +
        "', formOfMeasurement=" +
        formOfMeasurement +
        ", goal='" +
        goal +
        "' WHERE id="
        + id;
    
        db.transaction(txn => {
          txn.executeSql(
            updateSql,
            [],
            (sqlTxn, res) => {
              console.log(`Edited successfully: ${habitName} ${recurrence} ${formOfMeasurement} ${goal}`);
              // console.log(`Added successfully: ${habitName}`);
              
              
              getHabits();
              setHabitName("");
              setRecurrence("");
              setFormOfMeasurement("");
              setGoal("");
            },
            error => {
              console.log("error on editing habit " + error.message);
            },
          );
        });
  
        setShowModal(false);
      };
    
      const loadEdit = (editID) => {
        setHabitId(editID);
        for (let index = 0; index < habits.length; index++) {
          if(editID == habits[index].id){
            setHabitName(habits[index].habitName);
            setRecurrence((habits[index].recurrence).toString());
            setFormOfMeasurement(habits[index].formOfMeasurement);
            setGoal((habits[index].goal).toString());
            console.log(`loaded ${habits[index].habitName} ${habits[index].recurrence} ${habits[index].formOfMeasurement} ${habits[index].goal}`)
            break;
          }        
        }
      }

      function deleteHabit (){
        const deleteSql = "DELETE FROM habits WHERE id=" + id;
        console.log(deleteSql)
        db.transaction(txn => {
          txn.executeSql(
            deleteSql,
            [],
            (sqlTxn, res) => {
              console.log(`Deleted successfully: ${habitName} ${recurrence} ${formOfMeasurement} ${goal}`);
            },
            error => {
              console.log("error on deleting habit " + error.message);
            },
          );
        });
        setIsOpen(false);
        getHabits();
      };

      const loadDelete = (deleteID) => {
        setHabitId(deleteID);
        for (let index = 0; index < habits.length; index++) {
          if(deleteID == habits[index].id){
            setHabitName(habits[index].habitName);
            setRecurrence((habits[index].recurrence).toString());
            setFormOfMeasurement(habits[index].formOfMeasurement);
            setGoal((habits[index].goal).toString());
            console.log(`loaded ${habits[index].habitName} ${habits[index].recurrence} ${habits[index].formOfMeasurement} ${habits[index].goal}`)
            break;
          }        
        }
      }

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
                results.push({ id: item.id, habitName: item.habitName, recurrence: item.recurrence, formOfMeasurement: item.formOfMeasurement, goal: item.goal, progress: item.progress });
              }
            
              setHabits(results);
              console.log("habit results" + results);
            } else {
              setHabits([]);
              console.log("no more habits");
            }
          },
          error => {
            console.log("error on getting habits " + error.message);
          },
        );
      });
    };

    function updateHabit(item, action) {
      // console.log(item.recurrence++);
      if (action == "inc") {
        if (item.progress < item.goal) {
          setRecurrence(item.progress++);
        }
      }
      else {
        if (item.progress != 0) {
          setRecurrence(item.progress--);
        }
      }
      
      console.log("updating: " + item.id)

      const updateSql =
      "UPDATE habits SET habitName = '" +
      item.habitName +
      "', recurrence=" +
      item.recurrence +
      ",formOfMeasurement=" +
      item.formOfMeasurement +
      ",goal=" +
      item.goal +
      ",progress=" +
      item.progress +
      " WHERE id=" +
      item.id;

      db.transaction(function (tx) {
        tx.executeSql(
          updateSql,
          [],
          (sqlTxn, res) => {
            console.log("habit updated successfully");
          },
          error => {
            console.log("error on updating habit " + error.message);
          },
        );
      });
    }

    const viewHabit = (item) => {
      setIsViewHabit(true);

      console.log("viewed " + item.habitName);
      setHabitNameDisplay(item.habitName);
      setRecurrenceDisplay(item.recurrence);
      setGoalDisplay(item.goal);
      if (item.formOfMeasurement == 1) {
        setFormOfMeasurementDisplay("Increment");
      } else {
        setFormOfMeasurementDisplay("Timer");
      }
      
      setSkipsDisplay("x");
    }


    const renderHabit = ({ item }) => {
      // const [isViewHabit, setIsViewHabit] = React.useState(false); //FOR VIEW HABIT 
      console.log(item)
      
      return (
        <NativeBaseProvider>
            <Center>
                <Pressable w="80" h="20" mb="4" ml="4" mr="4"
                bg="white"
                // bg={onPress ? "coolGray.200" : onHover ? "coolGray.200" : "white"}
                rounded="2xl"
                shadow={3}
                flexDirection="row"
                // style={{flexWrap: "wrap", overflow: "hidden"}}
                onPress={() => viewHabit(item)}
                style={{
                  flexWrap: "wrap",
                  overflow: "hidden",
                }}
                // onPress={() => alert("hi")}
                >
                    <VStack h="20" w="55"
                    // bg="cyan.600"
                    style={
                      item.progress === item.goal?
                      {backgroundColor: "#08E17C"}
                      : {backgroundColor: "#10BCE1"}
                    }
                    alignItems="center"
                    justifyContent="center"> 
                      <Text ml="-1" alignItems="center" justifyContent="center" fontSize="2xl" fontWeight="bold" color="white"> {item.progress} </Text>
                    </VStack>
                    <Divider my={2} orientation="vertical" bg="transparent"/>
                    <VStack w="250" flexDirection="row" justifyContent={"space-between"}>
                      <VStack pt={3} pb={3} pr={5} pl={5}>
                          {/* <Text style={{ marginRight: 9 }}>{item.id}</Text>    */}
                          <HStack alignItems={"flex-start"}>
                            <Text fontSize="xl" fontWeight="bold" color="black">{item.habitName}</Text>
                          </HStack>
                          <HStack alignItems={"flex-start"}>
                              <Text fontSize="sm"
                              fontWeight="bold"
                              // color="cyan.600"
                              style={
                                item.progress === item.goal ?
                                {color: "#08E17C"}
                                : {color: "#10BCE1"}
                              }>
                                Goal: {item.goal} time/s
                              </Text>
                          </HStack>
                          
                          {/* <Text>{item.formOfMeasurement}</Text>        */}
                      </VStack>
                      <VStack h="20" w="90" justifyContent={"center"}>
                        {!toggleEdit &&
                          <NativeBaseProvider>
                            <HStack h="20" alignItems={"center"} justifyContent={"center"}>
                                <IconButton
                                h="10" w="10"
                                alignItems="center"
                                variant="ghost"
                                style={
                                  item.progress === item.goal ?
                                  {backgroundColor: "gray"}
                                  : {backgroundColor: "#08E17C"}
                                }
                                _pressed={{bgColor:'green.500'}}
                                // shadow={3}
                                rounded="full"
                                onPress={() => updateHabit(item, "inc")}
                                icon={<Icon as={Entypo} name="plus" />} _icon={{
                                  color: "white",
                                  size: "20px",
                                  marginTop: "2px",
                                }} 
                                />
                                <IconButton
                                h="10" w="10" ml={2}
                                alignItems="center"
                                variant="solid"
                                style={
                                  item.progress === 0 ?
                                  {backgroundColor: "gray"}
                                  : {backgroundColor: "#FB6767"}
                                }
                                _pressed={{bgColor:'danger.500'}}
                                
                                rounded="full"
                                onPress={() => updateHabit(item, "dec")}
                                icon={<Icon as={Entypo} name="minus" />} _icon={{
                                  color: "white",
                                  size: "20px",
                                  marginTop: "2px",
                                }} 
                                />
                            </HStack>
                          </NativeBaseProvider>
                          
                        }
                        {toggleEdit &&
                          <NativeBaseProvider>
                            <HStack h="20" alignItems={"center"} justifyContent={"center"}>
                              <IconButton 
                              h="10" w="10"
                              alignItems="center"
                              variant="solid"
                              bgColor={'#08E17C'}
                              _pressed={{bgColor:'green.500'}}
                              rounded="full"
                              onPress={() => {
                                setShowModal(true); 
                                loadEdit(item.id)
                              }} 
                              icon={<Icon as={Ionicons} name="pencil-sharp" />} _icon={{
                                  color: "white",
                                  size: "20px",
                                  marginTop: "2px",
                                }} 
                              />
                              <IconButton 
                              h="10" w="10" ml={2}
                              alignItems="center"
                              bgColor={'#fb6767'}
                              _pressed={{bgColor:'danger.500'}}
                              variant="solid"
                              rounded="full"
                              onPress={() => {
                                setIsOpen(true);
                                loadDelete(item.id)
                              }} 
                              icon={<Icon as={Ionicons} name="trash-bin-sharp" />} _icon={{
                                  color: "white",
                                  size: "20px",
                                  marginTop: "2px",
                                  height: 5,
                                  width: 5
                                }} 
                              />
                            </HStack>
                          </NativeBaseProvider>
                        }
                        
                      </VStack>
                    </VStack>
                </Pressable>
            </Center>
          
            {/* <Slide in={isViewHabit} placement="top">
              <Box p={10} _text={{
              color: "white"
            }} bg="teal.400" rounded="md">
                I am coming from Top
              </Box>
            </Slide> */}
        </NativeBaseProvider>
      );
    };
  
    useEffect(async () => {
      await createTables();
      await getHabits();
    }, []);
  
    return (
      <NativeBaseProvider>
        <Center maxWidth="100%" flex={1} justifyContent="space-between" px="3">
        
        {/* ===================================== HEADER ===================================== */}
            <HStack width={375} maxWidth="100%" space={3} justifyContent="space-between" pt={StatusBar.currentHeight + 15}>
            <VStack pl={2} alignItems="flex-start" >
                <Text ml={2} fontSize="4xl" fontWeight="bold" color="black">
                    Hey there,
                </Text>
                <Input variant="unstyled" placeholder="(Name)" mt={-3} fontSize="4xl" fontWeight="bold" color="black"/>
                <Text ml={2} fontSize="lg" color="gray.400">{date}</Text>
            </VStack>
            <Box alignItems="center">
                {toggleEdit ? 
                  <Button variant="ghost" onPress={() => setToggleEdit(false)}>
                  <Text fontSize="xl" fontWeight="bold" color="cyan.600">
                      Cancel
                   </Text>
                  </Button>
                  :
                  <Button variant="ghost" onPress={() => setToggleEdit(true)}>
                  <Text fontSize="xl" fontWeight="bold"
                    style={{
                      color: "#10BCE1"
                    }}>
                      Edit
                  </Text> 
                  </Button>
                }
            </Box>
            {!toggleEdit &&
            <Box ml={-20} mr={-20} h="10" w="10" alignItems="center">
                <Button
                h="10" w="10"
                alignItems="center"
                variant="ghost"
                bgColor={'white'}
                shadow={3}
                rounded="full"
                onPress={() => setShowModal(true)}>
                <Text fontSize="2xl" lineHeight="25.5" fontWeight="bold"
                  style={{
                    color: "#10BCE1"
                  }}>
                    +
                </Text>
                </Button>
            </Box>
            }
            <Center>
                <Modal name="addHabitModal" isOpen={showModal} onClose={() => 
                {
                    setShowModal(false);
                    setHabitName("");
                    setRecurrence("");
                    setFormOfMeasurement("");
                    setGoal("");
                }
                }>
                <Modal.Content maxWidth="400px">
                    <Modal.CloseButton />
                    <Modal.Header bgColor={"cyan.500"} alignItems={"center"}><Text fontWeight="bold" color="white">
                        {toggleEdit ? "Edit habit":"Add a habit"}    
                    </Text></Modal.Header>
                    <Modal.Body>
                    <Center>
                        <VStack width="100%" space={3}>
                        <FormControl isRequired>
                            <FormControl.Label>Name of habit</FormControl.Label>
                            <Input
                            width="100%"
                            placeholder="Name of habit"
                            value={habitName}
                            onChangeText={setHabitName}
                             />
                        </FormControl>

                        <FormControl isRequired>
                            <FormControl.Label>Recurrence</FormControl.Label>
                            <Input
                            width="100%"
                            placeholder="Recurrence"
                            value={recurrence}
                            keyboardType="numeric"
                            onChangeText={setRecurrence}
                             />
                        </FormControl>

                        <FormControl isRequired>
                            <FormControl.Label>Form of measurement</FormControl.Label>
                        <Radio.Group name="formOfMeasurementGroup" accessibilityLabel="Form of measurement"
                        defaultValue={
                          (toggleEdit && formOfMeasurement==2) ? "2"
                          : (toggleEdit && formOfMeasurement==1) ? "1" : null
                        }>
                            <HStack>
                            <Radio
                                colorScheme="gray"
                                value="1"
                                status= { formOfMeasurement === '1' ? 'checked' : 'unchecked' }
                                onPress={() => setFormOfMeasurement(1)}
                                name="formOfMeasurement"
                                mt={1}
                                mr={5}
                                // onPress={setFormOfMeasurement}
                            >
                                Increment
                            </Radio>
                            <Radio
                                colorScheme="gray"
                                value="2"
                                status= { formOfMeasurement === '2' ? 'checked' : 'unchecked' }
                                onPress={() => setFormOfMeasurement(2)}
                                name="formOfMeasurement"
                                mt={1}
                                mr={5}
                                // onPress={setFormOfMeasurement}
                            >
                                Timer
                            </Radio>
                            </HStack>
                        </Radio.Group>
                        </FormControl>

                        <FormControl isRequired>
                            <FormControl.Label>Goal</FormControl.Label>
                            <Input
                            width="100%"
                            placeholder="Goal"
                            value={goal}
                            keyboardType="numeric"
                            onChangeText={setGoal}
                             />
                        </FormControl>

                        <Button variant="outline" onPress={toggleEdit ? editHabit : addHabit} colorScheme="pink">
                            Submit
                        </Button>

                        </VStack>
                    </Center>
                    </Modal.Body>
                </Modal.Content>
                </Modal>
            </Center>
            </HStack>

            {/* Delete Alert Dialog */}
            <Center>
              <AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={onClose}>
                <AlertDialog.Content>
                  <AlertDialog.Header bgColor={"danger.500"} alignItems={"center"}><Text fontWeight="bold" color="white">Delete a Habit</Text></AlertDialog.Header>
                  <AlertDialog.Body>
                    Are you sure you want to delete this habit?
                  </AlertDialog.Body>
                  <AlertDialog.Footer>
                    <Button.Group space={2}>
                      <Button colorScheme='danger' onPress={deleteHabit}>
                        Delete
                      </Button>
                      <Button colorScheme='gray' onPress={onClose} ref={cancelRef} _text={{color: "white"}}>
                        Cancel
                      </Button>
                    </Button.Group>
                  </AlertDialog.Footer>
                </AlertDialog.Content>
              </AlertDialog>
            </Center>
            {/* Delete Alert Dialog */}


            {/* <StatusBar backgroundColor="#222" /> */}
    
            {/* <TextInput
            placeholder="Enter habit"
            value={habit}
            onChangeText={setHabit}
            style={{ marginHorizontal: 8 }}
            />
    
            <Button variant="solid" title="Submit" onPress={addHabit} /> */}
            {/* <Spacer y={1} /> */}
            
          <ScrollView maxW="375" h="485">
              <Center>
                  <VStack mt={5} alignItems="center">
                  <FlatList
                  data={habits}
                  renderItem={renderHabit}
                  key={cat => cat.id}
                  />
                  </VStack>
              </Center>
          </ScrollView>

          <Bottom />
        </Center>
        
          <Slide in={isViewHabit} placement="bottom">
            <Box p={10} bg="white"
            width={width} height = "425"
            position="absolute" bottom="-75"
            rounded="70">
              <Center>
                <Text fontSize="4xl" fontWeight="bold" color="black">
                  {habitNameDisplay}
                </Text>

                <HStack space={10} justifyContent="center" alignItems={"center"}>
                  <VStack mt={5} space={5}>
                    <Box>
                      <Text fontSize="2xl" fontWeight="bold" color="#10BCE1">
                        Every {recurrenceDisplay} day/s
                      </Text>
                      <Text fontSize="sm" fontWeight="semibold" color="gray.400">
                        Recurrence
                      </Text>
                    </Box>
                    <Box>
                      <Text fontSize="2xl" fontWeight="bold" color="#10BCE1">
                        {formOfMeasurementDisplay}
                      </Text>
                      <Text fontSize="sm" fontWeight="semibold" color="gray.400">
                        Form of measurement
                      </Text>
                    </Box>
                  </VStack>
                  <VStack mt={5} space={5}>
                  <Box>
                      <Text fontSize="2xl" fontWeight="bold" color="#10BCE1">
                        {goalDisplay} time/s
                      </Text>
                      <Text fontSize="sm" fontWeight="semibold" color="gray.400">
                        Goal
                      </Text>
                    </Box>
                    <Box>
                      <Text fontSize="2xl" fontWeight="bold" color="#10BCE1">
                        {skipsDisplay} skip/s left
                      </Text>
                      <Text fontSize="sm" fontWeight="semibold" color="gray.400">
                        Number of skips left
                      </Text>
                    </Box>
                  </VStack>
                </HStack>
                <HStack mt={8} space={10} justifyContent="space-evenly">
                  <Button
                  variant="subtle"
                  rounded="lg"
                  onPress={() => alert("Skipped habit")}>
                    Skip today
                  </Button>
                  <Button
                  variant="outline"
                  rounded="lg"
                  onPress={() => setIsViewHabit(false)}>
                    Close habit
                  </Button>
                </HStack>
              </Center> 
            </Box>
          </Slide>
      
      </NativeBaseProvider>
    );
  };
  
  const Statistics = ({navigation}) => {
    const [date, setDate] = useState(null); //ADDED
    //useEffect added
    useEffect(() => {
      let today = new Date();
      let month=today.getMonth()+1;
      let m= 'Jan';
      if (month==2)
      {
        m='Jan';
      }
      else if (month==2)
      {
        m='Feb';
      }
      else if (month==3)
      {
        m='Mar';
      }
      else if (month==4)
      {
        m='Apr';
      }
      else if (month==5)
      {
        m='May';
      }
      else if (month==6)
      {
        m='June';
      }
      else if (month==7)
      {
        m='July';
      }
      else if (month==8)
      {
        m='Aug';
      }
      else if (month==9)
      {
        m='Sept';
      }
      else if (month==10)
      {
        m='Oct';
      }
      else if (month==11)
      {
        m='Nov';
      }
      else if (month==12)
      {
        m='Dec';
      }
      let day=today.getDay();
      let d= 'Sun';
      if (day==0)
      {
        d='Sun';
      }
      else if (day==1)
      {
        d='Mon';
      }
      else if (day==2)
      {
        d='Tue';
      }
      else if (day==3)
      {
        d='Wed';
      }
      else if (day==4)
      {
        d='Thurs';
      }
      else if (day==5)
      {
        d='Fri';
      }
      else if (day==6)
      {
        d='Sat';
      }
      let date = d+ ', '+ m + ' '+ today.getDate();
      setDate(date);
    }, []);

    return (
      <NativeBaseProvider>
      {/* ===================================== HEADER ===================================== */}
        <HStack width={375} maxWidth="100%" space={3} justifyContent="space-between" pt={StatusBar.currentHeight + 15}>
            <VStack pl={2} alignItems="flex-start" >
                <Text ml={2} fontSize="4xl" fontWeight="bold" color="black">
                    Good job,
                </Text>
                <Input variant="unstyled" placeholder="(Name)" mt={-3} fontSize="4xl" fontWeight="bold" color="black"/>
                <Text ml={2} fontSize="lg" color="gray.400">{date}</Text>
            </VStack>
        </HStack>
        <ScrollView maxW="375" h="485">
              <Center>
                  <VStack mt={5} alignItems="center">
                  <FlatList/>
                  </VStack>
              </Center>
        </ScrollView>
        <Bottom />
      </NativeBaseProvider>
    );
  };

  export default App;