import React from "react";
import { Stack } from "expo-router";
import { useScanner } from "@/hooks/useScanner";

export default function ConfigLayout() {
  const scanner = useScanner();

  return (
    <Stack>
      <Stack.Screen
        name="[barcode]"
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
    </Stack>
  );
}
