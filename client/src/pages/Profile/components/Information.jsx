import { Box, Text } from "@chakra-ui/react";

export default function Information({ content }) {
  return (
    <Box className="inline-block">
      <Text>{content}</Text>
    </Box>
  );
}
