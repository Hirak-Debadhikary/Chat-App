import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";

const LoginComponent = () => {
  // Setting up state variables for email, password and password visibility
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Function to toggle password visibility
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // function to handle form submission
  const handleSubmit = () => {};

  // Rendering login form
  return (
    <VStack gap="0.5rem">
      {/* Email input field*/}
      <FormControl isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          placeholder="Enter Your Email Address"
          onChange={(event) => setEmail(event.target.value)}
        />
      </FormControl>

      {/* Passrord input field*/}
      <FormControl isRequired id="password">
        <FormLabel>Password</FormLabel>
        <InputGroup size="md">
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Enter Your Password"
            onChange={(event) => setPassword(event.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleShowPassword}>
              {showPassword ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      {/* Login button */}
      <Button
        size="lg"
        colorScheme="blue"
        width="100%"
        bgGradient="linear(to-r,pink.200, green.500 )"
        _hover={{
          bgGradient: "linear(to-l, red.300, yellow.100,green.500 )",
          border: "1px solid black",
          color: "black",
        }}
        onClick={handleSubmit}
      >
        Login
      </Button>

      {/* Button to get guest user credentials */}
      <Button
        size="lg"
        colorScheme="blue"
        width="100%"
        bgGradient="linear(to-r,yellow.200, red.500 )"
        _hover={{
          bgGradient: "linear(to-l,red.700, yellow.300 )",
          border: "1px solid black",
          color: "black",
        }}
        onClick={() => {
          setEmail("guest@hirak.com");
          setPassword("0000");
        }}
      >
        Get Gust User Credential
      </Button>
    </VStack>
  );
};

export default LoginComponent;
