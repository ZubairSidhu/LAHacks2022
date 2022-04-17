import { React } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import WorkoutsTable from "../../components/WorkoutsTable";

const Workouts = () => {
  return (
    <Box w="100%">
      <Flex flexDirection="column" alignItems="center">
        <div>
          <Text fontSize="3xl" align="center">
            Workouts
          </Text>
          <WorkoutsTable />
        </div>
      </Flex>
    </Box>
  );
};

export default Workouts;
