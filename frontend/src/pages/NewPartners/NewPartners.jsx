import { React } from "react";
import {
  Box,
  Text,
  Image,
  Flex,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import { UserCard, FilterModal } from "../../components/NewPartners";

const NewPartners = () => {
  const modalControl = useDisclosure();
  const dummyUser = {
    firstName: "Dan",
    lastName: "Abramov",
    profilePicture: "https://bit.ly/dan-abramov",
    experience: [
      {
        company: "commit the change, uci",
        title: "co-vice president of projects",
      },
      {
        company: "zillow",
        title: "software development engineer - intern",
      },
    ],
    zip: 90210,
  };
  return (
    <Box w="100%" h="100%">
      <Flex
        flexDirection="column"
        minH="100vh"
        alignItems="center"
        justify="center"
      >
        <Box>
          <FilterModal modalControl={modalControl} />
          <UserCard userData={dummyUser} />
        </Box>
      </Flex>
    </Box>
  );
};

export default NewPartners;
