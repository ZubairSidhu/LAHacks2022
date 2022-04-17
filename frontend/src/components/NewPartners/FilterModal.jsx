import { React, useState } from "react";
import PropTypes from "prop-types";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Button,
  Box,
  Text,
  Input,
  Flex,
  FormControl,
  FormLabel,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderMark,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

import { setStorageValue } from "../../common/utils";

const FilterButton = ({ onOpen }) => (
  <Button
    rightIcon={<SearchIcon />}
    bgColor="purple.100"
    boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25);"
    maxW="200px"
    variant="solidNoHover"
    onClick={onOpen}
  >
    Adjust Filters
  </Button>
);

const FormRangeSlider = ({ name, title, control, min, max }) => (
  <FormControl>
    <FormLabel htmlFor={name}>{title}</FormLabel>
    <Controller
      control={control}
      name={name}
      // eslint-disable-next-line no-unused-vars
      render={({ field: { onChange, value, ref } }) => (
        <RangeSlider min={min} max={max} step={1} onChange={onChange}>
          <Flex flexDirection="row">
            <RangeSliderMark value={min} mt="16px" fontSize="sm">
              {min}
            </RangeSliderMark>
            <RangeSliderMark value={max} mt="16px" ml="-15px" fontSize="sm">
              {max}
            </RangeSliderMark>
          </Flex>
          <RangeSliderTrack>
            <RangeSliderFilledTrack bg="purple.600" />
          </RangeSliderTrack>
          <RangeSliderThumb boxSize={6} index={0}>
            {value[0]}
          </RangeSliderThumb>
          <RangeSliderThumb boxSize={6} index={1}>
            {value[1]}
          </RangeSliderThumb>
        </RangeSlider>
      )}
    />
  </FormControl>
);

const schema = yup
  .object({
    ageRange: yup.array(),
    activityRange: yup.array(),
    title: yup.string(),
    company: yup.string(),
    school: yup.string(),
  })
  .required();

const FilterModal = ({ modalControl }) => {
  const { register, control, handleSubmit } = useForm({
    resolver: yupResolver(schema),
    delayError: 750,
    defaultValues: {
      ageRange: [18, 65],
      activityRange: [2, 3],
    },
  });

  const { isOpen, onOpen, onClose } = modalControl;

  const onSubmit = async (data) => {
    const formattedData = {
      ...data,
      minAge: data.ageRange[0],
      maxAge: data.ageRange[1],
      minActivityLevel: data.activityRange[0],
      maxActivityLevel: data.activityRange[1],
    };
    alert(JSON.stringify(formattedData, null, 2));
    setStorageValue("preferences", formattedData);
  };

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
        <ModalContent bgColor="gray.50" padding="40px 40px" maxW="900px">
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Flex
                flexDirection="column"
                justifyContent="flex-start"
                gap="50px"
              >
                <Text fontSize="3xl">Partner Filters</Text>
                <FormRangeSlider
                  name="ageRange"
                  title="Age Range"
                  control={control}
                  min={18}
                  max={99}
                />
                <FormRangeSlider
                  name="activityRange"
                  title="Activity Range"
                  control={control}
                  min={1}
                  max={5}
                />
                <Flex flexDirection="column" gap="40px">
                  <Flex gap="40px">
                    <FormControl>
                      <FormLabel htmlFor="title">Title</FormLabel>
                      <Input
                        id="title"
                        placeholder="e.g. Software Engineer"
                        name="title"
                        {...register("title")}
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel htmlFor="company">Company</FormLabel>
                      <Input
                        id="company"
                        placeholder="e.g. Google"
                        name="company"
                        {...register("company")}
                      />
                    </FormControl>
                  </Flex>
                  <Box w="50%" pr="20px">
                    <FormControl>
                      <FormLabel htmlFor="school">School</FormLabel>
                      <Input
                        id="school"
                        placeholder="e.g. UCLA"
                        name="school"
                        {...register("school")}
                      />
                    </FormControl>
                  </Box>
                </Flex>

                <Button type="submit" size="md" colorScheme="teal" maxW="140px">
                  Find partners!
                </Button>
              </Flex>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

FilterButton.propTypes = {
  onOpen: PropTypes.func.isRequired,
};

FormRangeSlider.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  control: PropTypes.object.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
};

FilterModal.propTypes = {
  modalControl: PropTypes.shape({
    isOpen: PropTypes.bool,
    onOpen: PropTypes.func,
    onClose: PropTypes.func,
  }).isRequired,
};

export default FilterModal;
