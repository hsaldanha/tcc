import React from "react";
import { Stack } from "expo-router";

export default function ConfigLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: true,
          title: "Perfil",
        }}
      />
    </Stack>
  );
}
