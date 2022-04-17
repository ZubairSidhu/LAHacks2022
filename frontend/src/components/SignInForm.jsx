import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Text,
  Link,
  Button,
  Flex,
  Checkbox,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { AxiosBackend } from "../common/utils";

const SignInButton = () => (
  <Button colorScheme="purple" variant="solid" type="submit">
    Sign In
  </Button>
);

const schema = yup
  .object({
    email: yup.string().email("Invalid email!").required("Missing email!"),
    password: yup.string().required("Missing password!"),
  })
  .required();

const SignInForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    delayError: 750,
  });

  const [showPassword, setShowPassword] = useState(false);

  const onSignInSubmit = async (data) => {
    try {
      console.log(data);

      const res = await AxiosBackend.post("/users/signin", {
        email: data.email,
        password: data.password,
      });

      console.log("Sign in response: ", res);
      navigate("/meet");
    } catch (err) {
      console.log("Sign in error: ", err);
    }
  };

  const onSignInSubmitError = (err) => {
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
        onSubmit={handleSubmit(onSignInSubmit, onSignInSubmitError)}
        h="100%"
      >
        <Flex
          flexDirection="column"
          justifyContent="space-between"
          gap="150px"
          h="100%"
        >
          <Text fontSize="3xl">Sign In</Text>
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
          <Flex>
            <Checkbox onChange={() => setShowPassword(!showPassword)}>
              Show Password
            </Checkbox>
          </Flex>
          <Flex justifyContent="space-around">
            <SignInButton />
            <Link href="/sign-up" fontWeight="bold" textDecoration="underline">
              Sign Up
            </Link>
          </Flex>
        </Flex>
      </form>
    </Box>
  );
};

export default SignInForm;
