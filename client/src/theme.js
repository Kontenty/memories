import { ChakraProvider, extendTheme } from "@chakra-ui/react";

// Call `extendTheme` and pass your custom values
const theme = extendTheme({
  fonts: {
    body: "Lato, 'Segoe UI', sans-serif",
    heading: "Lato, 'Segoe UI', sans-serif",
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: "normal",
        letterSpacing: "0.5px",
      },
    },
    Heading: {
      baseStyle: {
        fontWeight: "medium",
      },
    },
  },
});

console.log(theme);

export const ThemeProvider = ({ children }) => (
  <ChakraProvider theme={theme}>{children}</ChakraProvider>
);
