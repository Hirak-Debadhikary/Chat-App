import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginComponent = () => {
  // Setting up state variables for email, password and password visibility
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  // Function to toggle password visibility
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // function to handle form submission
  const handleSubmit = async () => {
    setLoading(true);
    if (!email || !password) {
      toast({
        title: "Please enter your email and password",
        description: "Wrong email or password",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/user/login",
        {
          email,
          password,
        },
        config
      );
      toast({
        title: "Login Success",
        description: "successfuly login",
        status: "success",
        duration: 4000,
        isClosable: true,
        position: "bottom",
      });
      localStorage.setItem("userData", JSON.stringify(data));
      setLoading(false);
      navigate("/chats");
    } catch (error) {
      toast({
        title: "Error Occured!!",
        description: error.message.data.message,
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };

  // Rendering login form
  return (
    <VStack gap="0.5rem">
      {/* Email input field*/}
      <FormControl isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          value={email}
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
            value={password}
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
        isLoading={loading}
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
