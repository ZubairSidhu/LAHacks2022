import { React, useEffect } from "react";
import { Box, Flex, useDisclosure } from "@chakra-ui/react";
import { UserCard, FilterModal } from "../../components/NewPartners";

import { AxiosBackend, getStorageValue } from "../../common/utils";

const NewPartners = () => {
  const modalControl = useDisclosure();

  const tempUserID = "625b80d183514f0914079a73";

  // Fetch data using preferences from localstorage
  useEffect(async () => {
    const preferences = getStorageValue("preferences", null);

    if (preferences) {
      const usersList = await AxiosBackend.post("/users/potential-matches", {
        preferences: null,
        searcherId: tempUserID,
      });

      console.log(usersList);
    }
  }, []);

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
        <Flex flexDir="column" gap="30px" alignItems="center">
          <FilterModal modalControl={modalControl} />
          <UserCard userData={dummyUser} />
        </Flex>
      </Flex>
    </Box>
  );
};

export default NewPartners;
