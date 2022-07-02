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
} from "native-base";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    console.log(email, password);
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
            <Stack>
              <FormControl.Label>Password</FormControl.Label>
              <Input
                variant="underlined"
                p={2}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Stack>
          </Stack>
          <Button onPress={handleSubmit}>Submit</Button>
        </FormControl>
      </Box>
    </Center>
  );
}
