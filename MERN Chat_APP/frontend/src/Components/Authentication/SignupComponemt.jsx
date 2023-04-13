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

const SignupComponemt = () => {
  // useState hooks to manage the state of the form inputs
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [comfirmpassword, setComfirmpassword] = useState("");
  const [picture, setPicture] = useState("");

  // useState hooks to manage the state of the password visibility toggles
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // toggle function for showing/hiding password
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // toggle function for showing/hiding confirm password
  const handleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // function to post user picture to the server
  const postDetails = (picture) => {};

  // function to handle form submission
  const handleSubmit = () => {};

  // JSX code for the signup form
  return (
    <VStack gap="0.5rem">
      {/* Name input field */}
      <FormControl isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          type="name"
          placeholder="Enter Your Name"
          onChange={(event) => setName(event.target.value)}
        />
      </FormControl>

      {/* Email input field  */}
      <FormControl isRequired>
        <FormLabel>Eame</FormLabel>
        <Input
          type="email"
          placeholder="Enter Your Email Address"
          onChange={(event) => setEmail(event.target.value)}
        />
      </FormControl>

      {/* Passrord input field */}
      <FormControl isRequired>
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

      {/*Comfirm Passrord input field */}
      <FormControl isRequired>
        <FormLabel>Comfirm Password</FormLabel>
        <InputGroup size="md">
          <Input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Enter Your Comfirm Password"
            onChange={(event) => setComfirmpassword(event.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleShowConfirmPassword}>
              {showConfirmPassword ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      {/* Uplode Picture field */}
      <FormControl isRequired>
        <FormLabel>Upload Your Picture</FormLabel>

        <Input
          type="file"
          p={1}
          accept="image/*"
          onChange={(event) => postDetails(event.target.files[0])}
        />
      </FormControl>

      {/* Signup button */}
      <Button
        size="lg"
        colorScheme="blue"
        width="100%"
        bgGradient="linear(to-r, green.200, red.500, blue.500 )"
        _hover={{
          bgGradient: "linear(to-l,red.700, green.200,yellow.300 )",
          border: "1px solid black",
          color: "black",
        }}
        onClick={handleSubmit}
      >
        Ragister
      </Button>
    </VStack>
  );
};

export default SignupComponemt;
