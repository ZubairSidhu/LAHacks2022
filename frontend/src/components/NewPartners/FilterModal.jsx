import { React } from "react";
import PropTypes from "prop-types";

import {
  Button,
  Box,
  Text,
  Image,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

const FilterButton = ({ onOpen }) => (
  <Button
    rightIcon={<SearchIcon />}
    bgColor="purple.100"
    boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25);"
    variant="solidNoHover"
    onClick={onOpen}
  >
    Adjust Filters
  </Button>
);

const Content = () => {
  return (
    <Flex flexDirection="column" justifyContent="flex-start">
      <Text fontSize="3xl">Partner Filters</Text>
      <RangeSlider
        // eslint-disable-next-line jsx-a11y/aria-proptypes
        aria-label={["min", "max"]}
        colorScheme="purple"
        defaultValue={[10, 30]}
      >
        <RangeSliderTrack>
          <RangeSliderFilledTrack />
        </RangeSliderTrack>
        <RangeSliderThumb index={0} />
        <RangeSliderThumb index={1} />
      </RangeSlider>
    </Flex>
  );
};

const FilterModal = ({ modalControl }) => {
  const { isOpen, onOpen, onClose } = modalControl;
  return (
    <>
      <FilterButton onOpen={onOpen} />
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="xl"
        isCentered
        motionPreset="slideInBottom"
        borderRadius="lg"
      >
        <ModalOverlay />
        <ModalContent bgColor="gray.50" padding="40px 40px">
          <ModalCloseButton />
          <ModalBody>
            <Content />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

FilterButton.propTypes = {
  onOpen: PropTypes.func.isRequired,
};

FilterModal.propTypes = {
  modalControl: PropTypes.shape({
    isOpen: PropTypes.bool,
    onOpen: PropTypes.func,
    onClose: PropTypes.func,
  }).isRequired,
};

export default FilterModal;
