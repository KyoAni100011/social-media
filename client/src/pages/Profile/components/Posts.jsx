import {
  Avatar,
  Box,
  Input,
  Flex,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { MdKeyboardDoubleArrowUp } from "react-icons/md";
import FormCreatePost from "../../../components/FormCreatePost";
import { useEffect } from "react";
import { getRelatedPosts } from "../../../apis/post";
import { useState } from "react";
import Post from "../../../components/Post";
import { useSelector } from "react-redux";

export default function Posts({ userId }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [posts, setPosts] = useState([]);
  const listPosts = useSelector((state) => state.post.posts);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const a = listPosts.filter((post) => post.userId._id === userId);
    if (!a.length) {
      getRelatedPosts(userId)
        .then((res) => {
          setPosts(res.data.data);
        })
        .catch((err) => console.log(err));
    } else {
      setPosts(a);
    }
  }, []);

  useEffect(() => {
    const a = listPosts.filter((post) => post.userId._id === userId);
    setPosts(a);
  }, [listPosts]);

  return (
    <Box className="max-w-2xl mx-auto ">
      <Box>
        <Box className="bg-white border-2 border-bright-gray mb-4">
          <Flex alignItems="center" className="p-2">
            <Box className="mr-2">
              <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
            </Box>
            <Box className="grow">
              <Input
                type="text"
                placeholder="Create Post"
                readOnly
                className="cursor-pointer !bg-bright-gray"
                onClick={onOpen}
              />
            </Box>
          </Flex>
        </Box>
        <FormCreatePost isOpen={isOpen} onClose={onClose} />
        <Box>
          {posts?.map((item, key) => (
            <Post key={key} postProps={item} />
          ))}
        </Box>
      </Box>
      <Box className="fixed bottom-2 right-12">
        <Button
          onClick={scrollToTop}
          rightIcon={<MdKeyboardDoubleArrowUp className="text-xl" />}
          className="!bg-blue-500 !rounded-full !text-white font-bold"
        >
          Back to Top
        </Button>
      </Box>
    </Box>
  );
}
