import { StyleSheet, Pressable } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useRouter } from "expo-router";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { Button } from "@/components/Button";

export default function ProfileScreen() {
  const router = useRouter();
  const { initConfig } = useCurrentUser();

  return (
    <ThemedView style={styles.container}>
      <ThemedView>
        <ThemedText></ThemedText>
        <Button
          onPress={() => {
            initConfig();
            router.push("/config");
          }}
        >
          Iniciar configuração
        </Button>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  pressable: {},
  button: {
    textAlign: "center",
    borderColor: "#585959",
    borderWidth: 1,
    padding: 8,
    borderRadius: 6,
  },
});
