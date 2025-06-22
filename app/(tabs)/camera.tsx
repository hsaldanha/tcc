import {
  BarcodeScanningResult,
  BarcodeType,
  CameraView,
  useCameraPermissions,
} from "expo-camera";
import { Button as BaseButton, StyleSheet, Text, View } from "react-native";
import { Button } from "@/components/Button";
import { useRouter } from "expo-router";
import { useScanner } from "@/hooks/useScanner";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";

const BARCODE_TYPES: Array<BarcodeType> = [
  "ean13",
  "ean8",
  // "qr",
  // "aztec",
  // "qr",
  // "pdf417",
  // "upc_e",
  // "datamatrix",
  // "code39",
  // "code93",
  // "itf14",
  // "codabar",
  // "code128",
  // "upc_a",
];

export default function Camera() {
  const [permission, requestPermission] = useCameraPermissions();
  const router = useRouter();

  const { scanned, toggleScanned } = useScanner();

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <ThemedView style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <BaseButton onPress={requestPermission} title="grant permission" />
      </ThemedView>
    );
  }

  let handleBarcodeScanned =
    scanned === false
      ? (scanningResult: BarcodeScanningResult) => {
          if (scanningResult.data !== null) {
            console.log(scanningResult.data)
            toggleScanned();
            router.navigate({
              pathname: "/details/product/[barcode]",
              params: {
                barcode: scanningResult.data
              }
            });
          }
        }
      : undefined;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <ThemedText style={styles.headerText}>
          Posicione o código de barras na marcação
        </ThemedText>
      </View>
      <View style={styles.cameraContainer}>
        <CameraView
          style={styles.camera}
          facing="back"
          barcodeScannerSettings={{
            barcodeTypes: BARCODE_TYPES,
          }}
          onBarcodeScanned={handleBarcodeScanned}
        >
          <View style={styles.buttonContainer}>
            <View style={styles.cameraHrContainer}>
              <View style={styles.cameraHr}></View>
            </View>
          </View>
        </CameraView>
      </View>
      <View style={styles.footer}>
        <Button onPress={() => toggleScanned()}>
          Digitar código de barras
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
    padding: 12,
  },
  cameraContainer: {
    width: "100%",
    overflow: "hidden",
    borderRadius: 6,
    flex: 4,
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
    height: 240,
  },
  buttonContainer: {
    flex: 1,
    margin: 12,
  },
  button: {
    height: 32,
    alignItems: "flex-end",
  },
  cameraHrContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  cameraHr: {
    height: 4,
    width: "90%",
    backgroundColor: "#ffffffe6",
    borderRadius: 6,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  headerText: {
    fontSize: 16,
    fontWeight: "400",
  },
  header: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  footer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
});

// fetch(`https://api.cosmos.bluesoft.com.br/gtins/${7896256601824}`, {
//   headers: {
//     "X-Cosmos-Token": "Ipm1KjDlX0fNwY1NNjBMEQ",
//   },
// })
//   .then((response) => response.json())
//   .then((result) => console.log(result))
//   .catch((error) => console.log(error));
