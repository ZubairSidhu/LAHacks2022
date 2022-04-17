import { React, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Box, Flex, useDisclosure, useToast } from "@chakra-ui/react";
import { UserCard, FilterModal } from "../../components/NewPartners";

import { AxiosBackend, getStorageValue, getUserId } from "../../common/utils";

// eslint-disable-next-line react/prop-types
const LoadingBox = ({ text }) => (
  <Box
    w="480px"
    minH="615px"
    borderRadius="lg"
    bgColor="purple.100"
    boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25);"
    padding="40px 40px"
  >
    {text}
  </Box>
);

// eslint-disable-next-line react/prop-types
const UserContent = ({ loading, userList, userIndex, setUserIndex }) => {
  if (loading) {
    return <LoadingBox text="Loading users!" />;
  }
  if (userList.length === 0) {
    return <LoadingBox text="No users found" />;
  }
  if (userList.length - 1 === userIndex) {
    return <LoadingBox text="No more users" />;
  }
  return (
    <UserCard
      key={userList[userIndex].id}
      userData={userList[userIndex]}
      nextUser={() => setUserIndex(userIndex + 1)}
    />
  );
};

const NewPartners = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [userList, setUserList] = useState([]);
  const [userIndex, setUserIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const getUsers = async () => {
    const preferences = getStorageValue("preferences", null);
    console.log(preferences);
    const userId = getUserId();
    const res = await AxiosBackend.post("/users/potential-matches", {
      preferences,
      searcherId: userId,
    });

    setUserList(res.data);
    setLoading(false);
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
        // mt="10px"
      >
        <Flex flexDir="column" gap="30px" alignItems="center">
          <FilterModal modalControl={modalControl} />
          <UserContent
            loading={loading}
            userList={userList}
            userIndex={userIndex}
            setUserIndex={setUserIndex}
          />
        </Flex>
      </Flex>
    </Box>
  );
};

UserContent.propTypes = {
  loading: PropTypes.bool.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  userList: PropTypes.array.isRequired,
};

export default NewPartners;
