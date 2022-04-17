import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    heading: "Inter",
    body: "Inter",
  },
  components: {
    Button: {
      variants: {
        solidNoHover: (props) => ({
          ...theme.components.Button.variants.solid(props),
          _hover: {},
          _active: {},
        }),
      },
    },
  },
});

export default theme;
