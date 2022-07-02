import { Box, HStack, ScrollView, Text, View } from "native-base";
import Header from "./Header";
import SideNav from "./SideNav";

export default function Layout({ children }) {
  return (
    <Box bg="gray.100" flex={1}>
      <Header />
      <ScrollView flex={1}>
        <HStack flex={1}>
          <SideNav />
          <Box p={["0px", "0px", "0px", "24px"]} flex={1} h="100%" m="auto">
            {children}
          </Box>
        </HStack>
      </ScrollView>
    </Box>
  );
}
