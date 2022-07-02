import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./page/Login";
import { extendTheme, NativeBaseProvider, Text, View } from "native-base";

require("dotenv").config();
import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

export const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
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
      Input: {
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
          initialRouteName= "Login"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Login">
            {props => <Login {...props} user={user} setUser= {setUser}/>}
          </Stack.Screen>
          <Stack.Screen name="Home">
            {props => <Home {...props} user={user}/>}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

export default App;
