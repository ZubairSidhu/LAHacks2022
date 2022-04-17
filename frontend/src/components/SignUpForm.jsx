import { React, useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Text,
  Button,
  Flex,
  Select,
  Checkbox,
} from "@chakra-ui/react";
import { ethers } from "ethers";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const SubscriptionButton = () => (
  <Button colorScheme="teal" variant="solid" type="submit">
    Purchase Subscription (0.1 AVAX)
  </Button>
);

const schema = yup
  .object({
    firstName: yup.string().required("Missing first name!"),
    lastName: yup.string().required("Missing last name!"),
    zipCode: yup.string().required("Missing zip code!"),
    email: yup.string().required("Missing email!"),
    age: yup
      .number()
      .min(1, "Invalid age, please enter a valid age")
      .required(),
    bio: yup.string(),
    password: yup.string(),
    confirmPassword: yup.string(),
  })
  .required();

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    delayError: 750,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [activityLevel, setActivityLevel] = useState(1);

  const handleActivityLevelChange = (e) => setActivityLevel(e.target.value);

  const activityLevels = [1, 2, 3, 4, 5];

  const onSignUpSubmit = async (data) => {
    console.log(data);
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
      <form onSubmit={handleSubmit(onSignUpSubmit)} h="100%">
        <Flex
          flexDirection="column"
          justifyContent="space-between"
          gap="150px"
          h="100%"
        >
          <p>{showPassword ? "show" : "don't show"}</p>
          {JSON.stringify(errors, null, 2)}
          <div>
            <Text fontSize="3xl">Sign Up</Text>
            <Flex justifyContent="space-between">
              <FormControl w="40%" isInvalid={false}>
                <FormLabel htmlFor="firstName">First Name</FormLabel>
                <Input
                  id="firstName"
                  placeholder="John"
                  name="firstName"
                  {...register("firstName")}
                />
                <FormErrorMessage>Invalid first name!</FormErrorMessage>
              </FormControl>
              <FormControl w="40%" isInvalid={false}>
                <FormLabel htmlFor="lastName">Last Name</FormLabel>
                <Input
                  id="lastName"
                  placeholder="Smith"
                  name="lastName"
                  {...register("lastName")}
                />
                <FormErrorMessage>Invalid last name!</FormErrorMessage>
              </FormControl>
            </Flex>
            <Flex justifyContent="space-between">
              <FormControl w="40%" isInvalid={false}>
                <FormLabel htmlFor="zipCode">Zip Code</FormLabel>
                <Input
                  id="zipCode"
                  placeholder="92612"
                  name="zipCode"
                  {...register("zipCode")}
                />
                <FormErrorMessage>Invalid zip code!</FormErrorMessage>
              </FormControl>
              <FormControl w="40%" isInvalid={false}>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input
                  id="email"
                  placeholder="yourname@example.com"
                  name="email"
                  {...register("email")}
                />
                <FormErrorMessage>Invalid email!</FormErrorMessage>
              </FormControl>
            </Flex>
            <Flex justifyContent="space-between">
              <FormControl w="40%" isInvalid={false}>
                <FormLabel htmlFor="age">Age</FormLabel>
                <Input
                  id="age"
                  placeholder="18"
                  name="age"
                  {...register("age")}
                />
                <FormErrorMessage>Invalid age!</FormErrorMessage>
              </FormControl>
              <FormControl w="40%">
                <FormLabel htmlFor="activityLevel">Activity Level</FormLabel>
                {/* <Input
                  id="activityLevel"
                  placeholder="1"
                  onChange={handleActivityLevelChange}
                /> */}
                <Select id="activityLevel" placeholder="Select activity level">
                  {activityLevels.map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </Flex>
            <Flex>
              <FormControl w="40%" isInvalid={false}>
                <FormLabel htmlFor="bio">Bio</FormLabel>
                <Input
                  id="bio"
                  placeholder="About Me"
                  name="bio"
                  {...register("bio")}
                />
                <FormErrorMessage>Invalid bio!</FormErrorMessage>
              </FormControl>
            </Flex>
            <Flex justifyContent="space-between">
              <FormControl w="40%" isInvalid={false}>
                <FormLabel htmlFor="password">Password</FormLabel>
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  name="password"
                  {...register("password")}
                />
                <FormErrorMessage>Invalid password!</FormErrorMessage>
              </FormControl>
              <FormControl w="40%" isInvalid={false}>
                <FormLabel htmlFor="confirmPassword">
                  Confirm Password
                </FormLabel>
                <Input
                  id="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="Re-type password"
                  name="confirmPassword"
                  {...register("confirmPassword")}
                />
                <FormErrorMessage>Invalid confirm password!</FormErrorMessage>
              </FormControl>
            </Flex>
            <Flex>
              <Checkbox onClick={() => setShowPassword(true)}>
                Show Password
              </Checkbox>
            </Flex>
          </div>
        </Flex>
        <SubscriptionButton />
      </form>
    </Box>
  );
};

export default SignUpForm;
