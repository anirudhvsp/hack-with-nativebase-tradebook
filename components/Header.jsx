import React from "react";
import { Image, HStack, Heading, Box } from "native-base";

export default function Header() {
  return (
    <HStack
      display={["none", "none", "none", "flex"]}
      bg="white"
      p="20px 35px"
      borderBottomWidth="1px"
      borderColor="#E5E7EB"
      justifyContent="space-between"
    >
      <HStack alignItems="center" space="12px">
        <Heading fontSize="24px">Tradebook</Heading>
      </HStack>
      <HStack alignItems="center" space="16px">
        <Box bg="black" w={35} h={35} borderRadius={40}></Box>
      </HStack>
    </HStack>
  );
}
