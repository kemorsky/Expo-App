import { useState } from "react";
import { Container } from "@/components/shared/Container";
import { HorizontalRule } from "@/components/shared/HorizontalRule";
import { ThemedText } from "@/components/ThemedText";
import { Wrapper } from "@/components/shared/Wrapper";
import { SettingsOption } from '@/components/settings/SettingsOption';
import { useMe } from '@/api/user/userQueries';
import { useThemeConfig } from "@/hooks/useThemeConfig";
import { useUpdateUserSettings } from "@/api/user/userMutations";
import { View, Text, ActivityIndicator } from "react-native";
import Entypo from '@expo/vector-icons/Entypo';
import { SettingsInput } from "@/__generated__/graphql";
import { useGlobalStyles } from "@/styles/globalStyles";
import { useTranslation } from "react-i18next";

export default function Theme() {
    const { user, loading, error } = useMe();
    const { setLightTheme, setDarkTheme } = useThemeConfig();
    const { updateUserSettings } = useUpdateUserSettings();
    const { t } = useTranslation();
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
                <View style={globalStyles.settingsList}>
                    <SettingsOption onPress={() => {setLightTheme(); handleUpdateSetting("Light")}}>
                        <ThemedText type="option">{t('tabs.settings.light')}</ThemedText>
                        {user.settings?.theme === "Light" && (<Entypo name="check" size={18} color="green" />)}
                    </SettingsOption>
                    <HorizontalRule />
                    <SettingsOption onPress={() => {setDarkTheme(); handleUpdateSetting("Dark")}}>
                        <ThemedText type="option">{t('tabs.settings.dark')}</ThemedText>
                        {user.settings?.theme === "Dark" && (<Entypo name="check" size={18} color="green" />)}
                    </SettingsOption>
                </View>
            </Container>
        </Wrapper>
    )
};