import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./page/Login";
import { NativeBaseProvider, Text, View } from "native-base";
require('dotenv').config({path:'__dirname'+'/.env'});
import { createClient } from '@supabase/supabase-js'
import { useEffect,useState } from "react";
export const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
)

const Stack = createNativeStackNavigator();



function App() {
  
  const [user, setUser] = useState(null);
  // useEffect(async () => {
    
  // }, [supabase]);
  supabase.auth.onAuthStateChange((event, session) => {
    if(!user){
      setUser(supabase.auth.currentUser);
    }
  })
  
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Login">
            {props => <Login {...props} userEmail={user} setUserEmail= {setUser}/>}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

export default App;
