import { Container } from "@/components/Container";
import { HorizontalRule } from "@/components/HorizontalRule";
import { ThemedText } from "@/components/ThemedText";
import { Wrapper } from "@/components/Wrapper";
import { useMe } from '@/lib/api/user/userQueries';
import { View, Text, Pressable, ActivityIndicator } from "react-native";
import { useUpdateUserSettings } from "@/lib/api/user/userMutations";
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
                <ThemedText type='subtitle'>Account</ThemedText>
                <View style={globalStyles.settingsList}>
                    <Pressable style={globalStyles.setting} onPress={() => handleUpdateSetting(1)}>
                        <ThemedText>1</ThemedText>
                        {user.settings?.numberOfChallengesPerDay === 1 && (<Entypo name="check" size={18} color="green" />)}
                    </Pressable>
                    <HorizontalRule />
                    <Pressable style={globalStyles.setting} onPress={() => handleUpdateSetting(2)}>
                        <ThemedText>2</ThemedText>
                        {user.settings?.numberOfChallengesPerDay === 2 && (<Entypo name="check" size={18} color="green" />)}
                    </Pressable>
                    <HorizontalRule />
                    <Pressable style={globalStyles.setting} onPress={() => handleUpdateSetting(3)}>
                        <ThemedText>3</ThemedText>
                        {user.settings?.numberOfChallengesPerDay === 3 && (<Entypo name="check" size={18} color="green" />)}
                    </Pressable>
                </View>
            </Container>
        </Wrapper>
    )
};