import { React } from "react";
import { Box, Flex } from "@chakra-ui/react";
import SignInForm from "../../components/SignInForm";

const SignIn = () => {
  return (
    <Box minH="100vh" w="100%">
      <Flex
        flexDirection="column"
        minH="100vh"
        alignItems="center"
        justify="center"
      >
        <div>
          <SignInForm />
        </div>
      </Flex>
    </Box>
  );
};

export default SignIn;
