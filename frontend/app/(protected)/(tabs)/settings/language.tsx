import { Container } from "@/components/Container";
import { HorizontalRule } from "@/components/HorizontalRule";
import { ThemedText } from "@/components/ThemedText";
import { Wrapper } from "@/components/Wrapper";
import { useMe } from '@/lib/api/user/userQueries';
import { useUpdateUserSettings } from "@/lib/api/user/userMutations";
import { View, Text, Pressable, ActivityIndicator } from "react-native";
import { useGlobalStyles } from "@/styles/globalStyles";
import Entypo from "@expo/vector-icons/Entypo";

export default function Language() {
    const { user, loading, error } = useMe();
    const { updateUserSettings } = useUpdateUserSettings();
    const globalStyles = useGlobalStyles();
    
    if (!user || loading) return <ActivityIndicator />;
    if (error) return <Text>Error: {error.message}</Text>;

    const handleUpdateSetting = async (theme: string) => {
        await updateUserSettings({ theme });
    }
    
    return (
        <Wrapper>
            <Container>
                <ThemedText type='subtitle'>Account</ThemedText>
                <View style={globalStyles.settingsList}>
                    <Pressable style={globalStyles.setting}>
                        <ThemedText>English</ThemedText>
                        {user.settings?.language === "English" && (<Entypo name="check" size={18} color="green" />)}
                    </Pressable>
                    <HorizontalRule />
                    <Pressable style={globalStyles.setting}>
                        <ThemedText>Swedish</ThemedText>
                        {user.settings?.language === "Swedish" && (<Entypo name="check" size={18} color="green" />)}
                    </Pressable>
                </View>
            </Container>
        </Wrapper>
    )
};