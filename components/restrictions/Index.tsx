import { View } from "react-native";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";
import { LactoseIntolerance } from "./LactoseIntolerance";
import { restrictionsDb } from "@/db/diet";

const components: Record<string, React.FC<{ restrictionId: number }>> = {
  "intolerancia-a-lactose": LactoseIntolerance,
};

export function RestrictionDetails({
  restrictionId,
}: {
  restrictionId: number;
}) {
  const restriction = restrictionsDb.find((item) => item.id === restrictionId)!;

  const Component = components[restriction.slug!] as React.FC;

  // @ts-ignore
  return <Component restrictionId={restrictionId} />;
}
