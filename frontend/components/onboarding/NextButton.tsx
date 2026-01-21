import { Pressable } from "react-native";
import { useGlobalStyles } from "@/styles/globalStyles";
import AntDesign from '@expo/vector-icons/AntDesign';

type NextButtonProps = {
    scrollToNext: () => void;
}

export default function NextButton({ scrollToNext }: NextButtonProps) {
    const globalStyles = useGlobalStyles();
    
    return (
        <Pressable accessibilityLabel="Next Onboarding Slide Button" style={[globalStyles.cycleThroughButton, {justifyContent: "flex-end"}]} onPress={scrollToNext}>
            <AntDesign name="right" size={20} color="white" />
        </Pressable>
    );
};