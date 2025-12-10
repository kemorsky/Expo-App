import { useState } from "react";
import { Container } from "@/components/Container";
import { HorizontalRule } from "@/components/HorizontalRule";
import { ThemedText } from "@/components/ThemedText";
import { Wrapper } from "@/components/Wrapper";
import { useMe } from '@/lib/api/user/userQueries';
import { useThemeConfig } from "@/hooks/useThemeConfig";
import { useUpdateUserSettings } from "@/lib/api/user/userMutations";
import { View, Text, Pressable, StyleSheet, ActivityIndicator } from "react-native";
import { SettingsInput } from "@/__generated__/graphql";

export default function Theme() {
    const { user, loading, error } = useMe();
    const { setLightTheme, setDarkTheme } = useThemeConfig();
    const { updateUserSettings } = useUpdateUserSettings();

    const [ newTheme, setNewTheme ] = useState<SettingsInput>({ theme: '' });
    if (!user || loading) return <ActivityIndicator />;
    if (error) return <Text>Error: {error.message}</Text>;

    const handleUpdateSetting = async (theme: string) => {
        try {
            const data = await updateUserSettings({theme});
            if (data) {
                console.log(data)
                setNewTheme({ theme: data.theme })
                console.log("Theme changes successfully!" + newTheme.theme);
            }
        } catch (error) {
            throw new Error (`Error updating user settings: ${error}`)
        }
    }
    
    return (
        <Wrapper>
            <Container>
                <ThemedText type='subtitle'>Account</ThemedText>
                <View style={styles.settingsList}>
                    <Pressable style={styles.setting} onPress={() => {setLightTheme(); handleUpdateSetting("Light")}}>
                        <ThemedText>Light</ThemedText>
                    </Pressable>
                    <HorizontalRule />
                    <Pressable style={styles.setting} onPress={() => {setDarkTheme(); handleUpdateSetting("Dark")}}>
                        <ThemedText>Dark</ThemedText>
                    </Pressable>
                </View>
            </Container>
        </Wrapper>
    )
}

const styles = StyleSheet.create({
  settingsList: {
    backgroundColor: '#dbdbdbff',
    paddingHorizontal: 8,
    flexDirection: 'column',
    borderRadius: 8,
  },
  setting: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  }
});