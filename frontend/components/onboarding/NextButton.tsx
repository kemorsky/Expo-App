import { StyleSheet, Pressable } from "react-native";
import { ThemedText } from "../ThemedText";

type NextButtonProps = {
    scrollToNext: () => void;
}

export default function NextButton({ scrollToNext }: NextButtonProps) {
    return (
        <Pressable accessibilityLabel="Next Onboarding Slide Button" style={styles.nextButton} onPress={scrollToNext}>
            <ThemedText>Next</ThemedText>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    nextButton: {
        backgroundColor: "#da7070ff",
        alignSelf: "flex-end",
        padding: 8,
        borderRadius: 8,
    }
})