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
} from "native-base";
import { supabase } from "../App";
import crypto from "crypto";
import { useToast } from "native-base";
export default function Login( {navigation, user, setUser} ) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  console.log(user)
    if(user){
      navigation.navigate("Home");
    }
  const handleSubmit = async () => {
    const hashPwd = crypto.createHash("sha1").update(email).digest("hex");
    setLoading(true);
    const { user1, session, error } = await supabase.auth.signUp({
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
  const handleSignout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    console.log(supabase.auth.currentUser);
  };



  return (
    <HStack>
      <Box bg="gray.800" flex={2}></Box>
      <Center h="100vh" bg="white" flex={1}>
        <Box p="12px" borderRadius="6px" w="350px" h="auto">
          <Heading>Login</Heading>
          <FormControl mt="5">
            <Stack space={5}>
              <Stack>
                <FormControl.Label>Email</FormControl.Label>
                <Input
                  p={2}
                  size="lg"
                  variant="outline"
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
                <Text color="white">Submit</Text>
              )}
            </Button>
          </FormControl>
        </Box>
      </Center>
    </HStack>
  );
}
