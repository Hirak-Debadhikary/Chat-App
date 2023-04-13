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
    <Container maxW="xl" centerContent>
      <Box
        display="flex"
        justifyContent="center"
        p={3}
        bg="transparent"
        w="100%"
        margin="40px 0px 15px 0px"
        borderRadius="lg"
        borderWidth="1px"
      >
        <Text fontSize="4xl" fontFamily="inherit">
          Chat App
        </Text>
      </Box>
      <Box
        bg="transparent "
        w="100%"
        p={4}
        borderRadius="lg"
        borderWidth="1px"
        boxShadow="box-shadow: rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset"
      >
        {" "}
        <Tabs variant="soft-rounded" colorScheme="green">
          <TabList mb="1rem">
            <Tab w="50%">Login</Tab>
            <Tab w="50%">Register</Tab>
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
