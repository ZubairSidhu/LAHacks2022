import { React } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import MatchesTable from "../../components/MatchesTable";

const ExistingMatches = () => {
  return (
    <Box w="100%">
      <Flex flexDirection="column" alignItems="center">
        <div>
          <Text fontSize="3xl" align="center">
            Matches
          </Text>
          <MatchesTable />
        </div>
      </Flex>
    </Box>
  );
};

export default ExistingMatches;
