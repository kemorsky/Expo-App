import { StyleSheet, Pressable } from "react-native";
import { ThemedText } from "../ThemedText";

type PreviousButtonProps = {
    scrollToPrevious: () => void;
}

export default function PreviousButton({ scrollToPrevious }: PreviousButtonProps) {
    return (
        <Pressable accessibilityLabel="Previous Onboarding Slide Button" style={styles.previousButton} onPress={scrollToPrevious}>
            <ThemedText>Previous</ThemedText>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    previousButton: {
        backgroundColor: "#da7070ff",
        alignSelf: "flex-end",
        padding: 8,
        borderRadius: 8,

    }
})