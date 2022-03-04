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
                  Ketsib
            </Text>
          </VStack>
          <Box>
            <Button 
              variant="ghost"
              onPress={() => Alert.alert("hello world")}>
              <Text fontSize="xl" fontWeight="bold" color="cyan.600">
                Edit
              </Text>
            </Button>
          </Box>
          <Box>
            <Button 
              variant="ghost"
              onPress={() => Alert.alert("hello world")}>
              <Image source={require('../assets/plus.png')} size="xl" />
            </Button>
          </Box>
                    
      </HStack>
      <VStack mt="15" width={375} maxWidth="100%" space={4} alignItems="center">
        <Center w="80" h="20" bg="white" rounded="2xl" shadow={3} />
        <Center w="80" h="20" bg="white" rounded="2xl" shadow={3} />
        <Center w="80" h="20" bg="white" rounded="2xl" shadow={3} />
      </VStack>
    </NativeBaseProvider>;
}
    export default () => {
        return (
          <NativeBaseProvider>
            <Center maxWidth="100%" flex={1} px="3">
                <Header />
            </Center>
          </NativeBaseProvider>
        );
    };
    