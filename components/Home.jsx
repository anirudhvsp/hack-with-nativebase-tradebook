import { ScrollView, Text, View, VStack } from "native-base";
import Layout from "./Layout";
import TradeDetails from "./TradeDetails";

export default function Home() {
  return (
    <Layout>
      <ScrollView>
        <VStack space="20px">
          {[1, 2, 3, 4, 5].map((each) => (
            <TradeDetails key={each} />
          ))}
        </VStack>
      </ScrollView>
    </Layout>
  );
}
