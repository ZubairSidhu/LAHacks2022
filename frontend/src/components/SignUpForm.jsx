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
    email: yup.string().email().required("Missing email!"),
    age: yup
      .number()
      .min(1, "Invalid age: please enter a valid age (>0)")
      .typeError("Age must be a number!")
      .required("Missing age!"),
    activityLevel: yup.string().required("Missing activity level!"),
    bio: yup.string(),
    password: yup
      .string()
      .required("Missing password!")
      .min(8, "Password is too short - should be 8 chars minimum!"),
    confirmPassword: yup
      .string()
      .required("Need to confirm password!")
      .oneOf([yup.ref("password"), null], "Passwords don't match!"),
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

  const activityLevels = [1, 2, 3, 4, 5];

  const onSignUpSubmit = async (data) => {
    console.log(data);
  };

  const onSignUpSubmitError = async (err) => {
    console.log(err);
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
      <form
        onSubmit={handleSubmit(onSignUpSubmit, onSignUpSubmitError)}
        h="100%"
      >
        <Flex
          flexDirection="column"
          justifyContent="space-between"
          gap="150px"
          h="100%"
        >
          {/* {JSON.stringify(errors, null, 2)} */}
          <div>
            <Text fontSize="3xl">Sign Up</Text>
            <Flex justifyContent="space-between">
              <FormControl w="40%" isInvalid={errors?.firstName}>
                <FormLabel htmlFor="firstName">First Name</FormLabel>
                <Input
                  id="firstName"
                  placeholder="John"
                  name="firstName"
                  {...register("firstName")}
                />
                <FormErrorMessage>{errors.firstName?.message}</FormErrorMessage>
              </FormControl>
              <FormControl w="40%" isInvalid={errors?.lastName}>
                <FormLabel htmlFor="lastName">Last Name</FormLabel>
                <Input
                  id="lastName"
                  placeholder="Smith"
                  name="lastName"
                  {...register("lastName")}
                />
                <FormErrorMessage>{errors.lastName?.message}</FormErrorMessage>
              </FormControl>
            </Flex>
            <Flex justifyContent="space-between">
              <FormControl w="40%" isInvalid={errors?.zipCode}>
                <FormLabel htmlFor="zipCode">Zip Code</FormLabel>
                <Input
                  id="zipCode"
                  placeholder="92612"
                  name="zipCode"
                  {...register("zipCode")}
                />
                <FormErrorMessage>{errors.zipCode?.message}</FormErrorMessage>
              </FormControl>
              <FormControl w="40%" isInvalid={errors?.email}>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input
                  id="email"
                  placeholder="yourname@example.com"
                  name="email"
                  {...register("email")}
                />
                <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
              </FormControl>
            </Flex>
            <Flex justifyContent="space-between">
              <FormControl w="40%" isInvalid={errors?.age}>
                <FormLabel htmlFor="age">Age</FormLabel>
                <Input
                  id="age"
                  placeholder="18"
                  name="age"
                  {...register("age")}
                />
                <FormErrorMessage>{errors.age?.message}</FormErrorMessage>
              </FormControl>
              <FormControl w="40%" isInvalid={errors?.activityLevel}>
                <FormLabel htmlFor="activityLevel">Activity Level</FormLabel>
                <Select
                  id="activityLevel"
                  placeholder="Select activity level"
                  {...register("activityLevel")}
                >
                  {activityLevels.map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </Select>
                <FormErrorMessage>
                  {errors.activityLevel?.message}
                </FormErrorMessage>
              </FormControl>
            </Flex>
            <Flex>
              <FormControl w="40%" isInvalid={errors?.bio}>
                <FormLabel htmlFor="bio">Bio</FormLabel>
                <Input
                  id="bio"
                  placeholder="About Me"
                  name="bio"
                  {...register("bio")}
                />
                <FormErrorMessage>{errors.bio?.message}</FormErrorMessage>
              </FormControl>
            </Flex>
            <Flex justifyContent="space-between">
              <FormControl w="40%" isInvalid={errors?.password}>
                <FormLabel htmlFor="password">Password</FormLabel>
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  name="password"
                  {...register("password")}
                />
                <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
              </FormControl>
              <FormControl w="40%" isInvalid={errors?.confirmPassword}>
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
                <FormErrorMessage>
                  {errors.confirmPassword?.message}
                </FormErrorMessage>
              </FormControl>
            </Flex>
            <Flex>
              <Checkbox onChange={() => setShowPassword(!showPassword)}>
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
