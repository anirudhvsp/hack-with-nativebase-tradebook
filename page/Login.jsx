import React, { useState } from "react";
import {
  View,
  Box,
  HStack,
  ScrollView,
  Text,
  Center,
  Input,
  Stack,
  FormControl,
  Button,
  Spinner,
  Heading,
  Image,
} from "native-base";
import { supabase } from "../App";
import { useToast } from "native-base";
import { getInputProps } from "../util/constants";
import { useNavigation } from "@react-navigation/native";

export default function Login({ route }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const { user, setUser } = route.params;

  const navigation = useNavigation();

  const toast = useToast();
  if (user) {
    navigation.navigate("Home");
    console.log("navi");
  }

  const handleSubmit = async () => {
    setLoading(true);
    const { session, error } = await supabase.auth.signUp({
      email: email,
      password: email.split("@")[0],
    });
    if (!error || error.message === "User already registered") {
      console.log(user, session, error);
      await supabase.auth.signIn({
        email,
      });
      toast.show({
        title: "Login Link sent to email",
        placement: "bottom",
      });
      setLoading(false);
    } else {
      toast.show({
        title: error.message,
        placement: "bottom",
      });
      setLoading(false);
    }
    console.log(supabase.auth.currentUser);
  };
  return (
    <HStack flex={1}>
      <Heading
        position="absolute"
        top="5%"
        left="5%"
        color={["black", "black", "black", "white"]}
        fontSize="32px"
        zIndex={10}
      >
        Tradebook
      </Heading>
      <Box display={["none", "none", "none", "flex"]} bg="gray.800" flex={2}>
        <Image
          size="full"
          alt="fallback text"
          source={{
            uri: "https://i.ibb.co/fYGH9Tq/login.png",
          }}
          fallbackSource={{
            uri: "https://www.tradingview.com/x/KGZZA0Xx/",
          }}
        />
      </Box>
      <Center h="100%" bg="white" flex={1}>
        <Box p="12px" borderRadius="6px" w="350px" h="auto">
          <Heading>Login</Heading>
          <FormControl mt="5">
            <Stack space={5}>
              <Stack>
                <FormControl.Label opacity="0">Email</FormControl.Label>
                <Input
                  {...getInputProps}
                  p={2}
                  size="lg"
                  variant="underlined"
                  placeholder="Email"
                  value={email}
                  onChangeText={(e) => {
                    setEmail(e);
                  }}
                />
              </Stack>
            </Stack>
            <Button
              mt="5"
              bg="black"
              _hover={{
                bg: "gray.700",
              }}
              onPress={handleSubmit}
            >
              {loading ? (
                <Spinner color="white" />
              ) : (
                <Text fontSize="16px" color="white">
                  Login
                </Text>
              )}
            </Button>
          </FormControl>
          {user ? user.id : "not here"}
        </Box>
      </Center>
    </HStack>
  );
}
