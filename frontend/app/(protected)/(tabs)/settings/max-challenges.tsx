import { Container } from "@/components/shared/Container";
import { HorizontalRule } from "@/components/shared/HorizontalRule";
import { ThemedText } from "@/components/shared/ThemedText";
import { Wrapper } from "@/components/shared/Wrapper";
import { SettingsOption } from "@/components/settings/SettingsOption";
import { useMe } from "@/api/user/userQueries";
import { View, Text, ActivityIndicator } from "react-native";
import { useUpdateUserSettings } from "@/api/user/userMutations";
import { useGlobalStyles } from "@/styles/globalStyles";
import Entypo from "@expo/vector-icons/Entypo";

export default function MaxChallengesPerDay() {
    const { user, loading, error } = useMe();
    const { updateUserSettings } = useUpdateUserSettings();
    const globalStyles = useGlobalStyles();
        
    if (!user || loading) return <ActivityIndicator />;
    if (error) return <Text>Error: {error.message}</Text>;

    const handleUpdateSetting = async (numberOfChallengesPerDay: number) => {
        try {
            await updateUserSettings({ numberOfChallengesPerDay });
        } catch (error) {
            throw new Error (`Error updating max number of challenges per day: ${error}`)
        }
    }
    
    return (
        <Wrapper>
            <Container>
                <View style={globalStyles.settingsList}>
                    <SettingsOption onPress={() => handleUpdateSetting(1)}>
                        <ThemedText type="option">1</ThemedText>
                        {user.settings?.numberOfChallengesPerDay === 1 && (<Entypo name="check" size={18} color="green" />)}
                    </SettingsOption>
                    <HorizontalRule />
                    <SettingsOption onPress={() => handleUpdateSetting(2)}>
                        <ThemedText type="option">2</ThemedText>
                        {user.settings?.numberOfChallengesPerDay === 2 && (<Entypo name="check" size={18} color="green" />)}
                    </SettingsOption>
                    <HorizontalRule />
                    <SettingsOption onPress={() => handleUpdateSetting(3)}>
                        <ThemedText type="option">3</ThemedText>
                        {user.settings?.numberOfChallengesPerDay === 3 && (<Entypo name="check" size={18} color="green" />)}
                    </SettingsOption>
                </View>
            </Container>
        </Wrapper>
    )
};