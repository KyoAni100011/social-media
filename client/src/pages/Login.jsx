import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Flex,
  Text,
  Alert,
  AlertIcon,
  AlertTitle,
  Image,
} from "@chakra-ui/react";
import { loginUser } from "../apis/user";
import { useMutation } from "react-query";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import spinner from "../assets/svgs/spinner.svg";

export default function Login() {
  const auth = useAuth();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const mutation = useMutation(loginUser, {
    onSuccess: (res) => {
      localStorage.setItem("user", JSON.stringify(res.data.user));
      console.log(res.data.user);
      auth.updateUser(res.data.user);
      navigate("/");
    },
    onError: (err) => {
      setErrorMessage(err.response.data.message);
    },
  });

  const handleLogin = () => {
    if (!userInfo.email) {
      setErrorMessage("Please enter your email address");
      return;
    }
    if (!userInfo.password) {
      setErrorMessage("Please enter your password");
      return;
    }

    mutation.mutate(userInfo);
  };

  return (
    <Box className="max-w-md mx-auto">
      <Text className="text-2xl font-bold mb-4">Login</Text>
      {mutation.isError && (
        <Alert status="error" className="my-2">
          <AlertIcon />
          <AlertTitle>{errorMessage}</AlertTitle>
        </Alert>
      )}
      <FormControl className="mb-2">
        <FormLabel>Email :</FormLabel>
        <Input
          type="email"
          placeholder="abc@gmail.com"
          name="email"
          onChange={(e) =>
            setUserInfo({ ...userInfo, [e.target.name]: e.target.value })
          }
        />
      </FormControl>
      <FormControl>
        <FormLabel>Password :</FormLabel>
        <Input
          name="password"
          type="password"
          placeholder="********"
          onChange={(e) =>
            setUserInfo({ ...userInfo, [e.target.name]: e.target.value })
          }
        />
      </FormControl>
      <Flex className="my-2" justifyContent="space-between">
        <Link
          className="hover:underline text-blue-600 font-semibold"
          to="/forgot-password"
        >
          Forgot Password
        </Link>
        <Link
          className="hover:underline text-blue-600 font-semibold"
          to="/register"
        >
          Register
        </Link>
      </Flex>
      <Button className="w-full" onClick={handleLogin}>
        {mutation.isLoading ? (
          <Image src={spinner} alt="Loading" className="h-10 w-10" />
        ) : (
          "Login"
        )}
      </Button>
    </Box>
  );
}
