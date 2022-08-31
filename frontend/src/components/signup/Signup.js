import {
  Button,
  Flex,
  FormControl,
  Heading,
  Input,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { ChatState } from "../../context/ChatProvider";
import Api from "../../services/api";
import "../styles.css";

const Signup = () => {
  const { user, setUser } = ChatState();
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const history = useHistory();

  const handleInputChange = (e) => {
    const value = e.target.value;
    setState({
      ...state,
      [e.target.name]: value,
    });
  };

  let name = state.name;
  let email = state.email;
  let password = state.password;

  const handleSubmit = async () => {
    setLoading(true);
    if (
      !state.name ||
      !state.email ||
      !state.password ||
      !state.confirmPassword
    ) {
      toast({
        title: "Please fill all the fields",
        status: "warning",
        duration: 2000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    if (state.password !== state.confirmPassword) {
      toast({
        title: "Passwords do not match",
        status: "warning",
        duration: 2000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    try {
      // const config = {
      //   headers: {
      //     "Content-type": "application/json",
      //   },
      // };

      const { data } = await Api().post(`/api/user`, { name, email, password })
      // const { data } = await axios.post(
      //   "http://localhost:4000/api/user/",
      //   { name, email, password },
      //   config
      // );
      if (data === "user already exists") {
        toast({
          title: "User already exists",
          status: "warning",
          duration: 2000,
          isClosable: true,
          position: "bottom",
        });
        setLoading(false);
      } else {
        localStorage.setItem("userInfo", JSON.stringify(data));
        setUser(JSON.parse(localStorage.getItem("userInfo")));
        toast({
          title: "Account has been created",
          status: "success",
          duration: 2000,
          isClosable: true,
          position: "bottom",
        });
        setLoading(false);
        history.push("/music");
      }
    } catch (error) {
      toast({
        title: "Error occured",
        description: error.message,
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };

  console.log(user);

  return (
    <Flex justifyContent="center" alignContent="center" className="signup">
      <Flex
        w="40%"
        h="450px"
        textAlign="center"
        flexDirection="column"
        justifyContent="space-around"
        alignItems="center"
        alignContent="center"
        backgroundColor="#fff7f663"
        p={3}
        borderRadius="30px"
        marginTop="10%"
      >
        <FormControl width="80%">
          <Heading color="white">Sign Up</Heading>
          <br />
          <Input
            id="name"
            type="text"
            value={state.name}
            name="name"
            placeholder="Username"
            _placeholder={{ color: "white" }}
            onChange={handleInputChange}
            color="white"
          />
          <Input
            marginTop="1.5rem"
            id="email"
            type="text"
            value={state.email}
            name="email"
            placeholder="Email"
            _placeholder={{ color: "white" }}
            onChange={handleInputChange}
            color="white"
          />
          <Input
            marginTop="1.5rem"
            id="password"
            type="password"
            value={state.password}
            name="password"
            placeholder="Password"
            _placeholder={{ color: "white" }}
            onChange={handleInputChange}
            color="white"
          />

          <Input
            marginTop="1.5rem"
            id="confirmPassword"
            type="password"
            value={state.confirmPassword}
            name="confirmPassword"
            placeholder="Confirm Password"
            _placeholder={{ color: "white" }}
            onChange={handleInputChange}
            color="white"
          />
          <NavLink to="/music"></NavLink>
          <Button
            marginTop="1.5rem"
            size="md"
            colorScheme="orange"
            isLoading={loading}
            onClick={handleSubmit}
          >
            Sign up
          </Button>
        </FormControl>
      </Flex>
    </Flex>
  );
};

export default Signup;
