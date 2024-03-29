import {
  Button,
  Flex,
  FormControl,
  Text,
  Input,
  Heading,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { ChatState } from "../../context/ChatProvider";
import Api from "../../services/api";
import '../styles.css'

const Login = () => {
  const history = useHistory();
  const { setUser } = ChatState();
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleInputChange = (e) => {
    const value = e.target.value;
    setState({
      ...state,
      [e.target.name]: value,
    });
  };

  const email = state.email;
  const password = state.password;

  const handleSubmit = async () => {
    setLoading(true);
    if (!email || !password) {
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

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await Api().post(
        `/api/user/login`,
        { email, password },
        config
      );

      if (data) {
        localStorage.setItem("userInfo", JSON.stringify(data));
        setUser(JSON.parse(localStorage.getItem("userInfo")));
        toast({
          title: "Login Successful",
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

  return (
    <Flex
      className="login"
      justifyContent="center"
      alignItems="center"
      alignContent="center"
      
    >
      <Flex
        w="40%"
        h="450px"
        textAlign="center"
        flexDirection="column"
        justifyContent="space-around"
        alignItems="center"
        alignContent="center"
        p={3}
        bg="#fff7f663"
        borderRadius="30px"
      >
        <FormControl width="80%">
          <Heading color='white'>Login</Heading>
          <br />
          <Input
            name="email"
            id="email"
            type="text"
            placeholder="Email"
            _placeholder={{ color:'black' }}
            onChange={handleInputChange}
            color='white'
          />

          <Input
            marginTop="1.5rem"
            name="password"
            id="password"
            type="password"
            placeholder="Password"
            _placeholder={{ color: "black" }}
            onChange={handleInputChange}
            color='white'
          />

          <Button
            margin="1rem"
            size="md"
            colorScheme="orange"
            onClick={handleSubmit}
            isLoading={loading}
          >
            Log in
          </Button>

          <Text fontSize="lg" color='white'>Don't have an account yet? </Text>
          <NavLink to="/signup" style={{ textDecoration: "underline", color: 'white' }}>
            Sign up
          </NavLink>
        </FormControl>
      </Flex>
    </Flex>
  );
};

export default Login;
