import {
  StyleSheet,
  Platform,
  Alert,
  Image,
  View,
  TextInput,
  Text,
  Pressable,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedScrollView, ThemedView } from "@/components/ThemedView";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { Link, useRouter } from "expo-router";
import { Button } from "@/components/Button";
import { productsDb } from "@/db/products";
import { Feather } from "@expo/vector-icons";
import { Carousel } from "@/components/Carousel";

export default function HomeScreen() {
  const currentUser = useCurrentUser();
  const router = useRouter();

  // useEffect(() => {
  //   if (currentUser.profile === null) {
  //     Alert.alert(
  //       "Configuração de perfil",
  //       "Você ainda não configurou o seu perfil. Configure o seu perfil para ter uma melhor experiência navegando pelo aplicativo.",
  //       [
  //         { style: "cancel", text: "Cancelar" },
  //         {
  //           text: "Ir para configuração",
  //           onPress: () => router.navigate("/profile"),
  //         },
  //       ]
  //     );
  //   }
  // }, []);

  return (
    <ThemedScrollView style={styles.container}>
      <ThemedView style={styles.content}>
        <ThemedView style={styles.stepContainer}>
          <View
            style={{
              flexDirection: "row",
              gap: 16,
              alignItems: "center",
            }}
          >
            <Pressable
              style={{
                flex: 1,
              }}
              onPress={() => router.push("/details/search")}
            >
              <Text
                style={{
                  height: 40,
                  borderWidth: 1,
                  padding: 10,
                  borderColor: "#f4f4f5",
                  borderRadius: 12,
                  color: "#f4f4f5",
                }}
              >
                Pesquisar
              </Text>
              <Feather
                size={22}
                name="search"
                style={{
                  position: "absolute",
                  top: 8,
                  right: 12,
                  color: "#f4f4f5",
                }}
              />
            </Pressable>
            <View
              style={{
                height: 42,
                width: 42,
                backgroundColor: "white",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 100,
                overflow: "hidden",
              }}
            >
              <Image
                source={require("@/assets/images/profile-male-placeholder.jpg")}
                style={{
                  width: 42,
                  height: 42,
                }}
              />
            </View>
          </View>
        </ThemedView>
        <ThemedView style={styles.stepContainer}>
          <ThemedText type="subtitle">Informações</ThemedText>
          <Carousel />
        </ThemedView>
        <ThemedView style={styles.stepContainer}>
          <ThemedText type="subtitle">Resumo do perfil</ThemedText>
          {currentUser.profile === null ? (
            <ThemedView
              style={{
                gap: 12,
              }}
            >
              <ThemedText>Você ainda não configurou o seu perfil.</ThemedText>
              <Button
                onPress={() => {
                  currentUser.initConfig();
                  router.push("/config");
                }}
              >
                Ir para configuração de perfil
              </Button>
            </ThemedView>
          ) : (
            <View>
              {currentUser.profile.restrictions?.length === 0 ? (
                <View
                  style={{
                    gap: 12,
                  }}
                >
                  <ThemedText>
                    Você ainda não configurou restrições ou tipos de dieta no
                    seu perfil.
                  </ThemedText>
                  <Button
                    onPress={() => {
                      currentUser.initConfig();
                      router.push("/config");
                    }}
                  >
                    Ir para configuração de perfil
                  </Button>
                </View>
              ) : (
                <View
                  style={{
                    gap: 12,
                  }}
                >
                  <ThemedText>Você já configurou o seu perfil.</ThemedText>
                  <Button
                    variant="secondary"
                    onPress={() => {
                      currentUser.initConfig();
                      router.push("/config");
                    }}
                  >
                    Ver meu perfil
                  </Button>
                </View>
              )}
            </View>
          )}
        </ThemedView>
        <ThemedView style={styles.stepContainer}>
          <ThemedText type="subtitle">Produtos recentes</ThemedText>
          <View
            style={{
              width: "100%",
              gap: 12,
            }}
          >
            {productsDb.slice(0, 3).map((product) => (
              <ThemedView
                key={product.id}
                style={{
                  flexDirection: "row",
                  backgroundColor: "#18181b",
                  borderRadius: 6,
                }}
              >
                <Pressable
                  onPress={() => {
                    router.navigate({
                      pathname: "/details/product/[barcode]",
                      params: {
                        barcode: product.code,
                      },
                    });
                  }}
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
                </Pressable>
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
            ))}

            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Link href="/">
                <ThemedText type="link">Ver mais produtos</ThemedText>
              </Link>
            </View>
          </View>
        </ThemedView>
      </ThemedView>
    </ThemedScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 18,
    gap: 16,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 12,
    marginBottom: 8,
  },
});
