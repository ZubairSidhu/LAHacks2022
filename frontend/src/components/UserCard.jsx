import { React } from "react";
import { Box, Text, Image, Flex, IconButton } from "@chakra-ui/react";
import { CloseIcon, CheckIcon } from "@chakra-ui/icons";
import PropTypes from "prop-types";

const RejectButton = () => (
  <IconButton icon={<CloseIcon />} bgColor="red.200" />
);

const AcceptButton = () => (
  <IconButton icon={<CheckIcon />} bgColor="green.200" />
);

const UserCard = ({ userData }) => {
  return (
    <Box
      w="480px"
      h="615px"
      borderRadius="lg"
      bgColor="purple.100"
      boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25);"
      padding="40px 40px"
    >
      <Flex flexDirection="column" justifyContent="flex-start" h="100%">
        <Flex alignItems="center" gap="50px">
          <Text fontSize="3xl">{`${userData.firstName} ${userData.lastName}`}</Text>
          <Image
            src="https://bit.ly/dan-abramov"
            alt={`${userData.firstName} ${userData.lastName}`}
            borderRadius="full"
            boxSize="128px"
          />
        </Flex>
        <Flex flexGrow="2" flexDirection="column" gap="15px" w="330px">
          <Text fontSize="xl">Experience</Text>
          {userData.experience.map((exp) => (
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
  // eslint-disable-next-line react/forbid-prop-types
  userData: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    profilePicture: PropTypes.string,
    experience: PropTypes.string,
    zip: PropTypes.string,
  }).isRequired,
};
export default UserCard;
