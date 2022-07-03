import {
  AddIcon,
  Box,
  Button,
  Center,
  Fab,
  Image,
  Pressable,
  Text,
  VStack,
} from "native-base";
import React, { useState } from "react";
import { supabase } from "../App";
import AddTradeModal from "./AddTradeModal";
import AddCapitalModal from "./AddCapitalModal";

const navLinks = [
  { label: "Overview", value: "overview" },
  { label: "Notes", value: "notes" },
  { label: "Switch Theme", value: "switch_theme" },
  { label: "Settings", value: "settings" },
];

export default function SideNav({
  user,
  setUpdateList,
  updateList,
  setUser,
  navigation,
  showNav,
  setShowModal,
}) {
  const handleSignout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    navigation.navigate("Login");
  };

  const d = showNav ? "flex" : "none";

  return (
    <VStack
      position={["absolute", "absolute", "absolute", "relative"]}
      display={[d, d, d, "flex"]}
      bg="white"
      w={["100%", "100%", "100%", "300px"]}
      flex={["1", "1", "1", "initial"]}
      h="full"
      zIndex={10}
    >
      <Button
        onPress={() => {
          setShowModal(true);
        }}
        display={["none", "none", "none", "flex"]}
        borderRadius={["100px", "100px", "100px", "5px"]}
        w={["45px", "45px", "45px", "85%"]}
        h={["45px", "45px", "45px", "auto"]}
        zIndex={10}
        alignItems="center"
        bg="gray.800"
        mx="auto"
        mt="24px"
        justifyContent="center"
        p="8px"
        _hover={{
          bg: "black",
        }}
      >
        <Text
          display={["none", "none", "none", "flex"]}
          color="white"
          fontSize="16px"
        >
          {user.user_metadata.capital ? "Add Trade" : "Update Capital"}
        </Text>
        <AddIcon display={["flex", "flex", "flex", "none"]} color="white" />
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
      {user.user_metadata.capital ? (
        <AddTradeModal
          show={show}
          setShowModal={setShowModal}
          user={user}
          setUpdateList={setUpdateList}
          updateList={updateList}
        />
      ) : (
        <AddCapitalModal
          show={show}
          setShowModal={setShowModal}
          user={user}
          setUpdateList={setUpdateList}
          updateList={updateList}
        />
      )}
    </VStack>
  );
}
