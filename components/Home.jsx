import { FlatList, ScrollView, Text, View, VStack, Box } from "native-base";
import Layout from "./Layout";
import TradeDetails from "./TradeDetails";
import { supabase } from "../App";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

export default function Home({ route }) {
  const [trades, setTrades] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updateList, setUpdateList] = useState(false);

  const { user, setUser } = route.params;
  const navigation = useNavigation();

  useEffect(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("trades")
      .select()
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });
    setTrades(data);
    setLoading(false);
  }, [updateList]);

  return (
    <Layout
      user={user}
      navigation={navigation}
      setUpdateList={setUpdateList}
      setUser={setUser}
      updateList={updateList}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        flex={1}
        showsVerticalScrollIndicator={false}
      >
        <FlatList
          data={trades}
          renderItem={({ item }) => <TradeDetails trade={item} />}
          ItemSeparatorComponent={() => <Box h="4" />}
          keyExtractor={(_, index) => index + ""}
        />
      </ScrollView>
    </Layout>
  );
}
