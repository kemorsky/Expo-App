import { StyleSheet, TextInput, type TextInputProps } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';
import { useThemeConfig } from "@/hooks/useThemeConfig";

export type ThemedInputProps = TextInputProps & {
    type?: "form" | "challenge"
}

export function ThemedInput({style, type = "form", ...rest}: ThemedInputProps) {
    const { theme } = useThemeConfig();
    const backgroundColor = useThemeColor({ light: theme.colors.background, dark: theme.colors.background }, 'background');

    return (
        <TextInput 
            placeholderTextColor={"#8b8b8bff"}
            style={[
                {backgroundColor},
                type === "form" ? styles.formInput : undefined,
                type === "challenge" ? styles.challengeInput : undefined,
            ]}
            autoCapitalize="none"
            {...rest}/>
    )
}

const styles = StyleSheet.create({
    formInput: {
        backgroundColor: "#fff",
        height: 54,
        width: "100%",
        borderWidth: 1,
        borderRadius: 4,
        padding: 16,
        fontSize: 16
    },
    challengeInput: {
        backgroundColor: "#fff",
        height: 54,
        width: "100%",
        borderWidth: 1,
        borderRadius: 4,
        padding: 16,
        fontSize: 16
    },
})