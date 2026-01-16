import { Container } from "@/components/shared/Container";
import { HorizontalRule } from "@/components/shared/HorizontalRule";
import { ThemedText } from "@/components/ThemedText";
import { Wrapper } from "@/components/shared/Wrapper";
import { useMe } from '@/lib/api/user/userQueries';
import { useUpdateUserSettings } from "@/lib/api/user/userMutations";
import { View, Text, Pressable, ActivityIndicator } from "react-native";
import { useGlobalStyles } from "@/styles/globalStyles";
import Entypo from "@expo/vector-icons/Entypo";
import { useTranslation } from "react-i18next";

export default function Language() {
    const { user, loading, error } = useMe();
    const { updateUserSettings } = useUpdateUserSettings();
    const { t } = useTranslation();
    const globalStyles = useGlobalStyles();
    
    if (!user || loading) return <ActivityIndicator />;
    if (error) return <Text>Error: {error.message}</Text>;

    const handleUpdateSetting = async (language: string) => {
        try {
            await updateUserSettings({ language });
        } catch (error) {
             throw new Error (`Error updating user settings: ${error}`)
        }
    }
    
    return (
        <Wrapper>
            <Container>
                <ThemedText type='subtitle'>Account</ThemedText>
                <View style={globalStyles.settingsList}>
                    <Pressable style={globalStyles.setting} onPress={() => handleUpdateSetting("English")}>
                        <ThemedText>{t('tabs.settings.english')}</ThemedText>
                        {user.settings?.language === "English" && (<Entypo name="check" size={18} color="green" />)}
                    </Pressable>
                    <HorizontalRule />
                    <Pressable style={globalStyles.setting} onPress={() => handleUpdateSetting("Swedish")}>
                        <ThemedText>{t('tabs.settings.swedish')}</ThemedText>
                        {user.settings?.language === "Swedish" && (<Entypo name="check" size={18} color="green" />)}
                    </Pressable>
                </View>
            </Container>
        </Wrapper>
    )
};