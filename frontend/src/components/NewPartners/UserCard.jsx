import { React } from "react";
import { Box, Text, Image, Flex, IconButton, useToast } from "@chakra-ui/react";
import { CloseIcon, CheckIcon } from "@chakra-ui/icons";
import PropTypes from "prop-types";

import { AxiosBackend, getStorageValue } from "../../common/utils";

const RejectButton = ({ click }) => (
  <IconButton icon={<CloseIcon />} bgColor="red.200" onClick={() => click()} />
);

const AcceptButton = ({ click }) => (
  <IconButton
    icon={<CheckIcon />}
    bgColor="green.200"
    onClick={() => click()}
  />
);

function sortExp(a, b) {
  if (a.endDate < b.endDate) {
    return -1;
  }
  if (a.endDate > b.endDate) {
    return 1;
  }
  return 0;
}

const UserCard = ({ userData }) => {
  const toast = useToast();
  const filterData = {
    ...userData,
    experience: userData.experience.sort(sortExp).slice(0, 4),
  };

  const { id: swiperId } = getStorageValue("currUserId", null);
  // const swiperId = "625b80d183514f0914079a73";

  const swipeLeft = async () => {
    const res = await AxiosBackend.post("/users/swipe", {
      swiperId,
      swipeeId: userData.id,
    });

    if (res?.data.match) {
      toast({
        title: "Match!",
        description: `You just matched with ${userData.firstName} ${userData.lastName}`,
        status: "sucess",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      w="480px"
      minH="615px"
      borderRadius="lg"
      bgColor="purple.100"
      boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25);"
      padding="40px 40px"
    >
      <Flex flexDirection="column" justifyContent="space-between" h="100%">
        <Flex alignItems="center" justify="space-between">
          <Text fontSize="3xl">{`${userData.firstName} ${userData.lastName}`}</Text>
          <Image
            src="https://bit.ly/dan-abramov"
            alt={`${userData.firstName} ${userData.lastName}`}
            borderRadius="full"
            boxSize="128px"
          />
        </Flex>
        <Flex
          flexGrow="2"
          flexDirection="column"
          gap="15px"
          w="330px"
          mb="40px"
        >
          <Text fontSize="xl">Experience</Text>
          {filterData.experience.map((exp) => (
            <Box key={exp.company}>
              <Text>{exp.title}</Text>
              <Text>{`@ ${exp.company}`}</Text>
            </Box>
          ))}
        </Flex>
        <Flex direction="row" justifyContent="space-between" p="0 20px">
          <RejectButton click={() => null} />
          <AcceptButton click={swipeLeft} />
        </Flex>
      </Flex>
    </Box>
  );
};

UserCard.propTypes = {
  userData: PropTypes.shape({
    id: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    profilePicture: PropTypes.string,
    experience: PropTypes.string,
    zip: PropTypes.string,
  }).isRequired,
};

AcceptButton.propTypes = {
  click: PropTypes.func.isRequired,
};

RejectButton.propTypes = {
  click: PropTypes.func.isRequired,
};

export default UserCard;
