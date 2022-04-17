import { React, useState } from "react";
import { Link, NavLink } from "react-router-dom";

import { Box, Text, Flex, Avatar } from "@chakra-ui/react";

const ProfileMenu = () => {
  return (
    <div
      style={{
        position: "absolute",
        right: "1px",
        top: "54px",
        height: "100px",
        width: "160px",
        display: "flex",
        flexDirection: "column",
        outline: "1px solid #6B46C1",
        color: "#6B46C1",
      }}
    >
      <Link to="/settings">
        <Box
          backgroundColor="white"
          borderBottom="1px solid #6B46C1"
          display="flex"
          justifyContent="center"
          fontSize="20px"
          lineHeight="50px"
          height="50px"
        >
          Settings
        </Box>
      </Link>
      <Box
        backgroundColor="white"
        outline="1px solid #6B46C1"
        display="flex"
        justifyContent="center"
        fontSize="20px"
        lineHeight="50px"
        height="50px"
      >
        Log Out
      </Box>
    </div>
  );
};

const Navbar = () => {
  const [open, setOpen] = useState(false);
  return (
    <Flex
      height="54px"
      justifyContent="flex-start"
      backgroundColor="#6B46C1"
      color="#FFFFFF"
    >
      <Link to="/">
        <Text
          fontSize="28px"
          lineHeight="50px"
          paddingLeft="10px"
          fontWeight="bold"
          marginRight="50px"
          _hover={{
            transition: "0.2s ease",
            textShadow: "-3px 4px rgba(255,255,255,0.2)",
          }}
        >
          FitLinks
        </Text>
      </Link>
      <NavLink to="/meet">
        <Text
          fontSize="24px"
          lineHeight="50px"
          marginLeft="20px"
          marginRight="35px"
          _hover={{
            transition: "0.2s ease",
            textShadow: "-3px 4px rgba(255,255,255,0.2)",
          }}
        >
          Meet
        </Text>
      </NavLink>
      <NavLink to="/matches">
        <Text
          fontSize="24px"
          lineHeight="50px"
          marginLeft="35px"
          marginRight="35px"
          _hover={{
            transition: "0.2s ease",
            textShadow: "-3px 4px rgba(255,255,255,0.3)",
          }}
        >
          Matches
        </Text>
      </NavLink>
      <NavLink to="/workouts">
        <Text
          fontSize="24px"
          lineHeight="50px"
          marginLeft="35px"
          marginRight="35px"
          _hover={{
            transition: "0.2s ease",
            textShadow: "-3px 4px rgba(255,255,255,0.3)",
          }}
        >
          Workouts
        </Text>
      </NavLink>
      <Avatar
        style={{
          height: "36px",
          width: "36px",
          position: "absolute",
          right: "18px",
          top: "9px",
          borderRadius: "50%",
          cursor: "pointer",
        }}
        aria-hidden="true"
        onClick={() => setOpen(!open)}
      />
      {open && <ProfileMenu />}
    </Flex>
  );
};

export default Navbar;
