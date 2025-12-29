import { useState } from "react";
import { Container } from "@/components/Container";
import { HorizontalRule } from "@/components/HorizontalRule";
import { ThemedText } from "@/components/ThemedText";
import { Wrapper } from "@/components/Wrapper";
import { useMe } from '@/lib/api/user/userQueries';
import { useThemeConfig } from "@/hooks/useThemeConfig";
import { useUpdateUserSettings } from "@/lib/api/user/userMutations";
import { View, Text, Pressable, ActivityIndicator } from "react-native";
import Entypo from '@expo/vector-icons/Entypo';
import { SettingsInput } from "@/__generated__/graphql";
import { useGlobalStyles } from "@/styles/globalStyles";

export default function Theme() {
    const { user, loading, error } = useMe();
    const { setLightTheme, setDarkTheme } = useThemeConfig();
    const { updateUserSettings } = useUpdateUserSettings();
    const globalStyles = useGlobalStyles();

    const [ newTheme, setNewTheme ] = useState<SettingsInput>({ theme: '' });
    if (!user || loading) return <ActivityIndicator />;
    if (error) return <Text>Error: {error.message}</Text>;

    const handleUpdateSetting = async (theme: string) => {
        try {
            const data = await updateUserSettings({theme});
            if (data) {
                setNewTheme({ theme: data.theme })
            }
        } catch (error) {
            throw new Error (`Error updating user settings: ${error}`)
        }
    }
    
    return (
        <Wrapper>
            <Container>
                <ThemedText type='subtitle'>Account</ThemedText>
                <View style={globalStyles.settingsList}>
                    <Pressable style={globalStyles.setting} onPress={() => {setLightTheme(); handleUpdateSetting("Light")}}>
                        <ThemedText>Light</ThemedText>
                        {user.settings?.theme === "Light" && (<Entypo name="check" size={18} color="green" />)}
                    </Pressable>
                    <HorizontalRule />
                    <Pressable style={globalStyles.setting} onPress={() => {setDarkTheme(); handleUpdateSetting("Dark")}}>
                        <ThemedText>Dark</ThemedText>
                        {user.settings?.theme === "Dark" && (<Entypo name="check" size={18} color="green" />)}
                    </Pressable>
                </View>
            </Container>
        </Wrapper>
    )
};