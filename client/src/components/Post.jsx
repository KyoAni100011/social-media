import {
  Avatar,
  Box,
  Button,
  Flex,
  Image,
  Text,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  Stack,
  Link,
} from "@chakra-ui/react";
import { TfiComment } from "react-icons/tfi";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { AiTwotoneDelete } from "react-icons/ai";
import { LiaShareSolid } from "react-icons/lia";
import React, { useState, useEffect } from "react";
import { formatTimeDifference } from "../utils/time";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import Comment from "./Comment";
import {
  createLike,
  deletePost,
  getLike,
  deleteLike,
  getComments,
} from "../apis/post";
import { removePost } from "../../context/redux/action/postAction";
import { useDispatch } from "react-redux";
import { useMutation } from "react-query";
import spinner from "../assets/svgs/spinner.svg";
import CommentForm from "./CommentForm";
import { useAuth } from "../../context/AuthContext";

export default function Post({ postProps }) {
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);
  const mutation = useMutation(deletePost, {
    onSuccess: () => {
      dispatch(removePost(postProps._id));
    },
    onError: (error) => console.log(error),
  });

  const handleGetComments = async () => {
    setLoading(true);
    await getComments({
      commentParentId: null,
      postId: postProps._id,
    })
      .then((comments) =>
        setComments((prevComments) => [...prevComments, ...comments.data.data])
      )
      .catch((error) => console.log(error));
    setLoading(false);
  };

  const {
    configAuth: { user },
  } = useAuth();

  const handleDeletePost = async () => {
    mutation.mutate({
      id: postProps._id,
      public_id: postProps.image?.public_id ? postProps.image.public_id : null,
    });
  };

  const [like, setLike] = useState(null);
  const [isLike, setIsLike] = useState(false);
  const [numberLike, setNumberLike] = useState(postProps.number_like);
  const [numberComment, setNumberComment] = useState(postProps.number_comment);
  const [comments, setComments] = useState([]);

  const handleLike = async () => {
    if (!isLike) {
      setIsLike(!isLike);
      setNumberLike((prevLike) => prevLike + 1);
      await createLike({
        userId: user._id,
        postId: postProps._id,
      }).then((res) => setLike(res.data.data));
    } else {
      setIsLike(!isLike);
      setNumberLike((prevLike) => prevLike - 1);
      await deleteLike({ id: like._id, postId: postProps._id });
    }
  };

  useEffect(() => {
    getLike({
      postId: postProps._id,
      userId: user._id,
    })
      .then((res) => {
        setLike(res.data.data);
        if (res.data.data) setIsLike(true);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Box className="border-2 border-bright-gray mb-4">
      <Box className="p-3">
        <Flex justifyContent="space-between">
          <Flex>
            <Box className="mr-3">
              <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
            </Box>
            <Box>
              <Box>
                <Text className="font-semibold">
                  {postProps.userId.username}
                </Text>
              </Box>
              <Box>
                <Text className="text-sm text-philippines-gray">
                  {formatTimeDifference(postProps.createdAt)}
                </Text>
              </Box>
            </Box>
          </Flex>
          <Box>
            <Popover>
              <PopoverTrigger>
                <Button>
                  <BsThreeDots />
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <PopoverArrow />
                <PopoverBody>
                  <Stack>
                    <Button
                      className="!bg-red-500 !text-white"
                      onClick={handleDeletePost}
                      _hover={{
                        background: "white !important",
                        border: "1px",
                        borderColor: "red.500",
                        color: " red.500 !important",
                      }}
                    >
                      {mutation.isLoading ? (
                        <Image
                          src={spinner}
                          alt="loading"
                          className="h-9 w-9"
                        />
                      ) : (
                        <React.Fragment>
                          <AiTwotoneDelete /> Delete Post
                        </React.Fragment>
                      )}
                    </Button>
                  </Stack>
                </PopoverBody>
              </PopoverContent>
            </Popover>
          </Box>
        </Flex>
      </Box>

      <Box className="p-3">
        <Text className="font-semibold">{postProps.content}</Text>
      </Box>

      {postProps.image && (
        <Box className="overflow-hidden text-center">
          <Box className={`bg-[url('${postProps.image.url}')]`}>
            <Box className="backdrop-blur-xl">
              <LazyLoadImage
                src={postProps.image.url}
                effect="blur"
                alt="Image Alt"
              />
            </Box>
          </Box>
        </Box>
      )}

      <Box className="mt-3">
        <Flex className="pb-0.5 pl-0.5">
          <Box>
            <Button
              className="!text-philippines-gray !rounded-none"
              background="white"
              _hover={{ backgroundColor: "gray.200 !important" }}
              leftIcon={<TfiComment className="text-xl" />}
            >
              <Box className="text-sm">
                <Text className="inline-block">{numberComment}</Text> Comments
              </Box>
            </Button>
          </Box>

          <Box>
            <Button
              onClick={handleLike}
              className={`!text-philippines-gray !rounded-none ${
                isLike ? "!text-pink-500" : "!text-philippines-gray"
              }`}
              background="white"
              _hover={{ backgroundColor: "gray.200 !important" }}
              leftIcon={
                isLike ? (
                  <FaHeart className="text-xl" />
                ) : (
                  <FaRegHeart className="text-xl" />
                )
              }
            >
              <Box className="text-sm">
                <Text className="inline-block">{numberLike}</Text> Like
              </Box>
            </Button>
          </Box>

          <Box>
            <Button
              className="!text-philippines-gray !rounded-none"
              background="white"
              _hover={{ backgroundColor: "gray.200 !important" }}
              leftIcon={<LiaShareSolid className="text-xl" />}
            >
              <Box className="text-sm">
                <Text className="inline-block">8</Text> Share
              </Box>
            </Button>
          </Box>
        </Flex>
      </Box>
      <CommentForm
        postId={postProps._id}
        setComments={setComments}
        parentId={null}
        setNumberComment={setNumberComment}
      />
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
      <Box className="mb-3 mx-4">
        <Link onClick={handleGetComments}>See more comments</Link>
      </Box>
    </Box>
  );
}
