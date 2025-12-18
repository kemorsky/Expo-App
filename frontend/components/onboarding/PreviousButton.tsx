import { Pressable } from "react-native";
import { ThemedText } from "../ThemedText";
import { useGlobalStyles } from "@/styles/globalStyles";

type PreviousButtonProps = {
    scrollToPrevious: () => void;
}

export default function PreviousButton({ scrollToPrevious }: PreviousButtonProps) {
    const globalStyles = useGlobalStyles();
    
    return (
        <Pressable accessibilityLabel="Previous Onboarding Slide Button" style={globalStyles.cycleThroughButton} onPress={scrollToPrevious}>
            <ThemedText type="subtitle">Previous</ThemedText>
        </Pressable>
    );
};