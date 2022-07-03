import {
  AddIcon,
  Box,
  Button,
  HStack,
  ScrollView,
  Text,
  View,
} from "native-base";
import Header from "./Header";
import SideNav from "./SideNav";
import { useState } from "react";
import AddTradeModal from "./AddTradeModal";

export default function Layout({
  children,
  user,
  setUpdateList,
  updateList,
  setUser,
  navigation,
}) {
  const [showNav, setShowNav] = useState(false);
  const [show, setShowModal] = useState(false);

  return (
    <Box bg="gray.100" flex={1}>
      <Header user={user} showNav={showNav} setShowNav={setShowNav} />
      <HStack flex={1}>
        <SideNav
          showNav={showNav}
          setUser={setUser}
          user={user}
          show={show}
          setUpdateList={setUpdateList}
          updateList={updateList}
          navigation={navigation}
          setShowModal={setShowModal}
        />
        <Box p="24px" flex={1} h="100%" m="auto">
          {children}
        </Box>
      </HStack>

      <Button
        onPress={() => {
          setShowModal(true);
        }}
        display={["flex", "flex", "flex", "none"]}
        position={["fixed", "fixed", "fixed", "none"]}
        bottom={["5%", "5%", "5%", "initial"]}
        right={["5%", "5%", "5%", "initial"]}
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
          Add Trade
        </Text>
        <AddIcon display={["flex", "flex", "flex", "none"]} color="white" />
      </Button>
    </Box>
  );
}
