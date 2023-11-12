import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  Alert,
  AlertIcon,
  AlertTitle,
} from "@chakra-ui/react";
import { registerUser } from "../apis/user";
import { useMutation } from "react-query";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const auth = useAuth();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
    password: "",
    dateOfBirth: "",
  });

  const mutation = useMutation(registerUser, {
    onSuccess: (res) => {
      localStorage.setItem("user", JSON.stringify(res.data.user));
      auth.updateUser(res.data.user);
      navigate("/");
    },
    onError: (err) => {
      setErrorMessage(err.response.data.message);
    },
  });

  const handleSignIn = () => {
    mutation.mutate(userInfo);
  };

  return (
    <Box className="max-w-md mx-auto">
      <Text className="text-2xl font-bold mb-4">Sign In</Text>
      {mutation.isError && (
        <Alert status="error" className="my-2">
          <AlertIcon />
          <AlertTitle>{errorMessage}</AlertTitle>
        </Alert>
      )}
      <FormControl className="mb-2">
        <FormLabel>Username :</FormLabel>
        <Input
          onChange={(e) =>
            setUserInfo({ ...userInfo, [e.target.name]: e.target.value })
          }
          name="username"
          type="text"
          placeholder="John Xell"
        />
      </FormControl>
      <FormControl className="mb-2">
        <FormLabel>Email :</FormLabel>
        <Input
          onChange={(e) =>
            setUserInfo({ ...userInfo, [e.target.name]: e.target.value })
          }
          name="email"
          type="email"
          placeholder="abc@gmail.com"
        />
      </FormControl>
      <FormControl>
        <FormLabel>Password :</FormLabel>
        <Input
          onChange={(e) =>
            setUserInfo({ ...userInfo, [e.target.name]: e.target.value })
          }
          name="password"
          type="password"
          placeholder="********"
        />
      </FormControl>
      <FormControl>
        <FormLabel>Date of birth :</FormLabel>
        <Input
          onChange={(e) =>
            setUserInfo({ ...userInfo, [e.target.name]: e.target.value })
          }
          name="dateOfBirth"
          type="date"
        />
      </FormControl>
      <Button onClick={handleSignIn} className="w-full mt-3">
        Register
      </Button>
    </Box>
  );
}
