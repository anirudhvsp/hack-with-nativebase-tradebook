import React from "react";
import { Box, HStack, Image, Text, View, VStack } from "native-base";

const tradeDetails = [
  { label: "Risk / Reward", value: "2.5" },
  { label: "Net Gain", value: "1.2%" },
  { label: "Timeframe", value: "3 Minutes" },
  { label: "Strategy", value: "Price Action" },
];

export default function TradeDetails() {
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
            NIFTY
          </Text>
          <Text color="green.700" fontSize="20px" fontWeight="600">
            ₹ 400
          </Text>
        </HStack>
        <Text fontSize="16px" fontWeight="600" color="gray.500">
          02 July, 2022
        </Text>
      </HStack>
      <HStack px="16px" py="12px" space="32px">
        <Image
          size="220px"
          height="120px"
          alt="fallback text"
          borderRadius="3px"
          source={{
            uri: "https://www.tradingview.com/x/KGZZA0Xx/",
          }}
          fallbackSource={{
            uri: "https://www.w3schools.com/css/img_lights.jpg",
          }}
        />
        <VStack flex={1} space="12px">
          <HStack space="10%" flex={1}>
            {tradeDetails.map((each, idx) => (
              <Box key={idx + 1}>
                <Text fontSize="20px" fontWeight="500" color="#8a8a8a">
                  {each.label}
                </Text>
                <Text fontSize="16px">{each.value}</Text>
              </Box>
            ))}
          </HStack>
          <Text numberOfLines={3} color="gray.600">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Id
            adipisci possimus a optio molestias minus magni eos eaque sed dicta
            quod vitae vero enim architecto mollitia unde, asperiores sapiente
            harum similique saepe cum sit epe cum sit delectus maxime? Repellat
            officiis quas maiores officia, repudiandae quibusdam at rem amet
            saepe dolores consectetur. Dolorum.....
          </Text>
        </VStack>
      </HStack>
    </View>
  );
}
