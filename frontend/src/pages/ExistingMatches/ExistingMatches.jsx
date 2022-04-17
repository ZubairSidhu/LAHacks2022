import { React } from "react";
import { Box, Text } from "@chakra-ui/react";
import MatchesTable from "../../components/MatchesTable";

const ExistingMatches = () => {
  return (
    <Box w="100%">
      <div>
        <Text fontSize="3xl" align="center">
          Matches
        </Text>
        <MatchesTable />
      </div>
    </Box>
  );
};

export default ExistingMatches;
