import React from "react";
import { Stack } from "expo-router";
import { useScanner } from "@/hooks/useScanner";

export default function DetailsLayout() {
  const scanner = useScanner();

  return (
    <Stack>
      <Stack.Screen
        name="product/[barcode]"
        options={{
          headerShown: true,
          title: "Detalhes",
        }}
        listeners={{
          beforeRemove: () => {
            scanner.toggleScanned();
          },
        }}
      />
      <Stack.Screen
        name="restriction/[restrictionId]"
        options={{
          headerShown: true,
          title: "Detalhes",
        }}
      />
      <Stack.Screen
        name="search"
      />
    </Stack>
  );
}
