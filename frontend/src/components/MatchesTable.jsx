import { React, useEffect, useState } from "react";
import PropTypes from "prop-types";
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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Flex,
} from "@chakra-ui/react";
import UserCard from "./NewPartners/UserCard";
import { AxiosBackend, getUserId } from "../common/utils";

const UserModal = ({ modalControl, userData }) => {
  return (
    <Modal isOpen={modalControl.isOpen} onClose={modalControl.onClose}>
      <ModalOverlay />
      <ModalContent bgColor="purple.100" maxW="fit-content" maxH="fit-content">
        <ModalCloseButton />
        <UserCard userData={userData} />
        <Flex justifyContent="center" gap="20px" paddingBottom="30px">
          <Button colorScheme="purple" variant="solid">
            Create SMS Chat
          </Button>
          <Button colorScheme="purple" variant="solid">
            Submit Workout
          </Button>
        </Flex>
      </ModalContent>
    </Modal>
  );
};

const MatchesTable = () => {
  const [matches, setMatches] = useState([]);
  const [currUser, setCurrUser] = useState({});
  const navigate = useNavigate();
  const modalControl = useDisclosure();

  const getMatches = async (userId) => {
    const res = await AxiosBackend.get(`users/${userId}`);
    console.log("getMatches");
    console.log(res);

    const matchData = await Promise.all(
      res.data.two_way_match.map(async (matchId) => {
        const user = await AxiosBackend.get(`users/${matchId}`);
        return user.data;
      })
    );

    setMatches(matchData);
  };

  useEffect(async () => {
    try {
      const userId = getUserId();
      await getMatches(userId);
    } catch (err) {
      console.log(err.response);
    }
  }, []);

  const matchRows = () => {
    return (
      <Tbody>
        {matches.map((match, index) => {
          return (
            match && (
              // eslint-disable-next-line react/no-array-index-key
              <Tr key={index}>
                <Td>{`${match?.firstName} ${match?.lastName}`}</Td>
                <Td>
                  <Button
                    colorScheme="teal"
                    variant="solid"
                    onClick={() => {
                      setCurrUser(match);
                      modalControl.onOpen();
                    }}
                  >
                    View Profile
                  </Button>
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
              <Th>NAME</Th>
              <Th>PROFILE</Th>
            </Tr>
          </Thead>
          {matchRows()}
          <UserModal modalControl={modalControl} userData={currUser} />
        </Table>
      </TableContainer>
    </Box>
  );
};

UserModal.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  modalControl: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  userData: PropTypes.object.isRequired,
};

export default MatchesTable;
