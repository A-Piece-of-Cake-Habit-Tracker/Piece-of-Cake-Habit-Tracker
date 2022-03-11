import * as React from 'react';
import {Alert, StatusBar} from 'react-native';
import { NativeBaseProvider, Box, HStack, VStack, Text, Pressable, Button, Image, Center, Left, Spacer, usePropsResolution, ScrollView,  useTheme, Heading, Modal, FormControl, Input, Radio} from 'native-base';
import { useState, useRef, useEffect, useReducer } from "react";
import { Formik, Form, useFormik } from "formik";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("e:\\database\\habitTracker.db");

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

function AddHabitFormik() {
  // const [settings, setSettings] = useState(false);

  // const useForceRender = () => {
  //   const [, forceRender] = useReducer((x) => !x, true);
  //   return forceRender;
  // };

  // const forceRender = useForceRender();

  // const onSubmit = values => {
  //   console.log('submiting with ', values);

  //   const insertSql =
  //     "INSERT INTO habit(habitName,recurrence,formOfMeasurement,goal) VALUES ('" +
  //     values.habitName +
  //     "'," +
  //     values.recurrence +
  //     "," +
  //     values.formOfMeasurement +
  //     "," +
  //     values.goal +
  //     ")";

  //   const updateSql =
  //     "UPDATE habit SET habitName = '" +
  //     values.habitName +
  //     "', recurrence=" +
  //     values.recurrence +
  //     ",formOfMeasurement=" +
  //     values.formOfMeasurement +
  //     ",goal=" +
  //     values.goal +
  //     " WHERE id=" +
  //     values.id;

  //   db.transaction(function (tx) {
  //     tx.executeSql(
  //       //"DROP TABLE HABIT"
  //       "CREATE TABLE IF NOT EXISTS habit (id INTEGER PRIMARY KEY AUTOINCREMENT, habitName TEXT, recurrence INTEGER, formOfMeasurement INTEGER, goal INTEGER)"
  //     )
  //   });

  //   console.log("1");

  //   db.transaction(function (tx) {
  //       tx.executeSql(
  //         insertSql,
  //         [],
  //         function (tx, results) {
  //           // console.log("im here");
  //           // var id = results.insertId;
  //           // values.setFieldValue("habits", [
  //           //   ...values.habits,
  //           //   createHabit(
  //           //     id,
  //           //     values.habitName,
  //           //     values.recurrence,
  //           //     values.formOfMeasurement,
  //           //     values.goal
  //           //   ),
  //           // ]);
  //           console.log("success");
  //         },
  //         function (e) {
  //           console.log("error");
  //         }
  //       );
  //   });

  //   console.log("2");

  //   // setSubmitSuccessful(true);
  //   // values.setFieldValue("habitName", "");
  //   // values.setFieldValue("recurrence", "1");
  //   // values.setFieldValue("formOfMeasurement", "1");
  //   // values.setFieldValue("goal", "1");
  //   setShowModal(false);
  // };

  return <Formik initialValues={{
    id: 0,
    habitName: "",
    recurrence: "1",
    formOfMeasurement: "1",
    goal: "1",
    habits: []
  }} onSubmit={Header.onSubmit} validate={validate}>
      {({
      handleChange,
      setFieldValue,
      handleBlur,
      handleSubmit,
      values,
      errors
    }) => <VStack width="100%" space={3}>
          <FormControl isRequired isInvalid={'habitName' in errors}>
            <FormControl.Label>Name of habit</FormControl.Label>
            {console.log('errors', errors)}
            <Input
              onBlur={handleBlur('habitName')}
              placeholder="Drink water"
              onChangeText={handleChange('habitName')}
              value={values.habitName}
              width="100%" />
            <FormControl.ErrorMessage>
              {errors.habitName}
            </FormControl.ErrorMessage>
          </FormControl>

          <FormControl isRequired isInvalid={'recurrence' in errors}>
            <FormControl.Label>Recurrence</FormControl.Label>
            {console.log('errors', errors)}
            <Input
              onBlur={handleBlur('recurrence')}
              placeholder="1"
              onChangeText={handleChange('recurrence')}
              value={values.recurrence} />
            <FormControl.ErrorMessage>
              {errors.recurrence}
            </FormControl.ErrorMessage>
          </FormControl>

          <Text mt="3">Form of measurement</Text>
          <Radio.Group defaultValue="1" name="formOfMeasurementGroup" accessibilityLabel="Form of measurement">
            <HStack>
              <Radio
                value="1"
                mt={1}
                mr={5}
                onChange={handleChange}
                name="formOfMeasurement"
                onPress={() =>
                  setFieldValue("formOfMeasurement", "1")
                }
              >
                Increment
              </Radio>
              <Radio
                value="2"
                mt={1}
                onChange={handleChange}
                name="formOfMeasurement"
                onPress={() =>
                  setFieldValue("formOfMeasurement", "2")
                }
              >
                Timer
              </Radio>
            </HStack>
          </Radio.Group>

          

          <FormControl isRequired isInvalid={'goal' in errors}>
            <FormControl.Label>Goal</FormControl.Label>
            {console.log('errors', errors)}
            <Input
              onBlur={handleBlur('goal')}
              placeholder="1"
              onChangeText={handleChange('goal')}
              value={values.goal} />
            <FormControl.ErrorMessage>
              {errors.goal}
            </FormControl.ErrorMessage>
          </FormControl>

          {/* <FormControl isInvalid={'lastName' in errors}>
            <FormControl.Label>Last Name</FormControl.Label>
            <Input onBlur={handleBlur('lastName')} placeholder="Doe" onChangeText={handleChange('lastName')} value={values.lastName} />
            <FormControl.ErrorMessage>
              {errors.lastName}
            </FormControl.ErrorMessage>
          </FormControl> */}

          <Button onPress={handleSubmit} colorScheme="pink">
            Submit
          </Button>
        </VStack>}
    </Formik>;
}

const Header = () => {
  
  const [settings, setSettings] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const useForceRender = () => {
    const [, forceRender] = useReducer((x) => !x, true);
    return forceRender;
  };

  const forceRender = useForceRender();

  const onSubmit = values => {
    console.log('submiting with ', values);

    const insertSql =
      "INSERT INTO habit(habitName,recurrence,formOfMeasurement,goal) VALUES ('" +
      values.habitName +
      "'," +
      values.recurrence +
      "," +
      values.formOfMeasurement +
      "," +
      values.goal +
      ")";

    const updateSql =
      "UPDATE habit SET habitName = '" +
      values.habitName +
      "', recurrence=" +
      values.recurrence +
      ",formOfMeasurement=" +
      values.formOfMeasurement +
      ",goal=" +
      values.goal +
      " WHERE id=" +
      values.id;

    db.transaction(function (tx) {
      tx.executeSql(
        //"DROP TABLE HABIT"
        "CREATE TABLE IF NOT EXISTS habit (id INTEGER PRIMARY KEY AUTOINCREMENT, habitName TEXT, recurrence INTEGER, formOfMeasurement INTEGER, goal INTEGER)"
      )
    });

    console.log("1");

    db.transaction(function (tx) {
        tx.executeSql(
          insertSql,
          [],
          function (tx, results) {
            // console.log("im here");
            // var id = results.insertId;
            // values.setFieldValue("habits", [
            //   ...values.habits,
            //   createHabit(
            //     id,
            //     values.habitName,
            //     values.recurrence,
            //     values.formOfMeasurement,
            //     values.goal
            //   ),
            // ]);
            console.log("success");
          },
          function (e) {
            console.log("error");
          }
        );
    });

    console.log("2");

    // setSubmitSuccessful(true);
    // values.setFieldValue("habitName", "");
    // values.setFieldValue("recurrence", "1");
    // values.setFieldValue("formOfMeasurement", "1");
    // values.setFieldValue("goal", "1");
    setShowModal(false);
  };


  return <NativeBaseProvider>
      <HStack width={375} maxWidth="100%" space={3} justifyContent="space-between" pt={StatusBar.currentHeight + 15}>
          <VStack pl={5} alignItems="flex-start" >
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
                  {/* <FormControl
                    isRequired
                    isInvalid={"habitName" in formikProps.errors}
                  >
                    <FormControl.Label htmlFor="habitName">Name of habit</FormControl.Label>
                    {console.log("errors", formikProps.errors)}
                    <Input 
                      onBlur={formikProps.handleBlur("habitName")}
                      placeholder="Drink water"
                      onChangeText={formikProps.handleChange("habitName")}
                      value={formikProps.values.habitName}
                    />
                    <FormControl.ErrorMessage>
                      {formikProps.errors.habitName}
                    </FormControl.ErrorMessage>
                  </FormControl>
                  <FormControl mt="3">
                    <FormControl.Label>Recurrence</FormControl.Label>
                    <Input />
                  </FormControl>
                  <Text mt="3">Form of measurement</Text>
                  <Radio.Group defaultValue="1" name="FormOfMeasurement" accessibilityLabel="Form of measurement">
                    <HStack>
                      <Radio value="1" mt={1} mr={5}>
                        Increment
                      </Radio>
                      <Radio value="2" mt={1}>
                        Timer
                      </Radio>
                    </HStack>
                  </Radio.Group>
                  <FormControl mt="3">
                    <FormControl.Label>Goal</FormControl.Label>
                    <Input />
                  </FormControl> */}
                  <Center>
                    <AddHabitFormik />
                  </Center>
                </Modal.Body>
                {/* <Modal.Footer>
                  <Button.Group space={2}>
                    <Button variant="ghost" colorScheme="blueGray" onPress={() => {
                    setShowModal(false);
                  }}>
                      Cancel
                    </Button>
                    <Button onPress={formikProps.handleSubmit}>
                      Done
                    </Button>
                  </Button.Group>
                </Modal.Footer> */}
              </Modal.Content>
            </Modal>
          </Center>
      </HStack>
    </NativeBaseProvider>;
}


function HabitsList () {
  return <NativeBaseProvider>
    <VStack mt="50" width={375} maxWidth="100%" space={4} alignItems="center">
      {/* <ScrollView height="400" maxWidth="100%"> */}
        <Box w="80" h="20" mb="4" ml="4" mr="4" bg="white" rounded="2xl" shadow={3}> Drink water </Box>
        <Box w="80" h="20" mb="4" ml="4" mr="4" bg="white" rounded="2xl" shadow={3} />
        <Box w="80" h="20" mb="4" ml="4" mr="4" bg="white" rounded="2xl" shadow={3} />
        <Box w="80" h="20" mb="4" ml="4" mr="4" bg="white" rounded="2xl" shadow={3} />
        {/* <Box w="80" h="20" mb="4" ml="4" mr="4" bg="white" rounded="2xl" shadow={3} />
        <Box w="80" h="20" mb="4" ml="4" mr="4" bg="white" rounded="2xl" shadow={3} />
        <Box w="80" h="20" mb="4" ml="4" mr="4" bg="white" rounded="2xl" shadow={3} />
        <Box w="80" h="20" mb="4" ml="4" mr="4" bg="white" rounded="2xl" shadow={3} />
        <Box w="80" h="20" mb="4" ml="4" mr="4" bg="white" rounded="2xl" shadow={3} />
        <Box w="80" h="20" mb="4" ml="4" mr="4" bg="white" rounded="2xl" shadow={3} />
        <Box w="80" h="20" mb="4" ml="4" mr="4" bg="white" rounded="2xl" shadow={3} />
        <Box w="80" h="20" mb="4" ml="4" mr="4" bg="white" rounded="2xl" shadow={3} />
        <Box w="80" h="20" mb="4" ml="4" mr="4" bg="white" rounded="2xl" shadow={3} /> */}
      {/* </ScrollView> */}
    </VStack>
  </NativeBaseProvider>
}

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

export default () => {
    return (
      <NativeBaseProvider>
        <Center maxWidth="100%" flex={1} justifyContent="space-between" px="3">
            <Header />
            {/* <Example /> */}
            {/* <Spacer /> */}
            <HabitsList />
            <Spacer />
            <Spacer />
            <Spacer />
            <Spacer />
            <Bottom />
        </Center>
      </NativeBaseProvider>
    );
};
    