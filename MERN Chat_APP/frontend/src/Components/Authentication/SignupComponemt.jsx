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

const SignupComponemt = () => {
  // useState hooks to manage the state of the form inputs
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [comfirmpassword, setComfirmpassword] = useState("");
  const [picture, setPicture] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

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
  const postDetails = (pictures) => {
    setLoading(true);
    if (!pictures) {
      toast({
        title: "Please select a picture",
        description: "Warning",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
    if (pictures.type === "image/jpeg" || pictures.type === "image/png") {
      const data = new FormData();
      data.append("file", pictures);
      data.append("upload_preset", "Chat-App-TalkLoop");
      data.append("cloud_name", "ddgtt4mxk");
      fetch("https://api.cloudinary.com/v1_1/ddgtt4mxk/image/upload", {
        method: "POST",
        body: data,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setPicture(data.url);
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
        });
    } else {
      toast({
        title: "Please select a picture in JPEG or PNG format",
        description: "Warning",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };

  // function to handle form submission
  const handleSubmit = async () => {
    setLoading(true);
    if (!name || !email || !password || !comfirmpassword) {
      toast({
        title: "Please fill all the fields",
        description: "Warning",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "left",
      });
      setLoading(false);
      return;
    }
    if (password !== comfirmpassword) {
      toast({
        title: "Password is not match",
        description: "Warning",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/user",
        {
          name,
          email,
          password,
          picture,
        },
        config
      );
      toast({
        title: "SignUp Success",
        description: "Go to Login Section",
        status: "success",
        duration: 4000,
        isClosable: true,
        position: "bottom",
      });
      localStorage.setItem("userData", JSON.stringify(data));
      setLoading(false);
      // navigate("/chats");
    } catch (error) {
      toast({
        title: "Error Occured!!",
        description: error.response.data.message,
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };

  // JSX code for the signup form
  return (
    <VStack gap="0.5rem">
      {/* Name input field */}
      <FormControl id="name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          type="name"
          placeholder="Enter Your Name"
          onChange={(event) => setName(event.target.value)}
        />
      </FormControl>

      {/* Email input field  */}
      <FormControl id="email" isRequired>
        <FormLabel>Eame</FormLabel>
        <Input
          type="email"
          placeholder="Enter Your Email Address"
          onChange={(event) => setEmail(event.target.value)}
        />
      </FormControl>

      {/* Passrord input field */}
      <FormControl id="passwoed" isRequired>
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
      <FormControl id="cm_password" isRequired>
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
      <FormControl id="picture" isRequired>
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
        isLoading={loading}
      >
        Ragister
      </Button>
    </VStack>
  );
};
export default SignupComponemt;
