import * as React from 'react';
import {Alert, StatusBar} from 'react-native';
import { NativeBaseProvider, View, Box, HStack, VStack, Text, Pressable, Button, Image, Center, Left, Spacer, usePropsResolution } from 'native-base';

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.toggleCancel = this.toggleCancel.bind(this);
    this.state = {toggled: false};
  }

  toggleEdit() {
    this.setState({toggled: true});
  }

  toggleCancel() {
    this.setState({toggled: false});
  }

  render() {
    const toggled = this.state.toggled;
    let button;
    let EditBut;
    if (toggled) {
      button = <Button onPress={() => this.toggleCancel()}>Cancel</Button>;
      EditBut = <View><Button onPress={() => Alert.alert("Editing form goes here")}>Edit</Button><Button onPress={() => Alert.alert("Delete form goes here")}>Delete</Button></View>;
    } else {
      button = <Button onPress={() => this.toggleEdit()}>Edit</Button>;
      EditBut = <Button onPress={() => Alert.alert("View form goes here")}>View</Button>;
    }

    return (
      <NativeBaseProvider>
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
            {button}
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
      </HStack>
      <VStack mt="50" space={4} alignItems="center">
        <Center w="80" h="20" bg="white" rounded="2xl" shadow={3}>
          {EditBut}
        </Center>
        <Center w="80" h="20" bg="white" rounded="2xl" shadow={3}>
          {EditBut}
        </Center>
        <Center w="80" h="20" bg="white" rounded="2xl" shadow={3}>
          {EditBut}
        </Center>
      </VStack>
    </NativeBaseProvider>
    );
  }
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
            <Menu />
            <Spacer />
            <Spacer />
            <Spacer />
            <Spacer />
            <Bottom />
        </Center>
      </NativeBaseProvider>
    );
    };
    