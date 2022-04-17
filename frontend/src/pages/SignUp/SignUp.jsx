import { React } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import SignUpForm from "../../components/SignUpForm";

const SignUp = () => {
  return (
    <Box w="100%">
      <Flex flexDirection="column" alignItems="center" justify="center">
        <div>
          <Text fontSize="5xl" align="center">
            Fit Links
          </Text>
          <SignUpForm />
        </div>
      </Flex>
    </Box>
  );
};

export default SignUp;
