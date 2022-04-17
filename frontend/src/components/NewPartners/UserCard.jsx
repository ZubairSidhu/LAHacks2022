import { React } from "react";
import { Box, Text, Flex, IconButton, Avatar } from "@chakra-ui/react";
import { CloseIcon, CheckIcon, StarIcon } from "@chakra-ui/icons";
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

const UserCard = ({ userData, nextUser }) => {
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
    nextUser();
  };

  return (
    <Box
      w="480px"
      minH="615px"
      borderRadius="lg"
      bgColor="purple.100"
      boxShadow={nextUser && "0px 4px 4px rgba(0, 0, 0, 0.25);"}
      padding="40px 40px"
    >
      <Flex
        flexDirection="column"
        minH="500px"
        justify="space-between"
        alignItems="stretch"
      >
        <Flex alignItems="center" justify="space-between">
          <Text fontSize="3xl">{`${userData.firstName} ${userData.lastName}`}</Text>
          <Avatar
            // src="https://bit.ly/dan-abramov"
            name={`${userData.firstName} ${userData.lastName}`}
            alt={`${userData.firstName} ${userData.lastName}`}
            size="2xl"
          />
        </Flex>
        <Flex
          flexDirection="column"
          flexGrow="1"
          gap="15px"
          w="330px"
          mb="40px"
        >
          <Text fontSize="xl">Experience</Text>
          {filterData.experience.length !== 0 ? (
            filterData.experience.map((exp) => (
              <Box key={exp.company}>
                <Text>{exp.title}</Text>
                <Text>{`@ ${exp.company}`}</Text>
              </Box>
            ))
          ) : (
            <Box>No experience found :(</Box>
          )}
          {userData.location && (
            <Flex alignItems="baseline">
              <StarIcon mr="10px" />
              <Text fontSize="lg">{`${userData.location}`}</Text>
            </Flex>
          )}
        </Flex>
        {nextUser && (
          <Flex direction="row" justifyContent="space-between" p="0 20px">
            <RejectButton click={nextUser} />
            <AcceptButton click={swipeLeft} />
          </Flex>
        )}
      </Flex>
    </Box>
  );
};

UserCard.defaultProps = {
  nextUser: null,
};

UserCard.propTypes = {
  userData: PropTypes.shape({
    id: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    profilePicture: PropTypes.string,
    experience: PropTypes.string,
    zip: PropTypes.string,
    location: PropTypes.string,
  }).isRequired,
  nextUser: PropTypes.func,
};

AcceptButton.propTypes = {
  click: PropTypes.func.isRequired,
};

RejectButton.propTypes = {
  click: PropTypes.func.isRequired,
};

export default UserCard;
