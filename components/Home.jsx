import { ScrollView, Text, View, VStack } from "native-base";
import Layout from "./Layout";
import TradeDetails from "./TradeDetails";
import { supabase } from "../App";
import { useEffect, useState } from "react";

export default function Home({ navigation, user, setUser }) {
  const [trades, setTrades] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("trades")
      .select()
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });
    setTrades(data);
    setLoading(false);
  }, []);

  return (
    <Layout setUser={setUser}>
      <VStack space="20px">
        {trades.map((each) => (
          <TradeDetails key={each} trade={each} />
        ))}
      </VStack>
    </Layout>
  );
}
