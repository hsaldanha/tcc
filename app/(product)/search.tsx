import { ThemedText } from "@/components/ThemedText";
import { ThemedScrollView, ThemedView } from "@/components/ThemedView";
import { productsDb } from "@/db/products";
import { Stack } from "expo-router";
import { useState } from "react";
import { Image, TextInput, View } from "react-native";

export default function SearchScreen() {
  const [search, onChangeText] = useState("");

  const result = productsDb
    .filter((p) => p.name.toLowerCase().includes(search))
    .slice(0, 3);

  return (
    <ThemedView>
      <Stack.Screen
        options={{
          headerTitle: () => (
            <View
              style={{
                width: 300,
              }}
            >
              <TextInput
                autoFocus={true}
                style={{
                  height: 40,
                  padding: 10,
                  color: "#f4f4f5",
                }}
                placeholderTextColor="#f4f4f57f"
                onChangeText={onChangeText}
                placeholder="Pesquisar..."
                value={search}
              />
            </View>
          ),
          headerShown: true,
        }}
      />
      {search === null || search === "" ? (
        <View
          style={{
            padding: 16,
            alignItems: "center",
          }}
        >
          <ThemedText>Pesquise por produtos, restrições ou dietas.</ThemedText>
        </View>
      ) : (
        <ThemedScrollView>
          <View
            style={{
              padding: 16,
              gap: 12,
            }}
          >
            <View
              style={{
                gap: 12,
              }}
            >
              <ThemedText style={{ fontSize: 18, fontWeight: 500 }}>
                Produtos
              </ThemedText>
              <View
                style={{
                  gap: 12,
                }}
              >
                {result.length > 0 ? (
                  result.map((product) => (
                    <ThemedView
                      key={product.id}
                      style={{
                        flexDirection: "row",
                        backgroundColor: "#18181b",
                        borderRadius: 6,
                      }}
                    >
                      <View
                        style={{
                          overflow: "hidden",
                          backgroundColor: "white",
                          width: 80,
                          height: 80,
                          justifyContent: "center",
                          alignItems: "center",
                          borderTopLeftRadius: 6,
                          borderBottomLeftRadius: 6,
                        }}
                      >
                        <Image
                          source={
                            product.image
                              ? product.image
                              : require("@/assets/images/react-logo.png")
                          }
                          style={{
                            width: 60,
                            height: 60,
                          }}
                        />
                      </View>
                      <View
                        style={{
                          flex: 1,
                          width: "72%",
                          justifyContent: "space-between",
                          padding: 8,
                        }}
                      >
                        <ThemedText numberOfLines={1} ellipsizeMode="tail">
                          {product.name}
                        </ThemedText>
                        <View
                          style={{
                            flexDirection: "row",
                          }}
                        >
                          <ThemedText
                            style={{
                              color: "white",
                              fontSize: 12,
                              backgroundColor: "#ff6467",
                              paddingVertical: 4,
                              paddingHorizontal: 6,
                              borderRadius: 100,
                              maxWidth: "auto",
                            }}
                          >
                            Intolerância à lactose
                          </ThemedText>
                        </View>
                      </View>
                    </ThemedView>
                  ))
                ) : (
                  <ThemedText>Nenhum resultado encontrado.</ThemedText>
                )}
              </View>
            </View>
            <View
              style={{
                alignItems: "center",
              }}
            >
              <View
                style={{
                  marginVertical: 12,
                  backgroundColor: "#f4f4f520",
                  width: "60%",
                  height: 1,
                }}
              ></View>
            </View>
            <View
              style={{
                gap: 12,
              }}
            >
              <ThemedText style={{ fontSize: 18, fontWeight: 500 }}>
                Restrições
              </ThemedText>
              <ThemedText>Nenhum resultado encontrado.</ThemedText>
            </View>
            <View
              style={{
                alignItems: "center",
              }}
            >
              <View
                style={{
                  marginVertical: 12,
                  backgroundColor: "#f4f4f520",
                  width: "60%",
                  height: 1,
                }}
              ></View>
            </View>
            <View
              style={{
                gap: 12,
              }}
            >
              <ThemedText style={{ fontSize: 18, fontWeight: 500 }}>
                Dieta
              </ThemedText>
              <ThemedText>Nenhumo resultado encontrado.</ThemedText>
            </View>
          </View>
        </ThemedScrollView>
      )}
    </ThemedView>
  );
}
