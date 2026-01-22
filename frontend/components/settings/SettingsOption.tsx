import { Pressable} from "react-native";
import { useGlobalStyles } from "@/styles/globalStyles";
import { useThemeConfig } from "@/hooks/useThemeConfig";

type SettingsOptionProps = {
    children: React.ReactNode;
    onPress: () => void;
};

export const SettingsOption = ({ children, onPress }: SettingsOptionProps) => {
    const { theme } = useThemeConfig();
    const globalStyles = useGlobalStyles();
    
    return (    
        <Pressable style={({pressed}) => [{ backgroundColor: pressed ? theme.colors.border : theme.colors.card}, globalStyles.setting]} onPress={onPress}>
            {children}
        </Pressable>
    )
}