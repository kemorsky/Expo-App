import { Container } from "@/components/Container";
import { HorizontalRule } from "@/components/HorizontalRule";
import { ThemedText } from "@/components/ThemedText";
import { Wrapper } from "@/components/Wrapper";
import { useMe } from '@/lib/api/user/userQueries';
import { useUpdateUserSettings } from "@/lib/api/user/userMutations";
import { View, Text, Pressable, StyleSheet, ActivityIndicator } from "react-native";

export default function Language() {
    const { user, loading, error } = useMe();
    const { updateUserSettings } = useUpdateUserSettings();
    
    if (!user || loading) return <ActivityIndicator />;
    if (error) return <Text>Error: {error.message}</Text>;

    const handleUpdateSetting = async (theme: string) => {
        await updateUserSettings({ theme });
    }
    
    return (
        <Wrapper>
            <Container>
                <ThemedText type='subtitle'>Account</ThemedText>
                <View style={styles.settingsList}>
                    <Pressable style={styles.setting}>
                        <ThemedText>English</ThemedText>
                    </Pressable>
                    <HorizontalRule />
                    <Pressable style={styles.setting}>
                        <ThemedText>Swedish</ThemedText>
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