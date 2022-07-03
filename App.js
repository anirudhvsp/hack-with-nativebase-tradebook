import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./page/Login";
import { extendTheme, NativeBaseProvider, Text, View } from "native-base";

import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

export const supabase = createClient(
  "https://fmhtsxxwaltvlzhwanql.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZtaHRzeHh3YWx0dmx6aHdhbnFsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTY3NDYyNDEsImV4cCI6MTk3MjMyMjI0MX0.wo8w2WZX4Te-M1TqI5_pdM-7XXwU_hg3f5UBz4XwJFw"
);

import Home from "./components/Home";

const Stack = createNativeStackNavigator();

function App() {
  const [user, setUser] = useState(null);
  supabase.auth.onAuthStateChange((event, session) => {
    if (!user) {
      setUser(supabase.auth.currentUser);
    }
  });

  const theme = extendTheme({
    components: {
      Select: {
        variants: {
          outline: ({}) => {
            return {
              _hover: {
                borderColor: "gray.400",
              },
              _focus: {
                borderColor: "gray.600",
                bg: "transparent",
                _hover: { borderColor: "gray.600" },
                _stack: {
                  style: {
                    outlineColor: "gray.700",
                  },
                },
              },
            };
          },
        },
      },
    },
  });

  return (
    <NativeBaseProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerShown: false,
          }}
        >
          {!user ? (
            <Stack.Screen
              component={Login}
              name="Login"
              initialParams={{
                user,
                setUser,
              }}
            ></Stack.Screen>
          ) : (
            <Stack.Screen name="Home">
              {(props) => <Home {...props} user={user} setUser={setUser} />}
            </Stack.Screen>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

export default App;
