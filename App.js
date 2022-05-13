import React, { useEffect, useState } from "react";
// import { View, Text, StatusBar, TextInput, Button, FlatList } from "react-native";
import { View, StatusBar, TextInput, FlatList, Alert } from "react-native";
import * as SQLite from "expo-sqlite";
import { NativeBaseProvider, HStack, VStack, Center, Box, Button, Text, Modal, FormControl, Input, Radio, UseTheme, Spacer, Divider, ScrollView} from 'native-base';

const db = SQLite.openDatabase("e:\\database\\habitTracker.db");

function Bottom () {
    return <NativeBaseProvider>
        <HStack width={375} maxWidth="100%" mt={3} space={3} justifyContent="space-evenly">
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
<<<<<<< Updated upstream
=======
  

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
  const [isSkip,setIsSkip]= useState(false);
  const [doesExist, setDoesExist] = useState(null);
  const [currentStreak, setCurrentStreak] = useState(null);
  const [bestStreak, setBestStreak] = useState(null);
  const [countHabitsCalendarRows, setHabitsCalendarRows] = useState(null);
  const [caption, setCaption] = useState("")
  const [unable, setUnable] = useState(0)

  const [userName, setUserName] = useState("");

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
            skipped INTEGER,
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
            
            if(lastDateStored)

            if (lastDateStored != null && lastDateStored != currentDate) {
              console.log("HMM RESET TO 0!")

              const resetSql =
              "UPDATE habits SET progress=0";
          
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

      //reset <skipped> according to recurrence
        let skippedSql =
        "UPDATE habits SET skipped=0 WHERE id IN (";

        tx.executeSql(
          "SELECT id, date, recurrence FROM habits",
          [],
          (sqlTxn, res) => {
            var len = res.rows.length;

            for(var i=0; i < len; i++){
              var habitId = res.rows.item(i)["id"];
              var habitDate = res.rows.item(i)["date"];
              var habitRec = res.rows.item(i)["recurrence"];
              console.log((today.getTime() - Date.parse(habitDate))/(1000*3600*24), habitRec)
              if((today.getTime() - Date.parse(habitDate))/(1000*3600*24) > habitRec){
                skippedSql = skippedSql + habitId + ",";
              }
            }
            if(skippedSql.slice(-1) == ","){
              skippedSql = skippedSql.slice(0, -1) + ")";
            }
            else{
              skippedSql = skippedSql + ")";
            }
            console.log(skippedSql);
        
            db.transaction(txn => {
              txn.executeSql(
                skippedSql,
                [],
                (sqlTxn, res) => {
                  console.log(`skipped reset successfully`);
                  getHabits();
                },
                error => {
                  console.log("error on resetting skipped " + error.message);
                },
              );
            });
        });
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

      if (!goal) {
        incomplete.push("goal")
      }

      if (!habitName || !recurrence || !goal) {
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
      0 +
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
      
    };
  
    const editHabit = () => {
      const incomplete = []


      if (!habitName) {
        incomplete.push("name of habit")
      }

      if (!recurrence) {
        incomplete.push("recurrence")
      }

      if (!goal) {
        incomplete.push("goal")
      }

      if (!habitName || !recurrence || !goal) {
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
        0 +
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
      console.log("HELLO")
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

      currentDate = new Date(year+'-'+month+'-'+day)

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


                // results.push({ id: item.id, habitName: item.habitName, recurrence: item.recurrence, formOfMeasurement: item.formOfMeasurement, goal: item.goal, progress: item.progress, skips: item.skips, skipped: item.skipped, date: item.date});

                results.push({ id: item.id, habitName: item.habitName, recurrence: item.recurrence, formOfMeasurement: item.formOfMeasurement, goal: item.goal, progress: item.progress, skips: item.skips, skipped: item.skipped, date: item.date, unable: null, daysLeft: null});
              }

              setHabits(results);
              // console.log("habit results" + results);
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
      

      let results = habits
      for (let i = 0; i < results.length; i++) {
        
        let item = results[i]

        console.log("====== " + item.habitName + " =======")

        // check last date stored, which will be compared with current date
        // console.log(item.habitName + " >>> rec: " + item.recurrence)
        db.transaction(function (tx) {
        tx.executeSql(
          "SELECT MAX(date) as \"lastDateStored\" FROM habitsCalendar WHERE id=" + item.id,
          [],
          (sqlTxn, res) => {
            let lastDateStored;
            lastDateStored = new Date(res.rows.item(0)["lastDateStored"])

            let differenceInDays = Math.abs(currentDate - lastDateStored)
            differenceInDays = differenceInDays / (1000 * 60 * 60 * 24)

            let actualDifference = item.recurrence - differenceInDays

            console.log("### " + item.habitName + " >>> days left: " + actualDifference)
            
            if (actualDifference > 0 && actualDifference < item.recurrence) {
              item.daysLeft = actualDifference
              item.unable = 1
            } else {
              item.daysLeft = 0
              item.unable = 0
            }

            console.log("HABIT + " + item.habitName + " " + item.unable)
            setHabits(results)
            
          },
          error => {
            console.log("error on getting lastDateStored " + error.message);
          },
        );
        });

        console.log("HABIT > " + item.habitName + " " + item.unable)
        console.log("====== " + item.habitName + " =======")
      }

      setHabits(results)
      console.log("!!!!!!!!!")
      console.log(habits)
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
      0 +
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

      // console.log(updateHabitsTable)

      // console.log("!!! updating: " + item.id)

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

      // console.log('--- doesExist: ' + doesExist)

      let currentDoesExist = false;

      if (item.progress < item.goal) {
        // console.log(">>>>>>> progress < goal from habitsCalendar")
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
          "INSERT INTO habitsCalendar (id,date) VALUES (" +
          item.id +
          ",'" +
          date +
          "')";

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

            tx.executeSql(
              "UPDATE habits SET date='" + date + "' WHERE id=" + item.id,
              [],
              (sqlTxn, res) => {
                console.log("finished updating date in habits: " + item.id + " " + date);
              },
              error => {
                console.log("error on updating date in habitsCalendar: " + error.message);
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
            for (let i = 0; i < len; i++) {
                 let rowID = res.rows.item(i)["id"];
                 let rowDate = res.rows.item(i)["date"];
                 console.log("+++ " + rowID + " " + rowDate)
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
      if (isSkip==1){
        Alert.alert("Already skipped today!");
        setSkipOpen(false);
      }
      else if (skipsDisplay!=0){
        val--;
      }
      else{
        Alert.alert("Skips are consumed!");
        setSkipOpen(false);
        return
      }

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

      let date = year+'-'+month+'-'+day;

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
      ",date='" +
      date +
      "' WHERE id=" +
      itemID;

      console.log(skipSql)
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
      setSkipOpen(false);
      setSkipsDisplay(val);
      setIsSkip(1);
      getHabits();
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
      setUnable(item.unable)
      if (item.formOfMeasurement == 1) {
        setFormOfMeasurementDisplay("Increment");
      } else {
        setFormOfMeasurementDisplay("Timer");
      }

    }

    const getStreak = (id) => {
  

      const bestStreakSql = "SELECT MAX(streak) as best_streak FROM ( SELECT COUNT(date_difference) as streak, MIN(date) as start_date, MAX(date) as end_date FROM ( SELECT (SELECT COUNT(*) FROM habitsCalendar t2 WHERE t2.date <= t1.date and id=" + id + ") as row_number, date, DATE(DATE, '-' || (SELECT COUNT(*) FROM habitsCalendar t2 WHERE t2.date <= t1.date and id=" + id + ") || ' days') as date_difference from habitsCalendar t1 WHERE id=" + id + " order by date ) GROUP BY date_difference )";

      // console.log(bestStreakSql);

      const currentStreakSql = "SELECT streak current_streak, end_date latest_date FROM ( SELECT COUNT(date_difference) as streak, MIN(date) as start_date, MAX(date) as end_date FROM ( SELECT (SELECT COUNT(*) FROM habitsCalendar t2 WHERE t2.date <= t1.date and id=" + id + ") as row_number, date, DATE(DATE, '-' || (SELECT COUNT(*) FROM habitsCalendar t2 WHERE t2.date <= t1.date and id=" + id + ") || ' days') as date_difference from habitsCalendar t1 WHERE id=" + id + " order by date ) GROUP BY date_difference ORDER BY end_date DESC LIMIT 1 )";

      // console.log(bestStreakSql);

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

      let date = year+'-'+month+'-'+day;
>>>>>>> Stashed changes

const App = () => {
    const [showModal, setShowModal] = useState(false);
    const [habitName, setHabitName] = useState("");
    const [recurrence, setRecurrence] = useState("");
    const [formOfMeasurement, setFormOfMeasurement] = useState("");
    const [goal, setGoal] = useState("");
    const [habits, setHabits] = useState([]);
  
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
      if (!habitName) {
        alert("Enter habit");
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
<<<<<<< Updated upstream
                <Box w="80" h="20" mb="4" ml="4" mr="4" bg="white" rounded="2xl" shadow={3} style={{flexWrap: "wrap", overflow: "hidden"}}>
                    <HStack>
                        <Box h="20" w="55"
                        backgroundColor={"cyan.600"} alignItems="center">
                            
                        </Box>
                        <VStack pt={3} pb={3} pr={5} pl={5}>
                            {/* <Text style={{ marginRight: 9 }}>{item.id}</Text>    */}
                            <Text fontSize="xl" fontWeight="bold" color="muted.900">{item.habitName}</Text>
                            <HStack alignItems={"flex-start"}>
                                <Text fontSize="sm" fontWeight="bold" color="cyan.600">{item.goal} time/s</Text>
                                <Text italic fontSize="sm" fontWeight="medium" color="coolGray.600"> every {item.recurrence} day/s</Text>
=======
                <Pressable w="80" h="20" mb="4" ml="4" mr="4"
                bg= {(item.skipped==0 && item.unable==0)? "white": "trueGray.300"}
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
                        }}}
                    style={
                      (item.skipped==1 || item.unable==1) ?
                      {backgroundColor: "gray"}
                      : item.progress === item.goal?
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
                            {(item.skipped==0 && item.unable==0) &&
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
                            {(item.skipped==1 || item.unable==1) &&
                              <Text fontSize="sm"
                              fontWeight="bold"
                              // color="cyan.600"
                              style={
                                (item.skipped==1 || item.unable==1) ?
                                {color: "gray"}
                                : item.progress === item.goal?
                                {color: "#08E17C"}
                                : {color: "#10BCE1"}
                              }>
                                Not today
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
                                  (item.progress === item.goal) || (item.skipped === 1)?
                                  {backgroundColor: "gray"}
                                  : {backgroundColor: "#08E17C"}
                                }
                                disabled= {(item.skipped==1 || item.unable==1)? true:false}
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
                                  (item.progress === 0) || (item.skipped === 1) ?
                                  {backgroundColor: "gray"}
                                  : {backgroundColor: "#FB6767"}
                                }
                                disabled= {(item.skipped==1 || item.unable==1)? true:false}
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
>>>>>>> Stashed changes
                            </HStack>
                            {/* <Text>{item.formOfMeasurement}</Text>        */}
                        </VStack>
                    </HStack>
                </Box>
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
                            value={habitName}
                            onChangeText={setHabitName}
                             />
                        </FormControl>

                        <FormControl isRequired>
                            <FormControl.Label>Recurrence</FormControl.Label>
                            <Input
                            width="100%"
                            placeholder=""
                            value={recurrence}
                            onChangeText={setRecurrence}
                             />
                        </FormControl>

<<<<<<< Updated upstream
                        {/* <FormControl isRequired>
                            <FormControl.Label>Form of measurement</FormControl.Label>
                            <Input
                            width="100%"
                            placeholder=""
                            value={formOfMeasurement}
                            onChangeText={setFormOfMeasurement}
                             />
                        </FormControl> */}

                        <Text mt="3">Form of measurement</Text>
                        <Radio.Group name="formOfMeasurementGroup" accessibilityLabel="Form of measurement">
                            <HStack>
                            <Radio
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
                                value="2"
                                status= { formOfMeasurement === '2' ? 'checked' : 'unchecked' }
                                onPress={() => setFormOfMeasurement(2)}
                                name="formOfMeasurement"
                                mt={1}
                                // onPress={setFormOfMeasurement}
                            >
                                Timer
                            </Radio>
                            </HStack>
                        </Radio.Group>

=======
>>>>>>> Stashed changes
                        <FormControl isRequired>
                            <FormControl.Label>Goal</FormControl.Label>
                            <Input
                            width="100%"
                            placeholder=""
                            value={goal}
                            onChangeText={setGoal}
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