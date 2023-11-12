import { Box, Avatar, Text, Flex, Button, Link } from "@chakra-ui/react";
import { formatTimeDifference } from "../utils/time";
import { TfiComment } from "react-icons/tfi";
import CommentForm from "./CommentForm";
import { BsArrowReturnRight } from "react-icons/bs";
import { useState } from "react";
import { getComments } from "../apis/post";

export default function Comment({ commentProps, parentId, setNumberComment }) {
  const [comments, setComments] = useState([]);
  const [isComment, setIsComment] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const handleGetComments = async () => {
    setLoading(true);
    await getComments({
      commentParentId: parentId,
      postId: commentProps.postId,
    })
      .then((comments) =>
        setComments((prevComments) => [...prevComments, ...comments.data.data])
      )
      .catch((error) => console.log(error));
    setLoading(false);
  };
  return (
    <Box>
      <Flex>
        <Box className="mr-3">
          <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
        </Box>
        <Flex alignItems="center">
          <Text className="font-semibold">{commentProps.userId.username}</Text>
          <Text className="mx-1">·</Text>
          <Text className="text-sm">
            {formatTimeDifference(commentProps.createdAt)}
          </Text>
        </Flex>
      </Flex>
      <Flex>
        <Flex justifyContent="center" className="w-12 my-1 mr-3">
          <Box className="border-2 border-bright-gray h-full w-0"></Box>
        </Flex>
        <Box>
          <Box className="break-all w-[36rem]">{commentProps.content}</Box>
          <Box>
            <Button
              className="!text-philippines-gray !rounded-none"
              background="white"
              onClick={() => setIsComment(!isComment)}
              _hover={{ backgroundColor: "gray.200 !important" }}
              leftIcon={<TfiComment className="text-xl" />}
            >
              <Box className="text-sm">Comments</Box>
            </Button>
          </Box>
          <Box>
            <Link onClick={handleGetComments}>
              <BsArrowReturnRight className="inline-block" /> See more comment
            </Link>
          </Box>
          {isComment && (
            <Box>
              <CommentForm
                parentId={parentId}
                setNumberComment={setNumberComment}
                postId={commentProps.postId}
                setComments={setComments}
              />
            </Box>
          )}
          <Box className="mb-3 mx-4">
            <Box>
              {comments?.map((item, key) => (
                <Comment
                  commentProps={item}
                  key={key}
                  parentId={item._id}
                  setNumberComment={setNumberComment}
                />
              ))}
            </Box>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
}
