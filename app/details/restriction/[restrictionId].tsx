import ParallaxScrollView from "@/components/ParallaxScrollView";
import { RestrictionDetails } from "@/components/restrictions/Index";
import { ThemedScrollView } from "@/components/ThemedView";
import { restrictionsDb } from "@/db/diet";
import { useLocalSearchParams } from "expo-router";
import { Image, ImageSourcePropType } from "react-native";

export default function RestrictionDetailsScreen() {
  const search = useLocalSearchParams();

  const restriction = restrictionsDb.find(
    (item) => item.id === parseInt(search.restrictionId as string)
  )!;

  return (
    <ThemedScrollView
      style={{
        height: "100%",
      }}
    >
      <ParallaxScrollView
        headerBackgroundColor={{ light: "white", dark: "#353636" }}
        headerImage={
          <Image
            source={restriction.image as ImageSourcePropType}
            style={{
              width: 400,
              height: 400,
              position: "absolute",
            }}
          />
        }
      >
        <RestrictionDetails
          restrictionId={parseInt(search.restrictionId as string)}
        />
      </ParallaxScrollView>
    </ThemedScrollView>
  );
}
