import { React } from "react";
import { Box, Text } from "@chakra-ui/react";

const MatchesTable = () => {
  return (
    <Box
      w="900px"
      borderRadius="lg"
      bgColor="purple.100"
      boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25);"
      padding="20px 40px"
    >
      <div>
        <Text fontSize="3xl" align="center">
          Notifications
        </Text>
      </div>
    </Box>
  );
};

export default MatchesTable;
