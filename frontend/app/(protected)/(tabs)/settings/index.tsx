import { StyleSheet, View, Text, Pressable, Image } from "react-native";
import { useMe } from "@/api/user/userQueries";
import { useAuth } from "@/utils/AuthContext";
import { useGlobalStyles } from "@/styles/globalStyles";
import { HorizontalRule } from "@/components/shared/HorizontalRule";
import Feather from "@expo/vector-icons/Feather";
import { Wrapper } from "@/components/shared/Wrapper";
import { SettingsOption } from "@/components/settings/SettingsOption";
import { Container } from "@/components/shared/Container";
import { ThemedText } from "@/components/shared/ThemedText";
import { router } from "expo-router";
import SettingsPageSkeleton from "@/components/skeleton/pages/SettingsPageSkeleton";
import { useThemeConfig } from "@/hooks/useThemeConfig";
import { useTranslation } from "react-i18next";

export default function Settings() {
    const { user, loading, error } = useMe();
    const { theme } = useThemeConfig();
    const { t } = useTranslation();
    const  { logOut } = useAuth();
    const globalStyles = useGlobalStyles();

    if (!user ||loading) return <SettingsPageSkeleton />;
    if (error) return <Text>Error: {error.message}</Text>;

    return (
        <Wrapper>
            <Container>
                <View style={globalStyles.userRundown}>
                    <View style={styles.profilePicture}>
                        <Image style={[styles.profilePictureImage, { resizeMode: "cover" } ]} source={require("../../../../assets/images/profile-picture.png")}/>
                    </View>
                    <View style={styles.userRundown}>
                        <ThemedText type="option">{t("tabs.settings.username")}: 
                            <ThemedText> {user?.name}</ThemedText>
                        </ThemedText>
                        <ThemedText type="option">{t("tabs.settings.email")}: 
                            <ThemedText> {user?.email}</ThemedText>
                        </ThemedText>
                    </View>
                    <Pressable style={({pressed}) => [{ opacity: pressed ? 0.7 : 1 }, globalStyles.buttonSignOut ]} onPress={logOut}>
                        <ThemedText type="buttonText">{t("tabs.settings.button")}</ThemedText>
                    </Pressable>
                </View>
            </Container>
            <Container>
                <ThemedText type="subtitle">Preferences</ThemedText>
                <View style={globalStyles.settingsList}>
                    <SettingsOption onPress={() => {router.push("/settings/language")}}>                            
                        <ThemedText type="option">{t("tabs.settings.language")}</ThemedText>
                            <View style={styles.navigateArrow}>
                                <Feather name="arrow-right" size={16} color={theme.colors.text} />
                            </View>
                    </SettingsOption>
                    <HorizontalRule />
                    <SettingsOption onPress={() => {router.push("/settings/theme")}}>                            
                        <ThemedText type="option">{t("tabs.settings.theme")}</ThemedText>
                            <View style={styles.navigateArrow}>
                                <Feather name="arrow-right" size={16} color={theme.colors.text} />
                            </View>
                    </SettingsOption>
                    <HorizontalRule />
                    <SettingsOption onPress={() => {router.push("/settings/max-challenges")}}>
                        <ThemedText type="option">{t("tabs.settings.maxChallenges")}</ThemedText>
                        <View style={styles.navigateArrow}>
                            <Feather name="arrow-right" size={16} color={theme.colors.text} />
                        </View>
                    </SettingsOption>
                </View>
            </Container>
        </Wrapper>
    )
};

const styles = StyleSheet.create({
    profilePicture: { 
        width: 80, 
        height: 80, 
        borderRadius: 999, 
        borderWidth: 1, 
        borderColor: "#2b00ec", 
        alignSelf: "center", 
        overflow: "hidden" 
    },
    profilePictureImage: { 
        width: 80, 
        height: 80 
    },
    userRundown: {
        flexDirection: "column",
        gap: 8
    },
    navigateArrow: { 
        flexDirection: "row", 
        gap: 16, 
        alignItems: "center"
    }
});