import { useAuth } from "../../context/AuthContext";
import { Box, Textarea, Button, Image } from "@chakra-ui/react";
import { useState } from "react";
import { createComment } from "../apis/post";
import { useMutation } from "react-query";
import spinner from "../assets/svgs/spinner.svg";

export default function CommentForm({
  postId,
  setComments,
  parentId,
  setNumberComment,
}) {
  const {
    configAuth: { user },
  } = useAuth();

  const [comment, setComment] = useState({
    content: "",
    userId: user._id,
    postId: postId,
    image: null,
    commentParentId: parentId,
  });

  const mutation = useMutation(createComment, {
    onSuccess: (res) => {
      console.log(res.data.data);
      setComments((prevComment) => [...prevComment, res.data.data]);
      setNumberComment((prevNumberCmt) => prevNumberCmt + 1);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const handleComment = async () => {
    mutation.mutate(comment);
  };

  return (
    <Box>
      <Box className="py-3 px-4">
        <Box className="mb-1">Comment as {user.username}</Box>
        <Box className="border !border-bright-gray rounded-sm">
          <Textarea
            placeholder="What are your thoughts?"
            className="!border-transparent"
            focusBorderColor="transparent"
            name="content"
            onChange={(e) =>
              setComment((prevState) => ({
                ...prevState,
                [e.target.name]: e.target.value,
              }))
            }
          />
          <Box className="text-right bg-gray-100">
            <Box className="py-1.5 px-1">
              <Button
                size="xs"
                onClick={handleComment}
                className={`!text-sm !px-5 font-semibold !rounded-full ${
                  comment.content
                    ? "!bg-blue-600 !text-white"
                    : "!bg-slate-800 !text-bright-gray"
                }`}
                isDisabled={comment.content ? false : true}
              >
                {mutation.isLoading ? (
                  <Image src={spinner} alt="loading" className="h-9 w-9" />
                ) : (
                  "Comment"
                )}
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
