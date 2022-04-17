import { React, useEffect, useState } from "react";
import { Box, Flex, useDisclosure } from "@chakra-ui/react";
import { UserCard, FilterModal } from "../../components/NewPartners";

import { AxiosBackend, getStorageValue, getUserId } from "../../common/utils";

const NewPartners = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [userList, setUserList] = useState([]);

  const getUsers = async () => {
    const preferences = getStorageValue("preferences", null);
    console.log(preferences);
    const userId = getUserId();
    const res = await AxiosBackend.post("/users/potential-matches", {
      preferences,
      searcherId: userId,
    });

    setUserList(res.data);
  };

  // Fetch data using preferences from localstorage
  useEffect(async () => {
    getUsers();
  }, []);

  const modalControl = {
    isOpen,
    onOpen,
    onClose: () => {
      getUsers();
      onClose();
    },
  };

  return (
    <Box w="100%" h="100%">
      <Flex
        flexDirection="column"
        minH="100vh"
        alignItems="center"
        justify="center"
        mt="50px"
      >
        <Flex flexDir="column" gap="30px" alignItems="center">
          <FilterModal modalControl={modalControl} />
          {userList.length !== 0 ? (
            userList.map((user) => <UserCard key={user.id} userData={user} />)
          ) : (
            <Box w="400px" h="600px">
              No users found
            </Box>
          )}
        </Flex>
      </Flex>
    </Box>
  );
};

export default NewPartners;
