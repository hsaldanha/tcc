import { ThemedText } from "@/components/ThemedText";
import { ThemedScrollView, ThemedView } from "@/components/ThemedView";
import { productsDb } from "@/db/products";
import { Stack } from "expo-router";
import { useState } from "react";
import { Image, TextInput, View } from "react-native";

export default function RestrictionScreen() {
  const [search, onChangeText] = useState("");

  return (
    <ThemedView>
      <Stack.Screen
        options={{
          headerShown: true,
        }}
      />
    </ThemedView>
  );
}
