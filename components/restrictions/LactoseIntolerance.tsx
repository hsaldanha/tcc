import { StyleSheet, View } from "react-native";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";
import { restrictionsDb } from "@/db/diet";

export function LactoseIntolerance({
  restrictionId,
}: {
  restrictionId: number;
}) {
  const restriction = restrictionsDb.find((item) => item.id === restrictionId)!;

  return (
    <View style={{ gap: 12 }}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText
          style={{
            fontSize: 24,
          }}
        >
          {restriction.name}
        </ThemedText>
      </ThemedView>
      <ThemedView>
        {restriction.description?.summary.map((text, index) => (
          <ThemedText
            key={index}
            style={{
              textAlign: "justify",
            }}
          >
            {text}
          </ThemedText>
        ))}
      </ThemedView>
      <ThemedView style={styles.titleContainer}>
        <ThemedText
          style={{
            fontSize: 24,
          }}
        >
          Sintomas
        </ThemedText>
      </ThemedView>
      <ThemedText
        style={{
          textAlign: "justify",
        }}
      >
        {restriction.description?.symptoms}
      </ThemedText>
      <ThemedView style={styles.titleContainer}>
        <ThemedText
          style={{
            fontSize: 24,
          }}
        >
          Tratamento
        </ThemedText>
      </ThemedView>
      <ThemedText
        style={{
          textAlign: "justify",
        }}
      >
        {restriction.description?.treatment}
      </ThemedText>
      <ThemedView style={styles.titleContainer}>
        <ThemedText
          style={{
            fontSize: 24,
          }}
        >
          Fontes
        </ThemedText>
      </ThemedView>
      {restriction.description?.sources?.map((source, index) => (
        <ThemedText key={index} style={{ textDecorationLine: "underline" }}>
          {source}
        </ThemedText>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    gap: 8,
    borderBottomColor: "white",
    borderBottomWidth: 2,
    paddingVertical: 12,
  },
});
