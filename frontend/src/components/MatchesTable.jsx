import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Text,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button,
} from "@chakra-ui/react";
import { AxiosBackend, getUserId } from "../common/utils";

const MatchesTable = () => {
  const [matches, setMatches] = useState([]);
  const navigate = useNavigate();

  useEffect(async () => {
    try {
      const userId = getUserId();
      const res = await AxiosBackend.get(`users/${userId}`);
      const twoWayMatches = res.data.two_way_match;
      console.log("Matches response", twoWayMatches);
      // setMatches(twoWayMatches);
    } catch (err) {
      console.log(err.response);
    }
  }, []);

  const matchRows = () => {
    return (
      <Tbody>
        {matches.map(async (matchId, index) => {
          const res = await AxiosBackend.get(`users/${matchId}`);
          console.log(res.data);
          return (
            // eslint-disable-next-line react/no-array-index-key
            <Tr key={index}>
              {/* <Td>{`${res.data.firstName} ${res.data.lastName}`}</Td> */}
              <Td>Hello there</Td>
              <Td>
                <Button
                  colorScheme="teal"
                  variant="solid"
                  onClick={() => navigate("/")}
                >
                  View Profile
                </Button>
              </Td>
            </Tr>
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
          <TableCaption>Imperial to metric conversion factors</TableCaption>
          <Thead>
            <Tr>
              <Th>NAME</Th>
              <Th>PROFILE</Th>
            </Tr>
          </Thead>
          {matchRows()}
          <Tfoot>
            <Tr>
              <Th>To convert</Th>
              <Th>into</Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default MatchesTable;
