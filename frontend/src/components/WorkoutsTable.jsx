import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
  Flex,
} from "@chakra-ui/react";
import { AtSignIcon, StarIcon } from "@chakra-ui/icons";

const MatchesTable = () => {
  const [workouts, setWorkouts] = useState([]);
  const navigate = useNavigate();

  useEffect(async () => {
    const initialWorkouts = [
      {
        partners: ["Preston Young", "Zubair Sidhu"],
        location: "Irvine, CA",
        time: "37 min ago",
      },
      {
        partners: ["Alan Chang", "Zubair Sidhu", "Chris Tian"],
        location: "San Diego, CA",
        time: "2 hr ago",
      },
      {
        partners: ["Preston Young", "Alan Chang"],
        location: "San Diego, CA",
        time: "17 hr ago",
      },
      {
        partners: ["Ethan Nguyen"],
        location: "Torrance, CA",
        time: "21 hr ago",
      },
      {
        partners: ["Jane Vo"],
        location: "Irvine, CA",
        time: "Jan. 27, 2022 at 9:30 AM",
      },
      {
        partners: ["Chad Williams", "Chris Tian"],
        location: "Irvine, CA",
        time: "Jan. 10, 2022 at 5:42 PM",
      },
    ];
    setWorkouts(initialWorkouts);
  }, []);

  const workoutRows = () => {
    return (
      <Tbody>
        {workouts.map((workout, index) => {
          return (
            workout && (
              // eslint-disable-next-line react/no-array-index-key
              <Tr key={index}>
                <Td>{workout.partners.join(", ")}</Td>
                <Td>
                  <Flex justifyContent="space-between" gap="100px">
                    <div>{workout.location}</div>
                    <div>{workout.time}</div>
                  </Flex>
                </Td>
              </Tr>
            )
          );
        })}
      </Tbody>
    );
  };

  return (
    <Box
      w="900px"
      borderRadius="lg"
      bgColor="purple.100"
      boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25);"
      padding="40px 40px"
    >
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th fontSize="1.5xl" fontWeight="bold">
                <AtSignIcon mr="10px" /> Partner(s)
              </Th>
              <Th fontSize="1.5xl">
                <StarIcon mr="10px" /> Location
              </Th>
            </Tr>
          </Thead>
          {workoutRows()}
        </Table>
      </TableContainer>
    </Box>
  );
};

export default MatchesTable;
