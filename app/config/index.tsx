import InfoModal from "@/components/InfoModal";
import { ThemedText } from "@/components/ThemedText";
import { ThemedScrollView, ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { restrictionsDb } from "@/db/diet";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { DarkTheme } from "@react-navigation/native";
import { Pressable, StyleSheet, Switch } from "react-native";
import { create } from "zustand";

type DetailsModalType = "pattern" | "restriction";

interface DetailsModalState {
  id: number | null;
  isOpen: boolean;
  type: DetailsModalType;
  open: (props: { id: number; type: DetailsModalType }) => void;
  close: () => void;
}

const useDetailsModalStore = create<DetailsModalState>((set) => ({
  id: null,
  isOpen: false,
  type: "pattern",
  open: ({ id, type }) => set(() => ({ isOpen: true, id, type })),
  close: () => set(() => ({ isOpen: false })),
}));

function getInfo({ id, type }: { id: number | null; type: DetailsModalType }) {
  if (!id) {
    return null;
  }

  if (type === "pattern") {
    return restrictionsDb[id - 1];
  }

  return restrictionsDb[id - 1];
}

export default function ConfigScreen() {
  const { profile, toggleRestriction } = useCurrentUser();

  const detailsModal = useDetailsModalStore();
  const info = getInfo({ id: detailsModal.id, type: detailsModal.type });

  return (
    <ThemedScrollView>
      <ThemedView style={styles.container}>
        <ThemedView style={styles.sectionContainer}>
          <ThemedText style={styles.sectionTitle}>Tipos de dieta</ThemedText>
          <ThemedView style={styles.hr} />
          <ThemedView>
            {restrictionsDb
              .filter((r) => r.type === "dietary-pattern")
              .map((pattern) => {
                const isSelected =
                  profile?.restrictions?.includes(pattern.id) ?? false;

                return (
                  <ListItem
                    key={pattern.id}
                    title={pattern.name}
                    isSelected={isSelected}
                    onChange={() => toggleRestriction(pattern.id)}
                    onViewDetails={() =>
                      detailsModal.open({ id: pattern.id, type: "pattern" })
                    }
                  />
                );
              })}
          </ThemedView>
        </ThemedView>
        <ThemedView style={styles.sectionContainer}>
          <ThemedText style={styles.sectionTitle}>Restrições</ThemedText>
          <ThemedView style={styles.hr} />
          <ThemedView>
            {restrictionsDb
              .filter((r) => r.type === "condition")
              .map((restriction) => {
                const isSelected =
                  profile?.restrictions?.includes(restriction.id) ?? false;

                return (
                  <ListItem
                    key={restriction.id}
                    title={restriction.name}
                    isSelected={isSelected}
                    onChange={() => toggleRestriction(restriction.id)}
                    onViewDetails={() =>
                      detailsModal.open({
                        id: restriction.id,
                        type: "restriction",
                      })
                    }
                  />
                );
              })}
          </ThemedView>
        </ThemedView>
      </ThemedView>
      <InfoModal
        title={info?.name ?? "Detalhes"}
        isVisible={detailsModal.isOpen}
        onClose={() => detailsModal.close()}
      >
        {info?.id}
      </InfoModal>
    </ThemedScrollView>
  );
}

interface ListItemProps {
  title: string;
  isSelected: boolean;
  onChange: () => void;
  onViewDetails: () => void;
}

function ListItem({
  title,
  isSelected,
  onChange,
  onViewDetails,
}: ListItemProps) {
  return (
    <ThemedView style={styles.listItem}>
      <Pressable
        onPress={onViewDetails}
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? "#18181b" : Colors.dark.background,
          },
          styles.listItemPressable,
        ]}
      >
        <ThemedText style={styles.listItemTitle}>{title}</ThemedText>
      </Pressable>
      <ThemedView style={styles.listItemSwitchContainer}>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isSelected === true ? "#404040" : "#4d4c4c"}
          onValueChange={() => onChange()}
          value={isSelected}
        />
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    gap: 16,
  },
  sectionContainer: {
    flex: 1,
    gap: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 600,
  },
  hr: {
    borderColor: "#cad5e2",
    borderWidth: 0.2,
  },
  listItem: {
    flexDirection: "row",
    height: 42,
  },
  listItemPressable: {
    flex: 5,
    justifyContent: "center",
    paddingLeft: 4,
    borderRadius: 6,
  },
  listItemTitle: {
    textAlignVertical: "center",
  },
  listItemSwitchContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
