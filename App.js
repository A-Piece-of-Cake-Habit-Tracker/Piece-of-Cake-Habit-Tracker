import * as React from 'react';
import {Alert, StatusBar} from 'react-native';
import { NativeBaseProvider, Box, HStack, VStack, Text, Pressable, Button, Image, Center, Left, Spacer, usePropsResolution } from 'native-base';

function Header() {
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
          <Box ml={-20} h="10" w="10" alignItems="center">
            <Button
              h="10" w="10"
              alignItems="center"
              variant="solid"
              rounded="3xl"
              onPress={() => Alert.alert("This is the Add Habit tab")}>
              <Text fontSize="2xl" lineHeight="25.5" fontWeight="bold" color="white">
                +
              </Text>
            </Button>
          </Box>

          {/* <Box ml={-10} h="10">
            <Button 
              variant="ghost"
              onPress={() => Alert.alert("hello world")}>
              <Image h="10" w="10" source={require('./assets/plus.png')} alt="Add habit" />
            </Button>
          </Box> */}
      </HStack>
    </NativeBaseProvider>;
}

function HabitsList () {
  return <NativeBaseProvider>
    <VStack mt="50" width={375} maxWidth="100%" space={4} alignItems="center">
      <Center w="80" h="20" bg="white" rounded="2xl" shadow={3} />
      <Center w="80" h="20" bg="white" rounded="2xl" shadow={3} />
      <Center w="80" h="20" bg="white" rounded="2xl" shadow={3} />
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
    