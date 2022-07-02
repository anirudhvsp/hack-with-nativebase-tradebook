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
import crypto from "crypto";
import { useToast } from "native-base";
import { getInputProps } from "../util/constants";

export default function Login({ navigation, user, setUser }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  console.log(user);
  if (user) {
    navigation.navigate("Home");
  }
  const handleSubmit = async () => {
    const hashPwd = crypto.createHash("sha1").update(email).digest("hex");
    setLoading(true);
    const { session, error } = await supabase.auth.signUp({
      email: email,
      password: hashPwd,
    });
    if (!error || error.message === "User already registered") {
      console.log(user, session, error);
      await supabase.auth.signIn({
        email: email,
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
    <HStack>
      <Box bg="gray.800" flex={2}>
        <Heading
          position="absolute"
          top="5%"
          left="5%"
          color="white"
          fontSize="32px"
          zIndex={10}
        >
          Tradebook
        </Heading>
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
      <Center h="100vh" bg="white" flex={1}>
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
                  onChange={(e) => setEmail(e.target.value)}
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
                <Text color="white">Login</Text>
              )}
            </Button>
          </FormControl>
        </Box>
      </Center>
    </HStack>
  );
}
