import {
  Box,
  Button,
  Center,
  Image,
  Pressable,
  Text,
  VStack,
} from "native-base";
import React, { useState } from "react";
import { supabase } from "../App";
import AddTradeModal from "./AddTradeModal";

const navLinks = [
  { label: "Overview", value: "overview" },
  { label: "Notes", value: "notes" },
  { label: "Switch Theme", value: "switch_theme" },
  { label: "Settings", value: "settings" },
];

export default function SideNav({ setUser }) {
  const [show, setShowModal] = useState(false);

  const handleSignout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <VStack display={["none", "none", "none", "flex"]} bg="white" w="300px">
      <Button
        onPress={() => {
          setShowModal(true);
        }}
        borderRadius="5px"
        alignItems="center"
        bg="gray.800"
        w="85%"
        mx="auto"
        mt="24px"
        justifyContent="center"
        p="8px"
        _hover={{
          bg: "black",
        }}
      >
        <Text color="white" fontSize="16px">
          Add Trade
        </Text>
      </Button>
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
        <Pressable
          onPress={handleSignout}
          borderRadius="5px"
          _hover={{
            bg: "#f8f8f8",
            pl: "16px",
          }}
          p="10px"
        >
          <Text>Logout</Text>
        </Pressable>
      </VStack>
      <AddTradeModal show={show} setShowModal={setShowModal} />
    </VStack>
  );
}
