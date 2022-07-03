import React, { useState } from "react";
import {
  Box,
  Button,
  HStack,
  Image,
  Stack,
  Text,
  View,
  VStack,
} from "native-base";

import TradingViewWidget from "react-tradingview-widget";

export default function TradeDetails({ trade }) {
  const [showChart, setShowChart] = useState(false);
  const date = new Date(trade.created_at).toLocaleString("en-us", {
    dateStyle: "medium",
  });

  const profitColor = trade.profit > 0 ? "green.700" : "red.700";

  const tradeDetails = [
    { label: "Reward / Risk", value: (trade.profit / trade.risk).toFixed(2) },
    { label: "Net Gain", value: trade.gain_percentage + "%" },
    { label: "Timeframe", value: trade.timeframe },
    { label: "Strategy", value: trade.stratergy },
  ];

  return (
    <View
      bg="white"
      borderRadius="5px"
      borderWidth="1px"
      borderColor="#e8e8e8"
      overflow="hidden"
    >
      <HStack
        px="12px"
        py="4px"
        bg="#fafafa"
        borderBottomColor="#e8e8e8"
        borderBottomWidth="1px"
        justifyContent="space-between"
        alignItems="center"
      >
        <HStack space="16px">
          <Text fontSize="20px" fontWeight="600">
            {trade.ticker}
          </Text>
          <Text color={profitColor} fontSize="20px" fontWeight="600">
            ₹ {Math.abs(trade.profit)}
          </Text>
        </HStack>
        <HStack alignItems="center" space="16px">
          <Button
            variant="ghost"
            onPress={() => setShowChart(!showChart)}
            _text={{
              fontSize: "14px",
              fontWeight: "600",
              color: "gray.500",
            }}
          >
            {showChart ? "Hide Chart" : "View Chart"}
          </Button>
          <Text fontSize="16px" fontWeight="600" color="gray.500">
            {date}
          </Text>
        </HStack>
      </HStack>
      <Stack
        flexDirection={["column", "column", "column", "row"]}
        px="16px"
        py="12px"
        space="32px"
      >
        <Image
          size={["full", "full", "full", "220px"]}
          height={["180px", "180px", "180px", "120px"]}
          alt="fallback text"
          borderRadius="3px"
          source={{
            uri: trade.image_url,
          }}
          fallbackSource={{
            uri: "https://www.tradingview.com/x/KGZZA0Xx/",
          }}
        />
        <VStack flex={1} space="12px">
          <HStack space="10%" flex={1} flexWrap="wrap">
            {tradeDetails.map((each, idx) => (
              <Box key={idx + 1}>
                <Text
                  fontSize={["18px", "18px", "18px", "20px"]}
                  fontWeight="500"
                  color="#8a8a8a"
                >
                  {each.label}
                </Text>
                <Text fontSize="16px">{each.value}</Text>
              </Box>
            ))}
          </HStack>
          <Text numberOfLines={3} color="gray.600">
            {trade.note}
          </Text>
        </VStack>
      </Stack>
      {showChart && (
        <Box h="500px" mt="4">
          <TradingViewWidget symbol={"NASDAQ:" + trade.ticker} autosize />
        </Box>
      )}
    </View>
  );
}
