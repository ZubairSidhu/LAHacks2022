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
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { AxiosBackend, setUserId } from "../common/utils";

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
  const toast = useToast();
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
      const res = await AxiosBackend.post("/users/signin", {
        email: data.email,
        password: data.password,
      });
      setUserId(res.data.id);
      console.log("Sign in response: ", res);
      navigate("/meet");
    } catch (err) {
      return toast({
        title: "Sign in failed",
        description: `Reason: ${err.response.data}`,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
    return null;
  };

  return (
    <Box
      w="500px"
      h="450px"
      borderRadius="lg"
      bgColor="purple.100"
      boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25);"
      padding="40px 0px"
    >
      <form onSubmit={handleSubmit(onSignInSubmit)} h="100%">
        <Flex
          flexDirection="column"
          justifyContent="space-between"
          alignItems="center"
          gap="30px"
          h="100%"
        >
          <Text fontSize="3xl">Sign In</Text>
          <FormControl w="70%" isInvalid={errors?.email}>
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
          <FormControl w="70%" isInvalid={errors?.password}>
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
          <Flex>
            <Checkbox
              colorScheme="green"
              borderColor="grey"
              onChange={() => setShowPassword(!showPassword)}
            >
              Show Password
            </Checkbox>
          </Flex>
          <Flex justifyContent="space-between" alignItems="center" gap="100px">
            <SignInButton />
            <Link
              href="/sign-up"
              fontWeight="bold"
              textDecoration="underline"
              _hover={{ textDecoration: "none" }}
            >
              Sign Up
            </Link>
          </Flex>
        </Flex>
      </form>
    </Box>
  );
};

export default SignInForm;
