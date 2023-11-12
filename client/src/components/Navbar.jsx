import { Box, Text } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";

export default function Navbar() {
  const { state } = useLocation();
  return (
    <Box className="border-b-2 px-5 py-3 border-bright-gray fixed top-0 right-0 left-20 border-l-2 bg-white z-10">
      <Box>
        <Text className="text-xl font-semibold">
          {state?.name ? state.name : "Home"}
        </Text>
      </Box>
    </Box>
  );
}
