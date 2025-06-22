import { Button } from "@/components/Button";
import { Collapsible } from "@/components/Collapsible";
import { ExternalLink } from "@/components/ExternalLink";
import InfoModal from "@/components/InfoModal";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedScrollView, ThemedView } from "@/components/ThemedView";
import { restrictionsDb } from "@/db/diet";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { productQueryOptions } from "@/queries/productQuery";
import { Feather } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { Stack, useLocalSearchParams } from "expo-router";
import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { create } from "zustand";

export default function BarcodeScreen() {
  const search = useLocalSearchParams();
  const productQuery = useQuery(productQueryOptions(search.barcode as string));

  return (
    <ThemedView>
      {productQuery.status === "pending" ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator />
        </View>
      ) : productQuery.status === "error" ? (
        <View style={styles.errorContainer}>
          <Stack.Screen options={{ title: "Oops!" }} />
          <View
            style={{
              flex: 6,
              alignItems: "center",
              justifyContent: "center",
              gap: 24,
            }}
          >
            <Feather
              size={84}
              name="archive"
              style={{
                color: "#6097f0",
              }}
            />
            <ThemedText style={styles.errorText}>
              O produto escaneado não foi encontrado em nossa base de dados.
            </ThemedText>
          </View>
          <View
            style={{
              flex: 1,
            }}
          >
            <Button
              style={{
                width: "80%",
              }}
            >
              Solicitar ajuda
            </Button>
          </View>
        </View>
      ) : (
        <ThemedScrollView
          style={{
            height: "100%",
          }}
        >
          <ParallaxScrollView
            headerBackgroundColor={{ light: "white", dark: "#353636" }}
            headerImage={
              <Image
                source={
                  productQuery.data.code
                    ? productQuery.data.image
                    : require("@/assets/images/react-logo.png")
                }
                style={{
                  width: 200,
                  height: 200,
                  position: "absolute",
                }}
              />
            }
          >
            <ThemedView style={styles.titleContainer}>
              <ThemedText type="defaultSemiBold">
                {productQuery.data.name}
              </ThemedText>
            </ThemedView>
            <DiettaryPatternsAndRetrictions />

            <Collapsible title="Tabela nutricional">
              <ThemedText style={{ marginBottom: 6, fontWeight: 500 }}>
                Tamanho da porção: {productQuery.data.servingSize?.value}
                {productQuery.data.servingSize?.unit}
              </ThemedText>
              <View style={tableStyles.container}>
                <View style={tableStyles.row}>
                  <Text
                    style={[
                      tableStyles.col,
                      { flex: 2, borderRightWidth: 0, borderBottomWidth: 0 },
                    ]}
                  >
                    Tipo
                  </Text>
                  <Text
                    style={[
                      tableStyles.col,
                      { borderRightWidth: 0, borderBottomWidth: 0 },
                    ]}
                  >
                    Valor
                  </Text>
                  <Text
                    style={[
                      tableStyles.col,
                      { borderRightWidth: 0, borderBottomWidth: 0 },
                    ]}
                  >
                    Unid
                  </Text>
                  <Text style={[tableStyles.col, { borderBottomWidth: 0 }]}>
                    %VD*
                  </Text>
                </View>
                {productQuery.data.nutritionFacts?.map((entry, index) => {
                  let isLastRow =
                    index + 1 === productQuery.data.nutritionFacts?.length;

                  return (
                    <View key={entry.type} style={[tableStyles.row]}>
                      <Text
                        style={[
                          tableStyles.col,
                          {
                            flex: 2,
                            borderRightWidth: 0,
                            borderBottomWidth: isLastRow ? 1 : 0,
                          },
                        ]}
                      >
                        {entry.type}
                      </Text>
                      <Text
                        style={[
                          tableStyles.col,
                          {
                            borderRightWidth: 0,
                            borderBottomWidth: isLastRow ? 1 : 0,
                          },
                        ]}
                      >
                        {entry.value}
                      </Text>
                      <Text
                        style={[
                          tableStyles.col,
                          {
                            borderRightWidth: 0,
                            borderBottomWidth: isLastRow ? 1 : 0,
                          },
                        ]}
                      >
                        {entry.unit}
                      </Text>
                      <Text
                        style={[
                          tableStyles.col,
                          {
                            borderBottomWidth: isLastRow ? 1 : 0,
                          },
                        ]}
                      >
                        {entry.dailyValue}
                      </Text>
                    </View>
                  );
                })}
              </View>
              <ThemedText>
                *Percentual de valores diários fornecidos pela porção.
              </ThemedText>
            </Collapsible>
            <Collapsible title="Descrição do fabricante">
              <ThemedText>{productQuery.data.description}</ThemedText>
            </Collapsible>
          </ParallaxScrollView>
        </ThemedScrollView>
      )}
    </ThemedView>
  );
}

const tableStyles = StyleSheet.create({
  container: {},
  row: { flexDirection: "row" },
  col: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#171717",
    padding: 8,
  },
});

const styles = StyleSheet.create({
  loadingContainer: {
    height: "100%",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  errorContainer: {
    height: "100%",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  errorText: {
    textAlign: "center",
    fontWeight: "500",
    fontSize: 18,
  },
  headerImage: {
    color: "#808080",
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});

export interface DietConfig {
  restrictions: Array<number>;
}

interface CurrentUserState {
  restrictionId: number | null;
  open: (restrictionId: number) => void;
  close: () => void;
}

export const useInfoModal = create<CurrentUserState>()((set) => ({
  restrictionId: null,
  open: (restrictionId) => set(() => ({ restrictionId })),
  close: () => set(() => ({ restrictionId: null })),
}));

export const useInfoModal2 = create<{
  isVisible: boolean;
  toggle: () => void;
}>()((set) => ({
  isVisible: false,
  toggle: () => set((currentState) => ({ isVisible: !currentState.isVisible })),
}));

function DiettaryPatternsAndRetrictions() {
  const search = useLocalSearchParams();
  const productQuery = useQuery(productQueryOptions(search.barcode as string));
  const currentUser = useCurrentUser();

  const infoModal = useInfoModal();

  const infoModal2 = useInfoModal2();

  const taggedRestrictions = currentUser.profile?.restrictions.reduce(
    (tagged, restriction) => {
      const dbRestriction = restrictionsDb?.find((i) => i.id === restriction);
      const ingredients = productQuery.data?.ingredients?.filter(
        (i) =>
          i.associatedWith?.find((asw) => asw.id === restriction) !== undefined
      );

      if (ingredients?.length !== 0) {
        tagged.push({
          restrictionId: restriction,
          restrictionType: dbRestriction?.type,
          ingredients,
        });
      }

      return tagged;
    },
    [] as any
  ) as Array<{
    restrictionId: number;
    restrictionType: Restriction["type"];
    ingredients?: Product["ingredients"];
  }>;

  if (taggedRestrictions?.length === 0) {
    return (
      <ThemedText>
        O produto não possui em sua lista de ingredientes componentes que
        conflitem com a sua dieta ou as suas restrições.
      </ThemedText>
    );
  }

  const restrictionDetails = restrictionsDb?.find(
    (i) => i.id === infoModal.restrictionId
  );

  const taggedRestriction = taggedRestrictions?.find(
    (i) => i.restrictionId === infoModal.restrictionId
  );

  return (
    <View>
      <ThemedText>
        O produto contém componentes que podem ser prejudiciais a sua dieta e/ou
        saúde.
      </ThemedText>
      {taggedRestrictions?.filter(
        (tr) => tr.restrictionType === "dietary-pattern"
      ).length > 0 ? (
        <ThemedView
          style={{
            paddingVertical: 12,
            gap: 12,
          }}
        >
          <Pressable
            style={{
              flexDirection: "row",
              gap: 6,
            }}
            onPress={() => infoModal2.toggle()}
          >
            <ThemedText
              style={{
                fontSize: 18,
              }}
            >
              Dieta
            </ThemedText>
            <Feather size={22} name="info" />
          </Pressable>
          <View
            style={{
              flexDirection: "row",
              gap: 6,
            }}
          >
            {taggedRestrictions
              ?.filter((tr) => tr.restrictionType === "dietary-pattern")
              .map((tagged) => (
                <Tag restrictionId={tagged.restrictionId} />
              ))}
          </View>
        </ThemedView>
      ) : null}
      {taggedRestrictions?.filter((tr) => tr.restrictionType === "condition")
        .length > 0 ? (
        <ThemedView
          style={{
            paddingVertical: 12,
            gap: 12,
          }}
        >
          <ThemedView
            style={{
              flexDirection: "row",
              gap: 6,
            }}
          >
            <ThemedText
              style={{
                fontSize: 18,
              }}
            >
              Restrições
            </ThemedText>
            <Feather size={22} name="info" />
          </ThemedView>
          <View
            style={{
              flexDirection: "row",
              gap: 6,
            }}
          >
            {taggedRestrictions
              ?.filter((tr) => tr.restrictionType === "condition")
              ?.map((tagged) => (
                <Tag restrictionId={tagged.restrictionId} />
              ))}
          </View>
        </ThemedView>
      ) : null}
      <InfoModal
        title={restrictionDetails?.name ?? "Detalhes"}
        isVisible={infoModal.restrictionId !== null}
        onClose={() => infoModal.close()}
      >
        {taggedRestriction?.ingredients?.map((i) => (
          <ThemedText
            key={i.name}
            style={{
              color: "white",
            }}
          >
            {i.name}
          </ThemedText>
        ))}
      </InfoModal>
      <InfoModal2 />
    </View>
  );
}

function Tag({ restrictionId }: { restrictionId: number }) {
  const infoModal = useInfoModal();
  const restriction = restrictionsDb?.find((r) => r.id === restrictionId);

  return (
    <Pressable
      onPress={() => infoModal.open(restrictionId)}
      style={({ pressed }) => ({
        backgroundColor: pressed ? "#fb2c36" : "#ff6467",
        paddingVertical: 4,
        paddingHorizontal: 6,
        borderRadius: 100,
      })}
    >
      <ThemedText
        style={{
          color: "white",

          fontSize: 12,
        }}
      >
        {restriction?.name}
      </ThemedText>
    </Pressable>
  );
}

function InfoModal2() {
  const infoModal = useInfoModal2();

  return (
    <InfoModal
      title="Marcações"
      isVisible={infoModal.isVisible}
      onClose={() => infoModal.toggle()}
    >
      <ThemedText
        style={{
          fontSize: 18,
          color: "white",
        }}
      >
        Você pode utilizar as tags abaixo para visualizar informações
        importantes sobre os ingredientes associados as condições ou tipos de
        dieta.
      </ThemedText>
    </InfoModal>
  );
}
