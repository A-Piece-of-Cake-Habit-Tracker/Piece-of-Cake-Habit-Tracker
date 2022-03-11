import { VStack, Input, Button, FormControl, NativeBaseProvider, Center } from 'native-base';
import React from 'react';
import { Formik } from 'formik';

const validate = values => {
  const errors = {};

  if (!values.firstName) {
    errors.firstName = 'Required';
  }

  return errors;
};

function FormikExample() {
  const onSubmit = data => {
    console.log('submiting with ', data);
  };

  return <Formik initialValues={{
    firstName: '',
    lastName: ''
  }} onSubmit={onSubmit} validate={validate}>
      {({
      handleChange,
      handleBlur,
      handleSubmit,
      values,
      errors
    }) => <VStack width="80%" space={4}>
          <FormControl isRequired isInvalid={'firstName' in errors}>
            <FormControl.Label>First Name</FormControl.Label>
            {console.log('errors', errors)}
            <Input onBlur={handleBlur('firstName')} placeholder="John" onChangeText={handleChange('firstName')} value={values.firstName} />
            <FormControl.ErrorMessage>
              {errors.firstName}
            </FormControl.ErrorMessage>
          </FormControl>

          <FormControl isInvalid={'lastName' in errors}>
            <FormControl.Label>Last Name</FormControl.Label>
            <Input onBlur={handleBlur('lastName')} placeholder="Doe" onChangeText={handleChange('lastName')} value={values.lastName} />
            <FormControl.ErrorMessage>
              {errors.lastName}
            </FormControl.ErrorMessage>
          </FormControl>

          <Button onPress={handleSubmit} colorScheme="pink">
            Submit
          </Button>
        </VStack>}
    </Formik>;
}

function Example() {
  return <NativeBaseProvider>
      <FormikExample />
    </NativeBaseProvider>;
}

    export default () => {
        return (
          <NativeBaseProvider>
            <Center flex={1} px="3">
                <Example />
            </Center>
          </NativeBaseProvider>
        );
    };
    