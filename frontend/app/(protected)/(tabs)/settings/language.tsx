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
                    <Pressable
                        style={globalStyles.setting}
                        onPress={() => handleUpdateSetting("en-US")}>
                            <ThemedText>{t("tabs.settings.english")}</ThemedText>
                            {user.settings?.language === "en-US" && (
                                <Entypo name="check" size={18} color="green" />
                            )}
                    </Pressable>
                    <HorizontalRule />
                    <Pressable
                        style={globalStyles.setting}
                        onPress={() => handleUpdateSetting("sv-SV")}>
                            <ThemedText>{t("tabs.settings.swedish")}</ThemedText>
                            {user.settings?.language === "sv-SV" && (
                                <Entypo name="check" size={18} color="green" />
                            )}
                    </Pressable>
                </View>
            </Container>
        </Wrapper>
    )
};