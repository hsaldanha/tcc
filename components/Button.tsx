import { Pressable, PressableProps, StyleSheet } from "react-native";
import { ThemedText } from "./ThemedText";
import { ReactNode } from "react";
import { DarkTheme } from "@react-navigation/native";

interface ButtonProps extends PressableProps {
  children: ReactNode;
  style?: any;
  variant?: "primary" | "secondary";
}

let variants = {
  primary: {
    idle: DarkTheme.colors.primary,
    pressed: "#007cfa",
  },
  secondary: {
    idle: "#00c951",
    pressed: "#00a63e",
  },
};

export function Button({
  children,
  style,
  variant = "primary",
  ...props
}: ButtonProps) {
  let currentVariant = variants[variant];

  return (
    <Pressable
      {...props}
      style={({ pressed }) => [
        {
          backgroundColor: pressed
            ? currentVariant.pressed
            : currentVariant.idle,
          borderRadius: 6,
        },
        style,
      ]}
    >
      <ThemedText style={styles.button}>{children}</ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    textAlign: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
});
