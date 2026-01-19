import { Container } from "@/components/shared/Container";
import { HorizontalRule } from "@/components/shared/HorizontalRule";
import { ThemedText } from "@/components/ThemedText";
import { Wrapper } from "@/components/shared/Wrapper";
import { useMe } from '@/api/user/userQueries';
import { useUpdateUserSettings } from "@/api/user/userMutations";
import { View, Text, Pressable, ActivityIndicator } from "react-native";
import { useGlobalStyles } from "@/styles/globalStyles";
import Entypo from "@expo/vector-icons/Entypo";
import { useTranslation } from "react-i18next";
import { setLanguage } from "@/utils/i18n/setLanguage";

export default function Language() {
    const { user, loading, error } = useMe();
    const { updateUserSettings } = useUpdateUserSettings();
    const { t } = useTranslation();
    const globalStyles = useGlobalStyles();
    
    if (!user || loading) return <ActivityIndicator />;
    if (error) return <Text>Error: {error.message}</Text>;

    const LANGUAGES = [
        { labelKey: "tabs.settings.english", locale: "en-US" },
        { labelKey: "tabs.settings.swedish", locale: "sv-SV" },
    ] as const;

    const handleUpdateSetting = async (locale: "en-US" | "sv-SV") => {
        try {
            await updateUserSettings({ language: locale });
            await setLanguage(locale);

        } catch (error) {
             throw new Error (`Error updating user settings: ${error}`)
        }
    }
    
    return (
        <Wrapper>
            <Container>
                <View style={globalStyles.settingsList}>
                    {LANGUAGES.map(({ labelKey, locale }) => (
                        <Pressable
                            key={locale}
                            style={globalStyles.setting}
                            onPress={() => handleUpdateSetting(locale)}>
                                <ThemedText>{t(labelKey)}</ThemedText>
                                {user.settings?.language === locale && (
                                    <Entypo name="check" size={18} color="green" />
                                )}
                        </Pressable>
                    ))}
                </View>
            </Container>
        </Wrapper>
    )
};