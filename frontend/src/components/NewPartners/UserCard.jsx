import { React } from "react";
import { Box, Text, Image, Flex, IconButton } from "@chakra-ui/react";
import { CloseIcon, CheckIcon } from "@chakra-ui/icons";
import PropTypes from "prop-types";

import { AxiosBackend, getStorageValue } from "../../common/utils";

const RejectButton = () => (
  <IconButton icon={<CloseIcon />} bgColor="red.200" />
);

const AcceptButton = () => (
  <IconButton icon={<CheckIcon />} bgColor="green.200" />
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

const UserCard = ({ userData, swiperId }) => {
  const filterData = {
    ...userData,
    experience: userData.experience.sort(sortExp).slice(0, 4),
  };

  const swipeLeft = async () => {
    const res = await AxiosBackend.post("/users/swipe", {
      swiperId,
      swipeeId: userData.id,
    });

    setUserList(res.data);
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
          <RejectButton />
          <AcceptButton />
        </Flex>
      </Flex>
    </Box>
  );
};

UserCard.propTypes = {
  userData: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    profilePicture: PropTypes.string,
    experience: PropTypes.string,
    zip: PropTypes.string,
  }).isRequired,
  swiperId: PropTypes.string.isRequired,
};

export default UserCard;
