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
  Toast,
} from "native-base";
import { supabase } from "../App";
import crypto from "crypto";
import { useToast } from "native-base";
export default function Login( {navigation, userEmail, setUserEmail} ) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();
  const handleSubmit = async () => {
    const hashPwd   = crypto.createHash('sha1').update(email).digest('hex');
    const { user, session, error } = await supabase.auth.signUp({
      email: email,
      password : hashPwd
    })
    if(!error || error.message === "User already registered"){
      console.log(user, session, error);
      await supabase.auth.signIn({
        email: email
      });
      toast.show({
        title:'Login Link sent to email',
        placement :'bottom',
      });
    }
    else{
      toast.show({
        title:error.message,
        placement :'bottom',
      })
    }
    console.log(supabase.auth.currentUser);
  };
  const handleSignout = async () => {
    await supabase.auth.signOut();
    setUserEmail(null);
    console.log(supabase.auth.currentUser);
  };

  return (
    <Center h="100vh" bg="#e8e8e8">
      <Box p="12px" bg="white" borderRadius="10px" w="600px" h="auto">
        <FormControl>
          <Stack space={5}>
            <Stack>
              <FormControl.Label>Email</FormControl.Label>
              <Input
                variant="underlined"
                p={2}
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Stack>
          </Stack>
          <Button onPress={handleSubmit}>Submit</Button>
          <Button onPress={handleSignout}>Signout</Button>
          {userEmail&&<Text>{JSON.stringify(userEmail.id)}</Text>}
        </FormControl>
      </Box>
    </Center>
  );
}
