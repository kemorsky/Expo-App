import { Pressable } from "react-native";
import { useGlobalStyles } from "@/styles/globalStyles";
import { useThemeConfig } from "@/hooks/useThemeConfig";
import AntDesign from "@expo/vector-icons/AntDesign";

type NextButtonProps = {
    scrollToNext: () => void;
}

export default function NextButton({ scrollToNext }: NextButtonProps) {
    const globalStyles = useGlobalStyles();
    const { theme } = useThemeConfig();
    
    return (
        <Pressable accessibilityLabel="Next Onboarding Slide Button" style={[ globalStyles.cycleThroughButton, {justifyContent: "flex-end"} ]} onPress={scrollToNext}>
            <AntDesign name="right" size={20} color={theme.colors.text} />
        </Pressable>
    );
};