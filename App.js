import React, { useEffect, useState } from "react";
// import { View, Text, StatusBar, TextInput, Button, FlatList } from "react-native";
import { Alert, View, StatusBar, TextInput, FlatList, SectionList } from "react-native";
import * as SQLite from "expo-sqlite";
import { NativeBaseProvider, HStack, VStack, Center, Box, Button, Text, Modal, FormControl, Input, Radio, UseTheme, Spacer, Divider, ScrollView, Icon, IconButton} from 'native-base';
import { MaterialCommunityIcons, Entypo, Ionicons } from "@expo/vector-icons";

const db = SQLite.openDatabase("e:\\database\\habitTracker.db");

function Bottom () {
  return <NativeBaseProvider>
      <Box flexDirection="row" alignItems="center" width="full" height = "100%" bg="cyan.600" m="0">
        <HStack width={375} maxWidth="100%" space={3} justifyContent="space-evenly">
            <Box alignItems="center">
              <IconButton 
              variant = "unstyled"
              onPress={() => Alert.alert("This is the Home tab")} 
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
                onPress={() => Alert.alert("This is the Statistics tab")} 
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
      </Box> 
      </NativeBaseProvider>;
  }

const App = () => {
    const [showModal, setShowModal] = useState(false);
    const [habitName, setHabitName] = useState("");
    const [recurrence, setRecurrence] = useState("");
    const [formOfMeasurement, setFormOfMeasurement] = useState("");
    const [id, setHabitId] = useState(0);
    const [goal, setGoal] = useState("");
    const [habits, setHabits] = useState([]);
    const [toggleEdit, setToggleEdit] = useState(false);
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

    const createTables = () => {
      db.transaction(txn => {
        txn.executeSql(
        //   `DROP TABLE habits`,
          `CREATE TABLE IF NOT EXISTS habits (id INTEGER PRIMARY KEY AUTOINCREMENT, habitName TEXT, recurrence INTEGER, formOfMeasurement INTEGER, goal INTEGER)`,
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
      
      const insertSql =
      "INSERT INTO habits (habitName,recurrence,formOfMeasurement,goal) VALUES ('" +
      habitName +
      "'," +
      recurrence +
      "," +
      formOfMeasurement +
      "," +
      goal +
      ")";
  
      db.transaction(txn => {
        txn.executeSql(
          insertSql,
          [],
          (sqlTxn, res) => {
            console.log(`Added successfully: ${habitName} ${recurrence} ${formOfMeasurement} ${goal}`);
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
                results.push({ id: item.id, habitName: item.habitName, recurrence: item.recurrence, formOfMeasurement: item.formOfMeasurement, goal: item.goal });
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
        <NativeBaseProvider>
            <Center>
                <HStack w="80" h="20" mb="4" ml="4" mr="4" bg="white" rounded="2xl" shadow={3} flexDirection="row" style={{flexWrap: "wrap", overflow: "hidden"}}>
                    <VStack h="20" w="55" bg="cyan.600" alignItems="center" justifyContent="center"> 
                      <Text ml="-1" alignItems="center" justifyContent="center" fontSize="2xl" fontWeight="medium" color="white"> {item.recurrence}</Text>
                    </VStack>
                    <Divider my={2} orientation="vertical" bg="transparent"/ >
                    <VStack w="250" flexDirection="row" justifyContent={"space-between"}>
                      <VStack pt={3} pb={3} pr={5} pl={5}>
                          {/* <Text style={{ marginRight: 9 }}>{item.id}</Text>    */}
                          <HStack alignItems={"flex-start"}>
                            <Text fontSize="xl" fontWeight="bold" color="black">{item.habitName}</Text>
                          </HStack>
                          <HStack alignItems={"flex-start"}>
                              <Text fontSize="sm" fontWeight="bold" color="cyan.600">Goal: {item.goal} time/s</Text>
                          </HStack>
                          
                          {/* <Text>{item.formOfMeasurement}</Text>        */}
                      </VStack>
                      <VStack h="20" w="90" justifyContent={"center"}>
                        {!toggleEdit &&
                          <NativeBaseProvider>
                            <HStack h="20" alignItems={"center"} justifyContent={"center"}>
                                <Button
                                h="10" w="10"
                                alignItems="center"
                                variant="ghost"
                                bgColor={'green.400'}
                                // shadow={3}
                                rounded="full">
                                <Text fontSize="2xl" lineHeight="25.5" fontWeight="bold" color="white"
                                onPress={() => setRecurrence(item.recurrence++)}>
                                    +
                                </Text>
                                </Button>
                                <Button
                                h="10" w="10" ml={2}
                                alignItems="center"
                                variant="ghost"
                                bgColor={'danger.500'}
                                // shadow={3}
                                rounded="full">
                                <Text fontSize="2xl" lineHeight="25.5" fontWeight="bold" color="white"
                                onPress={() => setRecurrence(item.recurrence--)}>
                                    -
                                </Text>
                                </Button>
                            </HStack>
                          </NativeBaseProvider>
                          
                        }
                        {toggleEdit &&
                          <NativeBaseProvider>
                            <HStack h="20" alignItems={"center"} justifyContent={"center"}>
                              <IconButton 
                              h="10" w="10"
                              alignItems="center"
                              variant="ghost"
                              bgColor={'green.400'}
                              rounded="full"
                              onPress={() => {
                                setShowModal(true); 
                                loadEdit(item.id)
                              }} 
                              icon={<Icon as={Ionicons} name="pencil-sharp" />} _icon={{
                                  color: "white",
                                  size: "sm"
                                }} 
                              />
                              <IconButton 
                              h="10" w="10" ml={2}
                              alignItems="center"
                              variant="ghost"
                              bgColor={'danger.500'}
                              rounded="full"
                              onPress={() => Alert.alert("This is the Delete Alert")} 
                              icon={<Icon as={Ionicons} name="trash-bin-sharp" />} _icon={{
                                  color: "white",
                                  size: "sm"
                                }} 
                              />
                            </HStack>
                          </NativeBaseProvider>
                        }
                        
                      </VStack>
                    </VStack>
                </HStack>
            </Center>
            
            
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
                <Text fontSize="lg" color="gray.400">{date}</Text>
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
                  <Text fontSize="xl" fontWeight="bold" color="cyan.600">
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
                <Text fontSize="2xl" lineHeight="25.5" fontWeight="bold" color="cyan.600">
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

                        {/* <FormControl isRequired>
                            <FormControl.Label>Form of measurement</FormControl.Label>
                            <Input
                            width="100%"
                            placeholder=""
                            value={formOfMeasurement}
                            onChangeText={setFormOfMeasurement}
                             />
                        </FormControl> */}

                        <FormControl isRequired>
                            <FormControl.Label>Form of measurement</FormControl.Label>
                        <Radio.Group name="formOfMeasurementGroup" accessibilityLabel="Form of measurement"
                        defaultValue={(toggleEdit && formOfMeasurement==2) ? "2" : "1"}>
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
      </NativeBaseProvider>
    );
  };
  
  export default App;