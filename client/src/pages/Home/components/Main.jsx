import {
  Avatar,
  Box,
  Input,
  Flex,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import Post from "../../../components/Post";
import { MdKeyboardDoubleArrowUp } from "react-icons/md";
import FormCreatePost from "../../../components/FormCreatePost";
import { getPost } from "../../../apis/post";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "../../../../context/redux/action/postAction";

export default function Main() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const posts = useSelector((state) => state.post.posts);
  const dispatch = useDispatch();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  let skip = 0;
  const limit = 3;
  let total = 0;

  useEffect(() => {
    getPost(skip, limit).then((res) => {
      dispatch(setPost(res.data.data));
      total += skip + limit;
    });

    window.addEventListener(
      "scroll",
      () => {
        const { scrollTop, scrollHeight, clientHeight } =
          document.documentElement;
        if (scrollTop + clientHeight >= scrollHeight - 5) {
          skip = skip + limit;

          getPost(skip, limit).then((res) => dispatch(setPost(res.data.data)));
          total += skip + limit;
        }
      },
      {
        passive: true,
      }
    );
  }, []);

  return (
    <Box>
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
