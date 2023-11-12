import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  Textarea,
  Box,
  Input,
  FormControl,
  FormLabel,
  Text,
  Image,
} from "@chakra-ui/react";
import {
  BsFillFileEarmarkPostFill,
  BsImages,
  BsLink45Deg,
} from "react-icons/bs";
import { useDropzone } from "react-dropzone";
import { useAuth } from "../../context/AuthContext";
import React, { useReducer, useState, useCallback } from "react";
import { TiDeleteOutline } from "react-icons/ti";
import { createPost } from "../apis/post";
import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { addPost } from "../../context/redux/action/postAction";
import spinner from "../assets/svgs/spinner.svg";

const listButton = [
  {
    name: "Post",
    icon: BsFillFileEarmarkPostFill,
    typeDispatch: "POST",
  },
  {
    name: "Image & Video",
    icon: BsImages,
    typeDispatch: "IMAGE_VIDEO",
  },
  {
    name: "Link",
    icon: BsLink45Deg,
    typeDispatch: "LINK",
  },
];

const reducerBtnFunc = (state, action) => {
  switch (action.type) {
    case "POST":
      return { POST_FORM: true, IMAGE_VIDEO_FORM: false, LINK_FORM: false };

    case "IMAGE_VIDEO":
      return { POST_FORM: false, IMAGE_VIDEO_FORM: true, LINK_FORM: false };

    case "LINK":
      return { POST_FORM: false, IMAGE_VIDEO_FORM: false, LINK_FORM: true };

    case "RESET":
      return { POST_FORM: true, IMAGE_VIDEO_FORM: false, LINK_FORM: false };
    default:
      return state;
  }
};

export default function FormCreatePost({ isOpen, onClose }) {
  const [localImage, setLocalImage] = useState("");
  const {
    configAuth: { user },
  } = useAuth();

  const initialStateReducer = {
    POST_FORM: true,
    IMAGE_VIDEO_FORM: false,
    LINK_FORM: false,
  };

  const [post, setPost] = useState({
    content: "",
    image: null,
    userId: user._id,
    number_like: 0,
    number_comment: 0,
    number_share: 0,
  });

  const dispatch1 = useDispatch();

  const [state, dispatch] = useReducer(reducerBtnFunc, initialStateReducer);

  const handleImage = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      const imgUrl = reader.result;
      setLocalImage(imgUrl);
      post.image = file[0];
    };
    reader.readAsDataURL(file[0]);
  };

  const onDrop = useCallback((file) => {
    handleImage(file);
  });

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [".jpeg", ".png"],
    },
    onDrop,
  });

  const mutation = useMutation(createPost, {
    onSuccess: (res) => {
      dispatch1(addPost(res.data.populatedPost));
      setPost({
        content: "",
        image: null,
        userId: user._id,
        number_like: 0,
        number_comment: 0,
        number_share: 0,
      });
      onClose();
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const deleteImage = () => {
    setLocalImage("");
    post.image = null;
  };

  const submitPost = async () => {
    mutation.mutate({
      post,
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size={"xl"}
      className="!border-2 !border-bright-gray"
      isCentered
    >
      <ModalOverlay backdropFilter="blur(6px)" />
      <ModalContent>
        <ModalHeader>
          <Text>Create a post</Text>
        </ModalHeader>
        <ModalBody className="p-0">
          <Box>
            <Box className="flex border-b-2 border-b-bright-gray">
              {listButton.map((item, key) => (
                <Button
                  key={key}
                  borderRadius={0}
                  className={`grow block transition-all rounded-none !bg-white ${
                    listButton.length - 1 !== key
                      ? "!border-r-bright-gray border-r-2"
                      : ""
                  } ${
                    item.name === "Post"
                      ? state.POST_FORM
                        ? "!text-blue-500 border-b-2 !border-b-blue-500"
                        : ""
                      : ""
                  } ${
                    item.name === "Image & Video"
                      ? state.IMAGE_VIDEO_FORM
                        ? "!text-blue-500 border-b-2 !border-b-blue-500"
                        : ""
                      : ""
                  } ${
                    item.name === "Link"
                      ? state.LINK_FORM
                        ? "!text-blue-500 border-b-2 !border-b-blue-500"
                        : ""
                      : ""
                  }
                      `}
                  onClick={() => {
                    dispatch({ type: item.typeDispatch });
                  }}
                >
                  <Box className="mr-2">
                    {React.createElement(item.icon, {
                      className: "text-xl",
                    })}
                  </Box>
                  {item.name}
                </Button>
              ))}
            </Box>
            <Box className="p-3">
              <Box className="border-b-2 border-b-bright-gray pb-2">
                {state.POST_FORM && (
                  <Box>
                    <Textarea
                      name="content"
                      id="content"
                      rows="10"
                      className="w-full px-3 py-1 border-2 border-bright-gray rounded-md"
                      placeholder="Text"
                      onChange={(e) =>
                        setPost((prevState) => ({
                          ...prevState,
                          [e.target.name]: e.target.value,
                        }))
                      }
                    ></Textarea>
                  </Box>
                )}

                {state.IMAGE_VIDEO_FORM && (
                  <Box className="h-80">
                    {!localImage ? (
                      <Box
                        {...getRootProps({
                          className:
                            "dropzone p-3 border-2 border-dashed h-full rounded-md",
                        })}
                      >
                        <Input {...getInputProps()} />
                        <Box className="flex justify-center items-center h-full">
                          <Text>Drag and drop image or</Text>
                          <Box className="ml-2">
                            <FormControl>
                              <FormLabel
                                htmlFor="input-image"
                                className="bg-blue-500 text-white px-5 rounded-full py-2 hover:bg-white hover:border-blue-500 hover:text-blue-500 border-2 border-transparent transition-all"
                              >
                                Upload
                              </FormLabel>
                              <Input type="file" className="hidden" />
                            </FormControl>
                          </Box>
                        </Box>
                      </Box>
                    ) : (
                      <Box className="relative h-full overflow-y-scroll">
                        <Box
                          onClick={deleteImage}
                          className="absolute right-2 bg-bright-gray opacity-60 rounded-full top-2 hover:opacity-100 transition"
                        >
                          <TiDeleteOutline className="text-3xl" />
                        </Box>
                        <Image src={localImage} alt="image" />
                      </Box>
                    )}
                  </Box>
                )}

                {state.LINK_FORM && (
                  <Box>
                    <textarea
                      rows={3}
                      className="resize-none px-3 py-2 w-full border-2 border-bright-gray rounded-md"
                      placeholder="Url"
                    />
                  </Box>
                )}
              </Box>

              <Box className="text-right mt-3">
                <Box>
                  <Box className="text-right">
                    <Button
                      className="rounded-full !bg-blue-500 !text-white"
                      onClick={submitPost}
                      _hover={{ bg: "blue.400" }}
                    >
                      {mutation.isLoading ? (
                        <Image
                          src={spinner}
                          alt="loading"
                          className="h-9 w-9"
                        />
                      ) : (
                        "Post"
                      )}
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
