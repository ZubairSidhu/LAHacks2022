import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Text,
  Textarea,
  Button,
  Flex,
  Select,
  Checkbox,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { AxiosBackend } from "../common/utils";
import PaymentButton from "./PaymentButton";

const SubscriptionButton = () => (
  <Button colorScheme="teal" variant="solid" type="submit">
    Purchase Subscription (0.1 AVAX)
  </Button>
);

const schema = yup
  .object({
    firstName: yup.string().required("Missing first name!"),
    lastName: yup.string().required("Missing last name!"),
    zipCode: yup
      .string()
      .test(
        "len",
        "Zipcode must be exactly 5 characters!",
        (val) => val.length === 5
      )
      .required("Missing zip code!"),
    email: yup.string().email("Invalid email!").required("Missing email!"),
    age: yup
      .number()
      .min(18, "Invalid age: must be at least 18 years old!")
      .typeError("Age must be a number!")
      .required("Missing age!"),
    activityLevel: yup.string().required("Missing activity level!"),
    bio: yup.string().required("Missing a bio!"),
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
  const toast = useToast();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    resolver: yupResolver(schema),
    delayError: 750,
  });

  const [showPassword, setShowPassword] = useState(false);

  const activityLevels = [1, 2, 3, 4, 5];

  const onSignUpSubmit = async (data) => {
    try {
      const res = await AxiosBackend.post("/users/signup", {
        firstName: data.firstName,
        lastName: data.lastName,
        zip: data.zipCode,
        email: data.email,
        password: data.password,
        age: data.age,
        bio: data.bio,
        activityLevel: data.activityLevel,
        wallet: data.wallet,
        transaction: data.transaction,
      });

      console.log(res);
      navigate("/sign-in");
    } catch (err) {
      return toast({
        title: "Sign up failed",
        description: `Reason: ${err.response.data}`,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const paymentCallback = (transaction) => {
    const data = getValues();
    data.transaction = transaction.hash;
    data.wallet = transaction.from;
    onSignUpSubmit(data);
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
      {/* <form onSubmit={handleSubmit(onSignUpSubmit)} h="100%"> */}
      <form h="100%">
        <Flex
          flexDirection="column"
          justifyContent="space-between"
          gap="150px"
          h="100%"
        >
          <div>
            <Text fontSize="3xl">Sign Up</Text>
            <Flex justifyContent="space-between">
              <FormControl w="40%" isInvalid={errors?.firstName}>
                <FormLabel htmlFor="firstName">First Name</FormLabel>
                <Input
                  id="firstName"
                  placeholder="John"
                  name="firstName"
                  bg="white"
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
                  bg="white"
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
                  bg="white"
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
                  bg="white"
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
                  bg="white"
                  {...register("age")}
                />
                <FormErrorMessage>{errors.age?.message}</FormErrorMessage>
              </FormControl>
              <FormControl w="40%" isInvalid={errors?.activityLevel}>
                <FormLabel htmlFor="activityLevel">Activity Level</FormLabel>
                <Select
                  id="activityLevel"
                  placeholder="Select activity level"
                  bg="white"
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
                <Textarea
                  id="bio"
                  placeholder="About Me"
                  name="bio"
                  bg="white"
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
                  bg="white"
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
                  bg="white"
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
        {/* <SubscriptionButton /> */}
        <PaymentButton onSuccess={paymentCallback} />
      </form>
    </Box>
  );
};

export default SignUpForm;
