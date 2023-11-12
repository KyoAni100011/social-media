import {
  Box,
  Image,
  Avatar,
  Text,
  Flex,
  List,
  ListItem,
  ListIcon,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";

import { TiTickOutline } from "react-icons/ti";
import { useAuth } from "../../../context/AuthContext";
import Information from "./components/Information";
import { useState } from "react";
import { formatDate } from "../../utils/time";

import Posts from "./components/Posts";
import { updateUser } from "../../apis/user";

export default function Profile() {
  const {
    configAuth: { user },
  } = useAuth();
  const auth = useAuth();

  const toast = useToast();

  const [userChange, setUserChange] = useState({
    _id: user._id,
    username: user.username,
    email: user.email,
    dateOfBirth: user.dateOfBirth,
  });

  const handleChangeInformation = async () => {
    if (
      userChange.username !== user.username ||
      userChange.email !== user.email ||
      userChange.dateOfBirth !== user.dateOfBirth
    ) {
      const response = await updateUser(userChange);
      auth.updateUser(response.data.user);
    }
    toast({
      title: "Update successfully.",
      description: "We've updated your account.",
      status: "success",
      duration: 7000,
      position: "bottom",
      isClosable: true,
    });
  };

  const handleOnChange = (e) => {
    setUserChange((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box className="max-w-screen-lg mx-auto">
      <Box className="border-2 border-bright-gray pb-5 rounded-b-3xl mb-3">
        <Box>
          <Image
            src="https://gstatic.gvn360.com/2023/08/Yen-binh_-8.jpg"
            alt="bg"
          />
        </Box>
        <Box>
          <Flex className="mx-12">
            <Box className="-mt-12">
              <Box className="inline-block">
                <Avatar
                  name="Dan Abrahmov"
                  size="2xl"
                  className="p-1 !bg-white"
                  src="https://bit.ly/dan-abramov"
                />
              </Box>
            </Box>
            <Box className="mt-5 ml-4">
              <Text className="font-bold text-3xl">{user.username}</Text>
            </Box>
          </Flex>
        </Box>
      </Box>
      <Flex>
        <Box>
          <Box className="border-2 border-bright-grays rounded-xl p-4">
            <List spacing={3}>
              {Object.keys(user).map((keyName, keyIndex) => {
                if (keyName === "dateOfBirth")
                  return (
                    <ListItem>
                      <ListIcon as={TiTickOutline} color="green.500" />
                      <Information
                        content={formatDate(user[keyName])}
                        key={keyIndex}
                      />
                    </ListItem>
                  );
                else if (keyName !== "_id")
                  return (
                    <ListItem>
                      <ListIcon as={TiTickOutline} color="green.500" />
                      <Information content={user[keyName]} key={keyIndex} />
                    </ListItem>
                  );
              })}
            </List>
            <Box className="mt-3" onClick={onOpen}>
              <Button className="w-full">Modify your profile</Button>
            </Box>
            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Modal Title</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <FormControl>
                    <FormLabel>Username</FormLabel>
                    <Input
                      type="text"
                      name="username"
                      onChange={handleOnChange}
                      defaultValue={user.username}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Email address</FormLabel>
                    <Input
                      type="email"
                      name="email"
                      onChange={handleOnChange}
                      defaultValue={user.email}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Date of birth</FormLabel>
                    <Input
                      type="date"
                      onChange={handleOnChange}
                      name="dateOfBirth"
                    />
                  </FormControl>
                </ModalBody>
                <ModalFooter>
                  <Button colorScheme="blue" mr={3} onClick={onClose}>
                    Close
                  </Button>
                  <Button variant="ghost" onClick={handleChangeInformation}>
                    Save changes
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </Box>
        </Box>
        <Box className="grow">
          <Posts userId={user._id} />
        </Box>
      </Flex>
    </Box>
  );
}
