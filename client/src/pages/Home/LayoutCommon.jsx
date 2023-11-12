import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { Box } from "@chakra-ui/react";

export default function LayoutCommon() {
  return (
    <Box>
      <Sidebar />
      <Box className="ml-20">
        <Navbar />
        <Outlet />
      </Box>
    </Box>
  );
}
