import { Container } from "@/components/Container";
import { HorizontalRule } from "@/components/HorizontalRule";
import { ThemedText } from "@/components/ThemedText";
import { Wrapper } from "@/components/Wrapper";
import { useMe } from '@/lib/api/user/userQueries';
import { View, Text, Pressable, StyleSheet, ActivityIndicator } from "react-native";
import { useUpdateUserSettings } from "@/lib/api/user/userMutations";

export default function MaxChallengesPerDay() {
    const { user, loading, error } = useMe();
    const { updateUserSettings } = useUpdateUserSettings();
        
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
                <View style={styles.settingsList}>
                    <Pressable style={styles.setting} onPress={() => handleUpdateSetting(1)}>
                        <ThemedText>1</ThemedText>
                    </Pressable>
                    <HorizontalRule />
                    <Pressable style={styles.setting} onPress={() => handleUpdateSetting(2)}>
                        <ThemedText>2</ThemedText>
                    </Pressable>
                    <HorizontalRule />
                    <Pressable style={styles.setting} onPress={() => handleUpdateSetting(3)}>
                        <ThemedText>3</ThemedText>
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