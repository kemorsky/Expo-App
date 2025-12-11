import { Container } from "@/components/Container";
import { HorizontalRule } from "@/components/HorizontalRule";
import { ThemedText } from "@/components/ThemedText";
import { Wrapper } from "@/components/Wrapper";
import { useMe } from '@/lib/api/user/userQueries';
import { useGlobalStyles } from "@/styles/globalStyles";
import { View, Text, Pressable, ActivityIndicator } from "react-native";

export default function ManageAccount() {
    const { user, loading, error } = useMe();
    const globalStyles = useGlobalStyles();

    if (!user || loading) return <ActivityIndicator />;
    if (error) return <Text>Error: {error.message}</Text>;
    
    return (
        <Wrapper>
            <Container>
                <ThemedText type='subtitle'>Account</ThemedText>
                <View style={globalStyles.settingsList}>
                    <Pressable style={globalStyles.setting}>
                        <ThemedText>Change Password</ThemedText>
                    </Pressable>
                    <HorizontalRule />
                    <Pressable style={globalStyles.setting}>
                        <ThemedText>Swedish</ThemedText>
                    </Pressable>
                </View>
            </Container>
        </Wrapper>
    )
};