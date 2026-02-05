import { Pressable } from "react-native";
import { useGlobalStyles } from "@/styles/globalStyles";
import { useThemeConfig } from "@/hooks/useThemeConfig";
import AntDesign from "@expo/vector-icons/AntDesign";

type PreviousButtonProps = {
    scrollToPrevious: () => void;
}

export default function PreviousButton({ scrollToPrevious }: PreviousButtonProps) {
    const globalStyles = useGlobalStyles();
    const { theme } = useThemeConfig();
    
    return (
        <Pressable accessibilityLabel="Previous Onboarding Slide Button" style={globalStyles.cycleThroughButton} onPress={scrollToPrevious}>
            <AntDesign name="left" size={20} color={theme.colors.text} />
        </Pressable>
    );
};