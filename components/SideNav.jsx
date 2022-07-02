import { Box, Center, Image, Pressable, Text, VStack } from "native-base";
import React from "react";

const navLinks = [
  { label: "Overview", value: "overview" },
  { label: "Notes", value: "notes" },
  { label: "Switch Theme", value: "switch_theme" },
  { label: "Settings", value: "settings" },
  { label: "Logout", value: "logout" },
];

export default function SideNav() {
  return (
    <VStack display={["none", "none", "none", "flex"]} bg="white" w="300px">
      <VStack p="4">
        {navLinks.map((link) => (
          <Pressable
            onPress={() => console.log(link.value)}
            key={link.value}
            borderRadius="5px"
            _hover={{
              bg: "#f8f8f8",
              pl: "16px",
            }}
            p="10px"
          >
            <Text>{link.label}</Text>
          </Pressable>
        ))}
      </VStack>
    </VStack>
  );
}
