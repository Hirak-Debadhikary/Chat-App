import React from "react";
import {
  Box,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import SignupComponemt from "../Authentication/SignupComponemt";
import LoginComponent from "../Authentication/LoginComponent";

const HomeComponent = () => {
  return (
    <Container maxW="xl" centerContent bg="transparent">
      <Box
        display="flex"
        justifyContent="center"
        p={3}
        // bg="transparent"
        w="100%"
        // margin="40px 0px 0px 0px"
        marginTop="3rem"
        borderRadius="lg"
        borderWidth="1px"
        marginBottom="2px"
      >
        {/* <Text fontSize="4xl" fontFamily="inherit">
          Wellcome to TalkLoop
        </Text> */}
        <Text
          fontSize="4xl"
          fontFamily="inherit"
          textAlign="center"
          fontWeight="bold"
          color="pink.500"
          textShadow="1px 1px #FFFFFF"
          letterSpacing="wide"
        >
          Welcome to <span style={{ color: "#2D4CCA" }}>TalkLoop</span>
        </Text>
      </Box>
      <Box
        // bg="transparent"
        w="100%"
        p={4}
        borderRadius="lg"
        borderWidth="1px"
        boxShadow="box-shadow: rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset"
      >
        {" "}
        <Tabs variant="soft-rounded" colorScheme="green">
          <TabList mb="1rem" gap="0.5rem">
            <Tab
              size="lg"
              w="50%"
              bgGradient="linear(to-r, green.500, blue.400  )"
              _hover={{
                bgGradient: "linear(to-l, red.300, green.500 )",
                border: "1px solid black",
                color: "black",
              }}
            >
              Login
            </Tab>
            <Tab
              w="50%"
              size="lg"
              bgGradient="linear(to-r,blue.400, green.500 )"
              _hover={{
                bgGradient: "linear(to-l, red.300,green.500 )",
                border: "1px solid black",
                color: "black",
              }}
            >
              Register
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              {/* <p>Login</p> */}
              <LoginComponent />
            </TabPanel>
            <TabPanel>
              {/* <p>Register</p> */}
              <SignupComponemt />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default HomeComponent;
// size="lg"
// colorScheme="blue"
// width="100%"
// bgGradient="linear(to-r,pink.200, green.500 )"
// _hover={{
//   bgGradient: "linear(to-l, red.300, yellow.100,green.500 )",
//   border: "1px solid black",
//   color: "black",
// }}
// onClick={handleSubmit}
// >
// Login
// </Button>
