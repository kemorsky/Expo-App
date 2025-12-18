import { Pressable } from "react-native";
import { ThemedText } from "../ThemedText";
import { useGlobalStyles } from "@/styles/globalStyles";

type NextButtonProps = {
    scrollToNext: () => void;
}

export default function NextButton({ scrollToNext }: NextButtonProps) {
    const globalStyles = useGlobalStyles();
    
    return (
        <Pressable accessibilityLabel="Next Onboarding Slide Button" style={globalStyles.cycleThroughButton} onPress={scrollToNext}>
            <ThemedText type="subtitle">Next</ThemedText>
        </Pressable>
    );
};