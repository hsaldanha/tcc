import { Collapsible } from "@/components/Collapsible"
import ParallaxScrollView from "@/components/ParallaxScrollView"
import { ThemedText } from "@/components/ThemedText"
import { ThemedScrollView, ThemedView } from "@/components/ThemedView"
import { restrictionsDb } from "@/db/diet"
import { useLocalSearchParams } from "expo-router"
import React from "react"
import { Image, ImageSourcePropType, StyleSheet, View } from "react-native"

export default function RestrictyionDetailsScreen() {
    const search = useLocalSearchParams()

    const restriction = restrictionsDb.find(item => item.id === parseInt(search.restrictionId as string))!

    console.log(restriction)

    return <ThemedScrollView
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
            <ThemedView style={styles.titleContainer}>
                <ThemedText type="subtitle">
                    {restriction.name}
                </ThemedText>
            </ThemedView>

            {restriction.description?.summary.map(text => (

                <ThemedText style={{
                    textAlign: "justify"
                }}>
                    {text}
                </ThemedText>
            ))}
            <ThemedView style={styles.titleContainer}>
                <ThemedText type="defaultSemiBold">
                    Sintomas
                </ThemedText>
            </ThemedView>
            <ThemedText>
                {restriction.description?.symptoms}
            </ThemedText>
            <ThemedView style={styles.titleContainer}>
                <ThemedText type="defaultSemiBold">
                    Tratamento
                </ThemedText>
            </ThemedView>
            <ThemedText>
                {restriction.description?.treatment}
            </ThemedText>
        </ParallaxScrollView>
    </ThemedScrollView>
}

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