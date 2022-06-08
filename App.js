import React, { useEffect, useState } from "react";
// import { View, Text, StatusBar, TextInput, Button, FlatList } from "react-native";
import { AppRegistry, Dimensions, Alert, View, StatusBar, TextInput, FlatList, SectionList } from "react-native";
import * as SQLite from "expo-sqlite";
import { NativeBaseProvider, HStack, VStack, Center, Box, Button, Pressable, Text, Modal, FormControl, Input, Radio, UseTheme, Spacer, Divider, ScrollView, Icon, IconButton, AlertDialog, Slide, Flex } from 'native-base';
import { MaterialCommunityIcons, Entypo, Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import {LogBox} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/native';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import OutsideView from 'react-native-detect-press-outside';
import { LinearGradient } from 'expo-linear-gradient';
import { get } from "react-native/Libraries/Utilities/PixelRatio";
import {Calendar} from 'react-native-calendars';

LogBox.ignoreLogs(['NativeBase:']);

const db = SQLite.openDatabase("e:\\database\\habitTracker.db");

var height = Dimensions.get('window').height;
var width = Dimensions.get('window').width;


function Bottom () {
  var height = Dimensions.get('window').height;
  var width = Dimensions.get('window').width;
  const navigation = useNavigation(); 
  const [selected, setSelected] = useState(0);
  const config = {
    dependencies: {
      "linear-gradient": LinearGradient
    }
  };
  return <NativeBaseProvider config={config}>
      <Box flexDirection="row" alignItems="center" width={width} height = "125" bg={{linearGradient: {colors: ["#25BAE5", "#69B2F4"], start: [0, 0], end: [0, 1]}}} m="0">
        <HStack width={width} height = "125" maxWidth="100%" space={3} justifyContent="space-evenly">
            {/* <Pressable mt="1" alignItems="center" opacity={selected === 0 ? 1 : 0.5} onPress={() => {navigation.navigate("Main"); setSelected(0)}}>
                <Icon as={MaterialCommunityIcons} name="home-variant" size="lg" color="white"/>
            </Pressable>
            <Pressable mt="1" alignItems="center" opacity={selected === 1 ? 1 : 0.5} onPress={() => {navigation.navigate("Statistics"); setSelected(1)}}>
                <Icon as={Entypo} name="bar-graph" size="lg" color="white"/>
            </Pressable> */}
            <IconButton
                variant="link" 
                onPress={() => {navigation.navigate("Main")}}
                icon={<Icon as ={MaterialCommunityIcons} name="home-variant" size="lg" color="#86E9FA"/>} _pressed={{
                  _icon: {color: "white"}
                  }}/>
            <IconButton
                variant="link"
                onPress={() => {navigation.navigate("Statistics")}}
                icon={<Icon as={Entypo} name="bar-graph" size="lg" color="#86E9FA"/>} _pressed={{
                  _icon: {color: "white"}
                  }}/>
        </HStack>
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
  const [skips, setSkips] = useState("");
  const [habits, setHabits] = useState([]);
  const [toggleEdit, setToggleEdit] = useState(false);
  const [date, setDate] = useState(null); //ADDED
  const [isOpen, setIsOpen] = useState(false); //FOR DELETE
  const onClose = () => setIsOpen(false); //FOR DELETE
  const cancelRef = React.useRef(null); //FOR DELETE

  const [SkipOpen, setSkipOpen]= useState(false); //FOR SKIP
  const onCloseSkip = () => setSkipOpen(false); //FOR SKIP
  const cancelSkip = React.useRef(null); //FOR SKIP

  const [isViewHabit, setIsViewHabit] = React.useState(false); //FOR VIEW HABIT 
  const [habitNameDisplay, setHabitNameDisplay] = useState("");
  const [recurrenceDisplay, setRecurrenceDisplay] = useState("");
  const [goalDisplay, setGoalDisplay] = useState("");
  const [formOfMeasurementDisplay, setFormOfMeasurementDisplay] = useState("");
  const [skipsDisplay, setSkipsDisplay] = useState("");
  const [itemID, setitemID] = useState(0);
  const [progressDisplay, setProgressDisplay] = useState("");
  const [formOfMeasurementOut, setFormOfMeasurementOut]= useState("");
  const [nextRecurrence, setnextRecurrence]= useState("");
  const [isSkip,setIsSkip]= useState(false);
  const [doesExist, setDoesExist] = useState(null);
  const [currentStreak, setCurrentStreak] = useState("");
  const [bestStreak, setBestStreak] = useState("");
  const [countHabitsCalendarRows, setHabitsCalendarRows] = useState(null);
  const [userName, setUserName] = useState("");
  const [count, setCounter]= useState(0);
  const [daysMore, setDaysMore] = useState("")
  const [habitsFetched, setHabitsFetched] = useState(0)

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
          //`DROP TABLE habits`,
          `CREATE TABLE IF NOT EXISTS habits (id INTEGER PRIMARY KEY AUTOINCREMENT,
            habitName TEXT,
            recurrence INTEGER,
            formOfMeasurement INTEGER,
            goal INTEGER,
            progress INTEGER,
            skips INTEGER,
            skipped BOOL,
            date DATE
            )`,
          [],
          (sqlTxn, res) => {
            console.log("table created successfully");
          },
          error => {
            console.log("error on creating table " + error.message);
          },
        );
      });

      db.transaction(txn => {
        txn.executeSql(
          // `DROP TABLE habitsCalendar`,
          `CREATE TABLE IF NOT EXISTS habitsCalendar (
            id INTEGER,
            date DATE,
            skipped INTEGER,
            CONSTRAINT fk_id
              FOREIGN KEY (id)
              REFERENCES habits(id)
            )`,
          [],
          (sqlTxn, res) => {
            console.log("habitsCalendar: table created successfully");
          },
          error => {
            console.log("habitsCalendar: error on creating table " + error.message);
          },
        );
      });

      db.transaction(txn => {
        txn.executeSql(
          //`DROP TABLE name`,
          `CREATE TABLE IF NOT EXISTS name (id INTEGER PRIMARY KEY AUTOINCREMENT, userName TEXT)`,
          [],
          (sqlTxn, res) => {
            console.log("name: table created successfully");
          },
          error => {
            console.log("name: error on creating table " + error.message);
          },
        );
      });

    };
    

    const checkIfReset = () => {

      db.transaction(function (tx) {
        tx.executeSql(
          "SELECT * FROM habits" ,
          [],
          (sqlTxn, res) => {
            var len = res.rows.length;
            // console.log("len: " +len);
            for (let i = 0; i < len; i++) {
                 console.log("# " + res.rows.item(i)["habitName"] + " " + res.rows.item(i)["progress"] + " " + res.rows.item(i)["date"])
             }
          },
          error => {
            console.log("error on counting " + error.message);
          },
        );
      });

      let currentDate;

      let today = new Date()
      let year = today.getFullYear()
      let month = today.getMonth()+1
      let day = today.getDate()

      if (month < 10) {
        month = '0' + month
      }

      if (day < 10) {
        day = '0' + day
      }

      currentDate = year+'-'+month+'-'+day;


      // check last date stored, which will be compared with current date
      let lastDateStored;

      db.transaction(function (tx) {
        tx.executeSql(
          "SELECT MAX(date) as \"lastDateStored\" FROM habits",
          [],
          (sqlTxn, res) => {
            lastDateStored = res.rows.item(0)["lastDateStored"]
            // console.log("lastDateStored: " + lastDateStored);
            // console.log("!!!!! currentDate " + currentDate)
            // console.log("!!!!! lastDateStored " + lastDateStored)


            if (lastDateStored != null && lastDateStored != currentDate) {
              console.log("HMM RESET TO 0!")

              const resetSql =
              "UPDATE habits SET progress=0, date='" +
              currentDate + "'"
              ;
          
              db.transaction(txn => {
                txn.executeSql(
                  resetSql,
                  [],
                  (sqlTxn, res) => {
                    console.log(`habits reset successfully`);
                  },
                  error => {
                    console.log("error on resetting habit " + error.message);
                  },
                );
              });

              getHabits();
            } else {
              console.log("NO NEED TO RESET")
            }
          },
          error => {
            console.log("error on getting lastDateStored " + error.message);
          },
        );
      });
    }

    const addName = () => {
      const insertSql =
      "INSERT INTO name (userName) VALUES ('" +
      userName +
      "')";

      db.transaction(txn => {
        txn.executeSql(
          insertSql,
          [],
          (sqlTxn, res) => {
            console.log(`Updated successfully: ${userName}`);
          },
          error => {
            console.log("error on updating name " + error.message);
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
        // console.log(str);
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
      const skips = 2;
      const skipped = 0;

      let today = new Date()
      let year = today.getFullYear()
      let month = today.getMonth()+1
      let day = today.getDate()
      
      if (month < 10) {
        month = '0' + month
      }

      if (day < 10) {
        day = '0' + day
      }

      let date = year+'-'+month+'-'+day;

      // console.log("++ " + date)

      const insertSql =
      "INSERT INTO habits (habitName,recurrence,formOfMeasurement,goal,progress,skips,skipped,date) VALUES ('" +
      habitName +
      "'," +
      recurrence +
      "," +
      formOfMeasurement +
      "," +
      goal +
      "," +
      progress +
      "," +
      skips +
      "," +
      skipped +
      ",'" +
      date +
      "')";

      // console.log(insertSql)
  
      db.transaction(txn => {
        txn.executeSql(
          insertSql,
          [],
          (sqlTxn, res) => {
            console.log(`Added successfully: ${habitName} ${recurrence} ${formOfMeasurement} ${goal} ${progress} ${skips} ${skipped}`);
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
      setCounter(0);
      let results = getStreaks()
      setHabits(results);
      getStreaks();
    };
  
    const editHabit = () => {
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
        // console.log(str);
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
        setCounter(0);
        let results = getStreaks()
        setHabits(results);
        getStreaks();
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

    const getName = () => {
        db.transaction(txn => {
          txn.executeSql(
            `SELECT * FROM name ORDER BY id DESC LIMIT 1`,
            [],
            (sqlTxn, res) => {
              console.log("name retrieved successfully");
              let len = res.rows.length;
  
              if (len > 0) {
                let results;
                let item = res.rows.item(0);
                results=item.userName;
              
                setUserName(results);
                console.log("name " + results);
              } else {
                setUserName("");
                console.log("no name listed");
              }
            },
            error => {
              console.log("error on getting name " + error.message);
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
                // results.push({ id: item.id, habitName: item.habitName, recurrence: item.recurrence, formOfMeasurement: item.formOfMeasurement, goal: item.goal, progress: item.progress, skips: item.skips, skipped: item.skipped, date: item.date });
                results.push({ id: item.id, habitName: item.habitName, recurrence: item.recurrence, formOfMeasurement: item.formOfMeasurement, goal: item.goal, progress: item.progress, skips: item.skips, skipped: item.skipped, daysmore: 0, date: item.date });
              }
            
              setHabits(results);
              setHabitsFetched(habitsFetched + 1)
              setCounter(count + 1);
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
      let today = new Date()
      let year = today.getFullYear()
      let month = today.getMonth()+1
      let day = today.getDate()
      
      if (month < 10) {
        month = '0' + month
      }

      if (day < 10) {
        day = '0' + day
      }

      let date = year+'-'+month+'-'+day;
      
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

      const updateHabitsTable =
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
      ",skips=" +
      item.skips +
      ",skipped=" +
      item.skipped +
      ",date='" +
      date +
      "' WHERE id=" +
      item.id;

      db.transaction(function (tx) {
        tx.executeSql(
          updateHabitsTable,
          [],
          (sqlTxn, res) => {
            console.log("habit updated successfully");
          },
          error => {
            console.log("error on updating habit " + error.message);
          },
        );
      });


      let currentDoesExist = false;

      if (item.progress < item.goal) {
        // console.log(">>>>>>>s progress < goal from habitsCalendar")
        setDoesExist(false)
        currentDoesExist = false;
        // console.log('==== doesExist: ' + currentDoesExist)
        if (item.progress == item.goal-1 && doesExist == true) {
          // delete
          // console.log(">>>>>>> delete habit from habitsCalendar")
          const deleteHabitsCalendarTable =
            "DELETE FROM habitsCalendar where id=" +
            item.id +
            " AND date='" +
            date +
            "'"
            ;

          db.transaction(function (tx) {
            tx.executeSql(
              deleteHabitsCalendarTable,
              [],
              (sqlTxn, res) => {
                console.log("finished deleting habit in habitsCalendar: ");
              },
              error => {
                console.log("error on deleting habit in habitsCalendar: " + error.message);
              },
            );
          });
        }
      }
      // return 1 if id is in habitsCalendar
      else if (item.progress == item.goal && doesExist == false) {
          // console.log(">>>>>>> add habit to habitsCalendar")
          setDoesExist(true)
          currentDoesExist = true;
          // console.log('==== doesExist: ' + currentDoesExist)
      
          // console.log(date)
          // if habit is done, add entry to habitsCalendar
          const insertHabitsCalendarTable =
          "INSERT INTO habitsCalendar (id,date,skipped) VALUES (" +
          item.id +
          ",'" +
          date +
          "', 0)";

          db.transaction(function (tx) {
            tx.executeSql(
              insertHabitsCalendarTable,
              [],
              (sqlTxn, res) => {
                console.log("finished inserting habit in habitsCalendar: " + item.id + " " + date);
              },
              error => {
                console.log("error on inserting habit in habitsCalendar: " + error.message);
              },
            );
          });
  
          console.log(insertHabitsCalendarTable)
      }

      // print rows where id=item.id
      db.transaction(function (tx) {
        tx.executeSql(
          "SELECT count(*) FROM habitsCalendar WHERE id=" + item.id,
          [],
          (sqlTxn, res) => {
            let count = res.rows.item(0)["count(*)"]
            // console.log("count: " + count);
          },
          error => {
            console.log("error on counting " + error.message);
          },
        );
      });

      // print all entries in habitsCalendarList
      db.transaction(function (tx) {
        tx.executeSql(
          "SELECT * FROM habitsCalendar" ,
          [],
          (sqlTxn, res) => {
            var len = res.rows.length;
            console.log("len: " +len);
            console.log("==== habitsCalendar ====")
            for (let i = 0; i < len; i++) {
                 let rowID = res.rows.item(i)["id"];
                 let rowDate = res.rows.item(i)["date"];
                 let rowSkipped = res.rows.item(i)["skipped"];
                 console.log("+++ " + rowID + " " + rowDate + " " + rowSkipped)
             }
          },
          error => {
            console.log("error on counting " + error.message);
          },
        );
      });
    }

    function skipHabit() {
      let val=skipsDisplay;
      let skipping=1;
      if (skipsDisplay!=0){
        val--;
      }
      else{
        Alert.alert("Skips are consumed!");
        setSkipOpen(false);
        return
      }

      // console.log("updating: " + itemID)
      const skipSql =
      "UPDATE habits SET habitName = '" +
      habitNameDisplay +
      "', recurrence=" +
      recurrenceDisplay +
      ",formOfMeasurement=" +
      formOfMeasurementOut +
      ",goal=" +
      goalDisplay +
      ",progress=" +
      progressDisplay +
      ",skips=" +
      val +
      ",skipped=" +
      skipping +
      " WHERE id=" +
      itemID;

      // console.log(skipSql)
      db.transaction(function (tx) {
        tx.executeSql(
          skipSql,
          [],
          (sqlTxn, res) => {
            console.log("habit skipped successfully");
          },
          error => {
            console.log("error on skipping habit " + error.message);
          },
        );
      });

      let today = new Date()
      let year = today.getFullYear()
      let month = today.getMonth()+1
      let day = today.getDate()
      
      if (month < 10) {
        month = '0' + month
      }

      if (day < 10) {
        day = '0' + day
      }

      let date = year+'-'+month+'-'+day;      

      const insertHabitsCalendarTable =
      "INSERT INTO habitsCalendar (id,date,skipped) VALUES (" +
      itemID +
      ",'" +
      date +
      "', 1)";

      db.transaction(function (tx) {
        tx.executeSql(
          insertHabitsCalendarTable,
          [],
          (sqlTxn, res) => {
            console.log("finished inserting skipped habit in habitsCalendar: " + itemID + " " + date);
          },
          error => {
            console.log("error on inserting skipped habit in habitsCalendar: " + error.message);
          },
        );
      });

      console.log(insertHabitsCalendarTable)

      // print all entries in habitsCalendarList
      db.transaction(function (tx) {
        tx.executeSql(
          "SELECT * FROM habitsCalendar" ,
          [],
          (sqlTxn, res) => {
            var len = res.rows.length;
            console.log("len: " +len);
            console.log("==== habitsCalendar ====")
            for (let i = 0; i < len; i++) {
                  let rowID = res.rows.item(i)["id"];
                  let rowDate = res.rows.item(i)["date"];
                  let rowSkipped = res.rows.item(i)["skipped"];
                  console.log("+++ " + rowID + " " + rowDate + " " + rowSkipped)
              }
          },
          error => {
            console.log("error on counting " + error.message);
          },
        );
      });

      setSkipOpen(false);
      setSkipsDisplay(val);
      getHabits();
    }

    function updateRecurrence(item) {
      let today = new Date()
      let day = today.getDate()
      let month = today.getMonth()
      let year = today.getFullYear()

      let daysmonth=new Date(year, month, 0).getDate()

      db.transaction(function (tx) {
        tx.executeSql(
          "SELECT MAX(date) FROM habitsCalendar WHERE id=" + item.id,
          [],
          (sqlTxn, res) => {
            let cur = res.rows.item(0)["MAX(date)"]
            let nextrec;
            if (cur!=null)
            {
              nextrec= new Date(res.rows.item(0)["MAX(date)"]).getDate() + item.recurrence;
            }
            else
            {
              nextrec = 0;
            }

            if (nextrec>daysmonth){
              nextrec=nextrec-daysmonth;
            }
            let daysmore= nextrec- day;
            if (daysmore <0){
              daysmore=daysmore+day;
            }
            if(item.recurrence-daysmore==0)
            {
              daysmore=0;
            }
            item.daysmore=daysmore;
            setHabits(habits);
            console.log(item.daysmore)
            console.log("Days More:",daysmore)
            console.log("Next Recurrence",nextrec)
            console.log("Day today", day)
          },
          error => {
            console.log("error on getting latest date " + error.message);
          },
        );
      });
    }

    const viewHabit = (item) => {
      setIsViewHabit(true);

      console.log("viewed " + item.habitName);
      setitemID(item.id);
      setHabitNameDisplay(item.habitName);
      setRecurrenceDisplay(item.recurrence);
      setGoalDisplay(item.goal);
      setSkipsDisplay(item.skips);
      setProgressDisplay(item.progress);
      setFormOfMeasurementOut(item.formOfMeasurement);
      setIsSkip(item.skipped);
      setDaysMore(item.daysmore)
      if (item.formOfMeasurement == 1) {
        setFormOfMeasurementDisplay("Increment");
      } else {
        setFormOfMeasurementDisplay("Timer");
      }

    }
 
    const config = {
      dependencies: {
        "linear-gradient": LinearGradient
      }
    };

    const renderHabit = ({ item }) => {
      
      return (
        <NativeBaseProvider config={config}>
            <Center>
                <Pressable w="80" h="20" mb="4" ml="4" mr="4"
                // bg= {item.skipped==0 ? "white": "trueGray.300"}
                bg= {(item.skipped==0 && item.daysmore==0) ? "white": "trueGray.300"}
                // bg={onPress ? "coolGray.200" : onHover ? "coolGray.200" : "white"}
                rounded="2xl"
                shadow={3}
                flexDirection="row"
                // style={{flexWrap: "wrap", overflow: "hidden"}}
                // onPress={() => viewHabit(item)}
                onPress={() => {viewHabit(item)}}
                style={{
                  flexWrap: "wrap",
                  overflow: "hidden",
                }}
                // onPress={() => alert("hi")}
                >
                    <VStack h="20" w="55"
                    // bg="cyan.600"
                    bg={
                      item.progress === item.goal?
                      {linearGradient: {
                        colors: ["#19EDC4", "#08E17A"],
                        start: [0, 0],
                        end: [0, 1]
                      }}
                      : {linearGradient: {
                          colors: ["#0ABEE0", "#71B0F4"],
                          start: [0, 0],
                          end: [0, 1]
                        }}
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
                            {/* {item.skipped==0 && */}
                            {(item.skipped==0 && item.daysmore==0) &&
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
                            }
                            {/* {item.skipped==1 && */}
                            {((item.skipped==1||item.daysmore>0)&& (item.progress!=item.goal)) &&
                              <Text fontSize="sm"
                              fontWeight="bold"
                              // color="cyan.600"
                              style={
                                item.progress === item.goal ?
                                {color: "#08E17C"}
                                : {color: "#10BCE1"}
                              }>
                                {/* Do in {item.recurrence} day/s */}
                                Do in {item.daysmore} day/s
                              </Text>
                            }
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
                                  item.progress === item.goal || (item.skipped==1 || item.daysmore>0) ?
                                  {backgroundColor: "gray"}
                                  : {backgroundColor: "#08E17C"}
                                }
                                // disabled= {item.skipped==0 ? false:true}
                                disabled= {(item.skipped==1 || item.daysmore>0) ? true:false}
                                _pressed={{bgColor:'green.500'}}
                                // shadow={3}
                                rounded="full"
                                // onPress={() => updateHabit(item, "inc")}
                                onPress={() => (item.skipped==1 || item.daysmore>0) ? console.log("skipped: + disabled") : updateHabit(item, "inc")}
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
                                  item.progress === 0 || (item.skipped==1 || item.daysmore>0) ?
                                  {backgroundColor: "gray"}
                                  : {backgroundColor: "#FB6767"}
                                }
                                // disabled= {item.skipped==0 ? false:true}
                                disabled= {(item.skipped==1 || item.daysmore>0) ? true:false}
                                _pressed={{bgColor:'danger.500'}}
                                
                                rounded="full"
                                onPress={() => (item.skipped==1 || item.daysmore>0) ? console.log("skipped: - disabled") : updateHabit(item, "dec")}
                                // onPress={() => updateHabit(item, "dec")}
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
    
    const getStreaks = async () => {
      // console.log(results)

      let results = habits

      for (let i = 0; i < results.length; i++) {
        updateRecurrence(results[i]);
      }

      return results
    }

    useEffect(() => {
      (async function startHome () {
        createTables();
        checkIfReset();
        getName();
        setCounter(0);
        // getHabits();
      })();
    
      return () => {
        // this now gets called when the component unmounts
      };
    }, []);

    useEffect(async () => {
      if (habits.length == 0) {
        getHabits();
      }
    })

    useEffect(async () => {
      if (count < habits.length+1) {
        for (let i = 0; i < habits.length; i++) {
          console.log(">>>", i)
          console.log(count)
          let results = await getStreaks()
          setHabits(results);
        }
      }
    }, [count])

    // useEffect(async () => {
    //   console.log("START", habitsFetched)
    //   // setHabitsFetched(habitsFetched + 1)
    //   // if (habits.length == 0) {
    //   console.log("HABITS LENGTH = 0", habitsFetched)
    //   if (habits.length == 0) {
    //     getHabits();
    //   }
    // })

    // useEffect(async () => {
    //   console.log("Here", habitsFetched)
    //   if (habitsFetched < habits.length*2 ) {
    //     // setCounter(count+1);
    //     let results = await getRecurrence()
    //     setHabits(results);
    //     console.log("FETCH")
    //   }
    // }, [habitsFetched])

    // useEffect(async () => {
    //   if (count < habits.length+1) {
    //     setCounter(count+1);
    //     let results = await getStreaks()
    //     setHabits(results);
    //     console.log("hiii")
    //   }
    // }, [count])

    return (
      <NativeBaseProvider>
        <Center maxWidth="100%" flex={1} justifyContent="space-between" px="3">
        
        {/* ===================================== HEADER ===================================== */}
            <HStack width={375} maxWidth="100%" space={3} justifyContent="space-between" pt={StatusBar.currentHeight + 15}>
            <VStack pl={2} alignItems="flex-start" >
                <Text ml={2} fontSize="4xl" fontWeight="bold" color="black">
                    Hey there,
                </Text>
                <Input variant="unstyled" 
                placeholder="(Name)" 
                mt={-3} fontSize="4xl" 
                fontWeight="bold" 
                color="black" 
                value={userName} 
                onChangeText={setUserName}
                onSubmitEditing={addName}
                />
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
                  {(isSkip==1 || daysMore>0) &&
                  <Button
                  variant="subtle"
                  colorScheme="primary"
                  rounded="lg"
                  onPress={() => {setSkipOpen(true);}} isDisabled>
                    Skip today
                  </Button>
                  }
                  {!(isSkip==1 || daysMore>0) &&
                  <Button
                  variant="subtle"
                  colorScheme="primary"
                  rounded="lg"
                  onPress={() => {setSkipOpen(true);}}>
                    Skip today
                  </Button>
                  }
                  <Button
                  variant="outline"
                  rounded="lg"
                  onPress={() => setIsViewHabit(false)}>
                    Close habit
                  </Button>
                </HStack>
              </Center> 
            </Box>
            <Center>
              <AlertDialog leastDestructiveRef={cancelSkip} isOpen={SkipOpen} onClose={onCloseSkip}>
                <AlertDialog.Content>
                  <AlertDialog.Header bgColor={"danger.500"} alignItems={"center"}><Text fontWeight="bold" color="white">Skip a Habit</Text></AlertDialog.Header>
                  <AlertDialog.Body>
                    Are you sure you want to skip this habit?
                  </AlertDialog.Body>
                  <AlertDialog.Footer>
                    <Button.Group space={2}>
                      <Button colorScheme='danger' onPress={skipHabit}>
                        Skip
                      </Button>
                      <Button variant='subtle' bgColor ={"rgb(168,182,196)"} onPress={onCloseSkip} ref={cancelSkip} _text={{color: "white"}}>
                        Cancel
                      </Button>
                    </Button.Group>
                  </AlertDialog.Footer>
                </AlertDialog.Content>
              </AlertDialog>
            </Center>
          </Slide>
      
      </NativeBaseProvider>
    );
  };
  
  const Statistics = ({navigation}) => {
    const [date, setDate] = useState(null); //ADDED
    const [habits, setHabits] = useState([]);
    const [isViewHabitStatistics, setIsViewHabitStatistics] = React.useState(false); //FOR VIEW HABIT STATISTICS
    const [habitNameDisplay, setHabitNameDisplay] = useState("");
    const [recurrenceDisplay, setRecurrenceDisplay] = useState("");
    const [goalDisplay, setGoalDisplay] = useState("");
    const [formOfMeasurementDisplay, setFormOfMeasurementDisplay] = useState("");
    const [skipsDisplay, setSkipsDisplay] = useState("");
    const [itemID, setitemID] = useState(0);
    const [currentStreak, setCurrentStreak] = useState(null);
    const [bestStreak, setBestStreak] = useState(null);
    const [countHabitsCalendarRows, setHabitsCalendarRows] = useState(null);
    const [currentStreakDisplay, setCurrentStreakDisplay] = useState(null);
    const [bestStreakDisplay, setBestStreakDisplay] = useState(null);
    const [habitsFetched, setHabitsFetched] = useState(0);
    const [streakdates, setStreakDates] = useState({}); //for streak dates
    const [userNameDisplay,setuserNameDisplay]= useState("");
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

                results.push({ id: item.id, habitName: item.habitName, recurrence: item.recurrence, formOfMeasurement: item.formOfMeasurement, goal: item.goal, progress: item.progress, bestStreak: 0, currentStreak: 0})
              }

              setHabits(results);    
              setHabitsFetched(habitsFetched + 1);       
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

    const getBestStreak = (item) => {
      let id = item.id
      let recurrence = item.recurrence

      // const bestStreakSql = "SELECT MAX(streak) as best_streak FROM ( SELECT COUNT(date_difference) as streak, MIN(date) as start_date, MAX(date) as end_date FROM ( SELECT (SELECT COUNT(*) FROM habitsCalendar t2 WHERE t2.date <= t1.date and id=" + id + ") as row_number, date, DATE(DATE, '-' || (SELECT COUNT(*) FROM habitsCalendar t2 WHERE t2.date <= t1.date and id=" + id + ") || ' days') as date_difference from habitsCalendar t1 WHERE id=" + id + " order by date ) GROUP BY date_difference )";

      const bestStreakSql = "SELECT MAX(streaks) as best_streak FROM ( SELECT streak - skips as streaks FROM ( SELECT COUNT(date_difference) as streak, MIN(date) as start_date, MAX(date) as end_date, SUM(skipped) AS skips FROM ( SELECT (SELECT COUNT(*) FROM habitsCalendar t2 WHERE t2.date <= t1.date and id=" + id + ") as row_number, date, DATE(DATE, '-' || (SELECT COUNT(*)*" + recurrence + " FROM habitsCalendar t2 WHERE t2.date <= t1.date and id=" + id + ") || ' days') as date_difference, skipped from habitsCalendar t1 WHERE id=" + id + " order by date ) GROUP BY date_difference ) )"

      // console.log(bestStreakSql)

      db.transaction(function (tx) {
        tx.executeSql(
          bestStreakSql,
          [],
          (sqlTxn, res) => {
            
            console.log("BS", item.id, "rows:", res.rows.length)
            if (res.rows.item(0)["best_streak"] != null) {
              item.bestStreak = res.rows.item(0)["best_streak"];
            }
            setHabits(habits)
            setHabitsFetched(habitsFetched + 1);
          },
          error => {
            console.log("error on getting best streak " + error.message);
          },
        );
      });
    }

    const getCurrentStreak = (item) => {
      let id = item.id
      let recurrence = item.recurrence

      // const currentStreakSql = "SELECT streak current_streak, end_date latest_date FROM ( SELECT COUNT(date_difference) as streak, MIN(date) as start_date, MAX(date) as end_date FROM ( SELECT (SELECT COUNT(*) FROM habitsCalendar t2 WHERE t2.date <= t1.date and id=" + id + ") as row_number, date, DATE(DATE, '-' || (SELECT COUNT(*) FROM habitsCalendar t2 WHERE t2.date <= t1.date and id=" + id + ") || ' days') as date_difference from habitsCalendar t1 WHERE id=" + id + " order by date ) GROUP BY date_difference ORDER BY end_date DESC LIMIT 1 )";

      const currentStreakSql = "SELECT streak - skips as current_streak, end_date as latest_date FROM ( SELECT COUNT(date_difference) as streak, MIN(date) as start_date, MAX(date) as end_date, SUM(skipped) AS skips FROM ( SELECT (SELECT COUNT(*) FROM habitsCalendar t2 WHERE t2.date <= t1.date and id=" + id + ") as row_number, date, DATE(DATE, '-' || (SELECT COUNT(*)*" + recurrence + " FROM habitsCalendar t2 WHERE t2.date <= t1.date and id=" + id + ") || ' days') as date_difference, skipped from habitsCalendar t1 WHERE id=" + id + " order by date ) GROUP BY date_difference ORDER BY end_date DESC LIMIT 1 )"

      // console.log(currentStreakSql)

      let today = new Date();
      let year = today.getFullYear();
      let month = today.getMonth()+1;
      let day = today.getDate();
      
      if (month < 10) {
        month = '0' + month;
      }

      if (day < 10) {
        day = '0' + day;
      }

      let todayDate = year+'/'+month+'/'+day;

      let yesterday = new Date()
      yesterday.setDate(yesterday.getDate());

      year = yesterday.getFullYear()
      month = yesterday.getMonth()+1
      day = yesterday.getDate()

      if (month < 10) {
        month = '0' + month
      }

      if (day < 10) {
        day = '0' + day
      }

      let yesterdayDate = year+'-'+month+'-'+day;


      db.transaction(function (tx) {
        tx.executeSql(
          currentStreakSql,
          [],
          (sqlTxn, res) => {
            // console.log(item.id, res.rows)
            console.log("CS", item.id, "rows:", res.rows.length)
            if (res.rows.length > 0) {
              let latestDate = res.rows.item(0)["latest_date"];
            // console.log(">>>> ", res.rows.item(0)["current_streak"], latestDate)
              latestDate = latestDate.replace(/-/g,'/')  
              var date1 = new Date(todayDate)
              var date2 = new Date(latestDate)
              
              var Difference_In_Time = date1.getTime() - date2.getTime();
              var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

              console.log(">>>>>", Difference_In_Days)
              if (date != latestDate && Difference_In_Days > item.recurrence) {
                // console.log("++++++", date, latestDate)
                item.currentStreak = 0;
              } else {
                item.currentStreak = res.rows.item(0)["current_streak"];
              }
            }
            setHabits(habits)
            setHabitsFetched(habitsFetched + 1);
          },
          error => { 
            console.log("error on getting current streak " + error.message);
          },
        );
      });
    }

    const config = {
      dependencies: {
        "linear-gradient": LinearGradient
      }
    };

    function renderStatistics ({ item }) {

      return (
        <NativeBaseProvider config={config}>
            <Center>
                <Pressable w="80" h="20" mb="4" ml="4" mr="4"
                bg="white"
                rounded="2xl"
                shadow={3}
                flexDirection="row"
                onPress={() => viewHabitStatistics(item)} 
                style={{
                  flexWrap: "wrap",
                  overflow: "hidden",
                }}
                >
                    <VStack w="264" flexDirection="row" justifyContent={"space-between"}>
                      <VStack pt={3} pb={3} pr={5} pl={5}>
                          <HStack alignItems={"flex-start"}>
                            <Text fontSize="xl" fontWeight="bold" color="black">{item.habitName}</Text>
                          </HStack>
                          <HStack alignItems={"flex-start"}>
                              <Text fontSize="sm"
                              fontWeight="bold"
                              // color="cyan.600"
                              style={{color: "#D884FD"}}>
                                Best Streak: {item.bestStreak} time/s 
                              </Text>
                          </HStack>
                      </VStack>
                    </VStack>
                    <Divider my={2} orientation="vertical" bg="transparent"/>
                    <VStack h="20" w="55"
                    bg={
                      {
                        linearGradient: {
                          colors: ["#DB84FD", "#9C89EC"],
                          start: [0, 0],
                          end: [0, 1]
                        }
                      }
                    }
                    alignItems="center"
                    justifyContent="center"> 
                      <Text ml="-1" alignItems="center" justifyContent="center" fontSize="2xl" fontWeight="bold" color="white"> {item.currentStreak} </Text> 
                    </VStack>

                </Pressable>
            </Center>
        </NativeBaseProvider>
      );
    };

    const viewHabitStatistics = (item) => {
      setIsViewHabitStatistics(true);

      console.log("!!!!!!!! viewed " + item.habitName + " " + item.bestStreak + " " + item.currentStreak);
      setitemID(item.id);
      setHabitNameDisplay(item.habitName);
      setRecurrenceDisplay(item.recurrence);
      setGoalDisplay(item.goal);
      setCurrentStreakDisplay(item.currentStreak);
      setBestStreakDisplay(item.bestStreak);
      getStreakDates(item);
    }

    const getName = () => {
      db.transaction(txn => {
        txn.executeSql(
          `SELECT * FROM name ORDER BY id DESC LIMIT 1`,
          [],
          (sqlTxn, res) => {
            console.log("name retrieved successfully");
            let len = res.rows.length;

            if (len > 0) {
              let results;
              let item = res.rows.item(0);
              results=item.userName;
            
              setuserNameDisplay(results);
              console.log("name " + results);
            } else {
              setuserNameDisplay("");
              console.log("no name listed");
            }
          },
          error => {
            console.log("error on getting name " + error.message);
          },
        );
      });
    };

    function start_streak (yesterday, today) {
      let year_yesterday = parseInt(yesterday[0])
      let month_yesterday = parseInt(yesterday[1])
      let day_yesterday = parseInt(yesterday[2])
      let year_today = parseInt(today[0])
      let month_today = parseInt(today[1])
      let day_today = parseInt(today[2]);
      let start = 0;
      if (year_yesterday + 1 == year_today){ //case: check if today is january 1 and yesterday is not dec 31
        if (month_today == 1 && month_yesterday == 12){
          if (day_today == 1 && day_yesterday != 31){
            start = 1;
          }
        }
      }
      else {
        if (year_today == year_yesterday){ //case: same year same month but not consecutive days
          if (month_today == month_yesterday){
            if (day_today != day_yesterday + 1){
              start = 1;
            }
          }
          else if (month_yesterday + 1 == month_today){ //case: same year different month but not consecutive days
            const months_31_days = [1, 3, 5, 7, 8, 10, 12]
            const months_30_days = [4, 6, 9, 11]
            if (day_today == 1 ){
              if (months_31_days.includes(month_yesterday) && day_yesterday != 31){
                start = 1;
              }
              else if (months_30_days.includes(month_yesterday) && day_yesterday != 30){
                start = 1;
              }
              else if (month_yesterday == 2){ //case: month yesterday is february but not consecutive days
                if (year_today % 4 == 0 && day_yesterday != 29){
                  start = 1;
                }
                else if (year_today % 4 != 0 && day_yesterday != 28){
                  start = 1;
                }
              }
            } 
          }
        }
      }

      return start
    }

    function end_streak (today, tomorrow) {
      let year_tomorrow = parseInt(tomorrow[0]);
      let month_tomorrow = parseInt(tomorrow[1]);
      let day_tomorrow = parseInt(tomorrow[2]);
      let year_today = parseInt(today[0]);
      let month_today = parseInt(today[1]);
      let day_today = parseInt(today[2]);
      let end = 0;
      if (year_today + 1 == year_tomorrow){ //case: check if tomorrow is january 1 and tomorrow is not dec 31
        if (month_tomorrow == 1 && month_today == 12){
          if (day_tomorrow == 1 && day_today != 31){
            end = 1;
          }
        }
      }
      else {
        if (year_tomorrow == year_today){ //case: same year same month but not consecutive days
          if (month_tomorrow == month_today){
            if (day_tomorrow != day_today + 1){
              end = 1;
            }
          }
          else if (month_today + 1 == month_tomorrow){ //case: same year different month but not consecutive days
            const months_31_days = [1, 3, 5, 7, 8, 10, 12]
            const months_30_days = [4, 6, 9, 11]
            if (day_tomorrow == 1 ){
              if (months_31_days.includes(month_today) && day_today != 31){
                end = 1;
              }
              else if (months_30_days.includes(month_today) && day_today != 30){
                end = 1;
              }
              else if (month_today == 2){ //case: month today is february but not consecutive days
                if (year_tomorrow % 4 == 0 && day_today != 29){
                  end = 1;
                }
                else if (year_tomorrow % 4 != 0 && day_today != 28){
                  end = 1;
                }
              }
            } 
          }
        }
      }

      return end
    }

    const getStreakDates = (item) => {
      db.transaction(txn => {
        txn.executeSql(
          'SELECT * FROM habitsCalendar WHERE id =' + item.id,
          [],
          (sqlTxn, res) => {
            console.log("dates retrieved successfully");
            let len = res.rows.length;
            let streakDict = {};
            if (len > 0){
              if (item.recurrence == 1) {
                let start = 1;
                let end = 1;
                for (let i = 0; i < len; i++) {
                  const year_month_day_today = res.rows.item(i)["date"].split('-');
                  if (len == 1){
                    start = 1;
                    end = 1;
                  }

                  else if (i == len - 1){
                    const year_month_day_yesterday = res.rows.item(i-1)["date"].split('-');
                    start = start_streak(year_month_day_yesterday, year_month_day_today)
                    end = 1;
                  }
                  else if (i == 0){
                    const year_month_day_tomorrow = res.rows.item(i+1)["date"].split('-');
                    start = 1;
                    end = end_streak(year_month_day_today, year_month_day_tomorrow);
                  }
                  else {
                    const year_month_day_yesterday = res.rows.item(i-1)["date"].split('-');
                    const year_month_day_tomorrow = res.rows.item(i+1)["date"].split('-');
                    start = start_streak(year_month_day_yesterday, year_month_day_today)
                    end = end_streak(year_month_day_today, year_month_day_tomorrow);
                  }

                  console.log("# " + res.rows.item(i)["id"] + " " + res.rows.item(i)["date"] + " " + res.rows.item(i)["skipped"])
                  //determine if current date is start or end or neither
                  if (res.rows.item(i)["skipped"] == 0){ //blue mark if not skipped
                    if (start == 1 && end == 1){
                      streakDict[res.rows.item(i)["date"]] = {disabled: true, startingDay: true, textColor: "white", color: '#22d3ee', endingDay: true}
                    }
                    else if (start == 1 && end == 0){
                      streakDict[res.rows.item(i)["date"]] = {disabled: true, startingDay: true, textColor: "white", color: '#22d3ee', endingDay: false}
                    }
                    else if (start == 0 && end == 1){
                      streakDict[res.rows.item(i)["date"]] = {disabled: true, startingDay: false, textColor: "white", color: '#22d3ee', endingDay: true}
                    }
                    else {
                      streakDict[res.rows.item(i)["date"]] = {disabled: true, startingDay: false, textColor: "white", color: '#22d3ee', endingDay: false}
                    }
                  }
                  else { //gray mark if skipped #9ca3af
                    if (start == 1 && end == 1){
                      streakDict[res.rows.item(i)["date"]] = {disabled: true, startingDay: true, textColor: "white", color: '#9ca3af', endingDay: true}
                    }
                    else if (start == 1 && end == 0){
                      streakDict[res.rows.item(i)["date"]] = {disabled: true, startingDay: true, textColor: "white", color: '#9ca3af', endingDay: false}
                    }
                    else if (start == 0 && end == 1){
                      streakDict[res.rows.item(i)["date"]] = {disabled: true, startingDay: false, textColor: "white", color: '#9ca3af', endingDay: true}
                    }
                    else {
                      streakDict[res.rows.item(i)["date"]] = {disabled: true, startingDay: false, textColor: "white", color: '#9ca3af', endingDay: false}
                    }
                  }
                }
              }
              else { //recurrence > 1
                for (let i = 0; i < len; i++) {
                  console.log("# " + res.rows.item(i)["id"] + " " + res.rows.item(i)["date"] + " " + res.rows.item(i)["skipped"])
                  if (res.rows.item(i)["skipped"] == 0){
                    streakDict[res.rows.item(i)["date"]] = {disabled: true, startingDay: true, textColor: "white", color: '#22d3ee', endingDay: true}
                  }
                  else {
                    streakDict[res.rows.item(i)["date"]] = {disabled: true, startingDay: true, textColor: "white", color: '#9ca3af', endingDay: true}
                  }
                }
              }
            console.log(streakDict)
            setStreakDates(streakDict)
            }
            else {
              console.log("no streaks listed")
            }
          },
          error => {
            console.log("error on getting name " + error.message);
          },
        );
      });
    };

    // const getStreaks = async () => {
    //   // console.log(results)

    //   let results = habits

    //   for (let i = 0; i < results.length; i++) {
    //     getBestStreak(results[i]);
    //     getCurrentStreak(results[i]);  
    //   }
      
    //   return results
    // }

    const getStreaks = async () => {
      // console.log(results)

      let rows;
      let results = habits
      db.transaction(txn => {
        txn.executeSql(
          `SELECT COUNT(*) FROM habitsCalendar`,
          [],
          (sqlTxn, res) => {
            rows = res.rows.item(0)["COUNT(*)"]

            if (rows > 0) {
              console.log("rows > 0")
              for (let i = 0; i < results.length; i++) {
                getBestStreak(results[i]);
                getCurrentStreak(results[i]);  
              }
            } else {
              console.log("rows = 0")
            }
          },
          error => {
            console.log("error on getting name " + error.message);
          },
        );
      });

      return results;
  }
    

    useEffect(() => {
      (async function startStatistics () {
        getName();
      })();
    
      return () => {
      };
    }, []);

    useEffect(async () => {
      if (habits.length == 0) {
        getHabits()
      }
    })
    
    useEffect(async () => {
      if (habitsFetched <= habits.length+1) {
        let results = await getStreaks()
        setHabits(results)
      }
    }, [habitsFetched])

    return (
      <NativeBaseProvider config={config}>
        <Center maxWidth="100%" flex={1} justifyContent="space-between" px="3">
        {/* ===================================== HEADER ===================================== */}
          <HStack width={375} maxWidth="100%" space={3} justifyContent="space-between" pt={StatusBar.currentHeight + 15}>
              <VStack pl={2} alignItems="flex-start" >
                  <Text ml={2} fontSize="4xl" fontWeight="bold" color="black">
                      Good job,
                  </Text>
                  <Input variant="unstyled" placeholder="(Name)" value={userNameDisplay} mt={-3} fontSize="4xl" fontWeight="bold" color="black"/>
                  <Text ml={2} fontSize="lg" color="gray.400">{date}</Text>
              </VStack>
          </HStack>
          <ScrollView maxW="375" h="485">
                <Center>
                <VStack mt={5} alignItems="center">
                  <FlatList
                  data={habits}
                  renderItem={renderStatistics}
                  key={cat => cat.id}
                  />
                </VStack>
                </Center>
          </ScrollView>

          <Bottom />
        </Center>

        <Slide in={isViewHabitStatistics} placement="top">
              <Box p={0} bg="#FFFFFF"
              width={width} height = {height} maxHeight = "100%"
              position="absolute" top="0" rounded = "70" 
              >
                <VStack pl={2} alignItems="flex-start" >
                  <HStack width={375} maxWidth="100%" space={3} justifyContent="space-between" pt={StatusBar.currentHeight + 15}>
                    <Box></Box>
                    <Box alignItems="center">
                      <Button variant="ghost" onPress={() => setIsViewHabitStatistics(false)} >
                        <Text fontSize="lg" fontWeight="normal" color="cyan.600">
                          Go Back
                        </Text>
                      </Button>
                    </Box>
                  </HStack>
          
                  <Text mt={5} fontSize="4xl" fontWeight="bold" color="black" alignSelf={"center"}>
                    {habitNameDisplay}
                  </Text>
                  <Text  fontSize="sm" fontWeight="semibold" color="trueGray.400" alignSelf={"center"}>
                    {goalDisplay} time/s every {recurrenceDisplay} day/s
                  </Text>
                  <Box mt={5} width = "350" height="75" borderColor="#F4F4F4" borderWidth={3} rounded = "35"  alignSelf={"center"}>
                    <Flex mx="5" direction="row" justify="space-evenly" h="60">
                      <VStack space="0.01">
                        <Text mt="1" fontSize="xl" fontWeight="bold" color="cyan.600">
                          {currentStreakDisplay} day/s
                        </Text>
                        <Text fontSize="sm" fontWeight="semibold" color="trueGray.400">
                          Current Streak 
                        </Text>
                      </VStack>
                      <Divider mt={2} orientation="vertical" h="25" bg="#F4F4F4" thickness={3} alignSelf={"center"} mx="1" />
                      <VStack space="0.01">
                        <Text mt="1" fontSize="xl" fontWeight="bold" color="cyan.600">
                          {bestStreakDisplay} day/s
                        </Text>
                        <Text fontSize="sm" fontWeight="semibold" color="trueGray.400">
                          Best Streak 
                        </Text>
                      </VStack>
                    </Flex>
                  </Box>
                  {/* <Box width="350" height="250" bg={{
                    linearGradient: {
                      colors: ["#11BCE1", "#66B1F2"],
                      start: [0, 0],
                      end: [0, 1]
                    }
                  }} p={3} rounded="35" mt={5} alignSelf={"center"} shadow={9}>
                  <Text fontSize="sm" fontWeight="semibold" color="white" alignSelf={"center"}>
                    April 2022
                  </Text>
                  </Box> */}
                  <Box width="350" height="250" alignSelf="center" >
                    <Calendar
                      markingType={'period'}
                      markedDates={streakdates}
                    />
                  </Box>
                </VStack>
              </Box>
            </Slide>
      </NativeBaseProvider>
    );
  };

  export default App;