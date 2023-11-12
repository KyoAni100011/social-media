import { Box, Flex, Image } from "@chakra-ui/react";
import { BiHomeAlt2, BiLogOut } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { IoNotificationsOutline } from "react-icons/io5";
import { FiHelpCircle } from "react-icons/fi";
import { BsChat } from "react-icons/bs";
import { FaRedditAlien } from "react-icons/fa";
import React from "react";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { logOutUser } from "../apis/user";

const listBtn = [
  {
    name: "Home",
    icon: BiHomeAlt2,
    link: "/",
  },
  {
    name: "Profile",
    icon: CgProfile,
    link: "/profile",
  },
  {
    name: "Chat",
    icon: BsChat,
    link: "/chat",
  },
  {
    name: "Notifications",
    icon: IoNotificationsOutline,
    link: "/notifications",
  },
];

export default function Sidebar() {
  const auth = useAuth();
  const navigate = useNavigate();

  const logOut = () => {
    auth.updateUser(null);
    logOutUser();
    navigate("/login");
  };

  return (
    <Box className="border-r-2 border-bright-gray fixed top-0 bottom-0">
      <Flex
        justifyContent={"space-between"}
        flexDirection={"column"}
        className="p-2 h-full"
      >
        <Flex flexDirection={"column"}>
          <Box className="p-2">
            <Box className="p-3 bg-red-orange text-white rounded-full">
              <FaRedditAlien className="text-2xl" />
            </Box>
          </Box>
          {listBtn.map((item, key) => (
            <Link key={key} to={item.link} state={{ name: item.name }}>
              <Box className="p-5 hover:bg-slate-200 transition rounded-md">
                {React.createElement(item.icon, {
                  className: "text-2xl",
                })}
              </Box>
            </Link>
          ))}
        </Flex>
        <Flex flexDirection={"column"}>
          <Box className="p-5 hover:bg-slate-200 transition rounded-md">
            <FiHelpCircle className="text-2xl" />
          </Box>
          <Box
            onClick={logOut}
            className="p-5 text-red-500 hover:bg-slate-200 transition rounded-md"
          >
            <BiLogOut className="text-2xl" />
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
}
