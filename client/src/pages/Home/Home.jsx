import Main from "./components/Main";
import { Box } from "@chakra-ui/react";
import Pusher from "pusher-js";
import { useToast } from "@chakra-ui/react";

export default function Home() {
  const toast = useToast();
  var pusher = new Pusher("2353c90e8a6517b9486c", {
    cluster: "ap1",
  });

  var channel = pusher.subscribe("create-post");
  channel.bind("send-notification-new-post", function (data) {
    toast({
      title: data.message,
      position: "top-left",
      isClosable: true,
    });
  });
  return (
    <Box className="max-w-2xl mx-auto mt-20">
      <Main />
    </Box>
  );
}
