import React from "react";
import {
  Image,
  HStack,
  Heading,
  Box,
  Button,
  Icon,
  HamburgerIcon,
  Pressable,
  CloseIcon,
} from "native-base";

export default function Header({ setShowNav, showNav, user }) {
  return (
    <HStack
      bg="white"
      p="20px 35px"
      borderBottomWidth="1px"
      borderColor="#E5E7EB"
      justifyContent="space-between"
    >
      <HStack alignItems="center" space="12px">
        <Pressable
          display={["flex", "flex", "flex", "none"]}
          onPress={() => setShowNav(!showNav)}
        >
          {!showNav ? <HamburgerIcon size="5" /> : <CloseIcon size="5" />}
        </Pressable>

        <Heading fontSize="24px">Tradebook</Heading>
      </HStack>
      <HStack alignItems="center" space="16px">
        <Box w={35} h={35} borderRadius={40}>
          <Image
            size="full"
            height="full"
            alt="Avataar"
            source={{
              uri: `https://avatars.dicebear.com/api/male/${
                user.email.split("@")[0]
              }.svg`,
            }}
            fallbackSource={{
              uri: "https://www.tradingview.com/x/KGZZA0Xx/",
            }}
          />
        </Box>
      </HStack>
    </HStack>
  );
}
// https://avatars.dicebear.com/api/:sprites/:seed.svg
