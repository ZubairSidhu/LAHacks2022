import { React, useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Text,
  Button,
  Flex,
} from "@chakra-ui/react";
import PropTypes from "prop-types";

const SubscriptionButton = () => (
  <Button colorScheme="teal" variant="solid" type="submit">
    Purchase Subscription (0.1 AVAX)
  </Button>
);

const SignUpForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleFirstNameChange = (e) => setFirstName(e.target.value);
  const handleLastNameChange = (e) => setLastName(e.target.value);
  const handleZipCodeChange = (e) => setZipCode(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

  const onSignUpSubmit = () => {
    console.log(firstName);
  };

  return (
    <Box
      w="900px"
      h="600px"
      borderRadius="lg"
      bgColor="purple.100"
      boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25);"
      padding="40px 40px"
    >
      <form onSubmit={onSignUpSubmit} h="100%">
        <Flex
          flexDirection="column"
          justifyContent="space-between"
          gap="150px"
          h="100%"
        >
          <div>
            <Text fontSize="3xl">Sign Up</Text>
            <Flex justifyContent="space-between">
              <FormControl isRequired w="40%">
                <FormLabel htmlFor="firstName">First Name</FormLabel>
                <Input
                  id="firstName"
                  placeholder="John"
                  onChange={handleFirstNameChange}
                />
              </FormControl>
              <FormControl isRequired w="40%">
                <FormLabel htmlFor="lastName">Last Name</FormLabel>
                <Input
                  id="lastName"
                  placeholder="Adams"
                  onChange={handleLastNameChange}
                />
              </FormControl>
            </Flex>
            <Flex>
              <FormControl isRequired w="40%">
                <FormLabel htmlFor="zipCode">Zip Code</FormLabel>
                <Input
                  id="zipCode"
                  placeholder="92612"
                  onChange={handleZipCodeChange}
                />
              </FormControl>
            </Flex>
            <Flex isRequired justifyContent="space-between">
              <FormControl w="40%">
                <FormLabel htmlFor="password">Password</FormLabel>
                <Input
                  id="password"
                  placeholder="John"
                  onChange={handlePasswordChange}
                />
              </FormControl>
              <FormControl isRequired w="40%">
                <FormLabel htmlFor="confirmPassword">
                  Confirm Password
                </FormLabel>
                <Input
                  id="confirmPassword"
                  placeholder="John"
                  onChange={handleConfirmPasswordChange}
                />
              </FormControl>
            </Flex>
          </div>
        </Flex>
        <SubscriptionButton />
      </form>
    </Box>
  );
};

export default SignUpForm;
