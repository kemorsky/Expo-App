import { globalStyles } from '@/styles/globalStyles';
import { Button, View, Text, ActivityIndicator, StyleSheet, Pressable } from 'react-native';
import { useMe } from '@/hooks/useMe';
import { useAuth } from '@/utils/auth-context';
import { HorizontalRule } from '@/components/HorizontalRule';
import Feather from '@expo/vector-icons/Feather';
import { Wrapper } from '@/components/Wrapper';
import { Container } from '@/components/Container';
import { ThemedText } from '@/components/ThemedText';

export default function Test() {
    const { user, loading, error } = useMe();
    const  { logOut } = useAuth();

    if (loading) return <ActivityIndicator />;
    if (error) return <Text>Error: {error.message}</Text>;
    
    return (
        <Wrapper>
            <ThemedText type='title' style={{alignSelf: 'center'}}>Settings</ThemedText>
            <Container>
                <ThemedText type='subtitle'>Account</ThemedText>
                <View style={styles.SettingsList}>
                    <Pressable style={styles.Setting}>
                        <ThemedText>Manage Account</ThemedText>
                        <Feather name="arrow-right" size={16} color="black" />
                    </Pressable>
                    <HorizontalRule />
                    <Pressable style={styles.Setting}>
                        <ThemedText>Password & Security</ThemedText>
                        <Feather name="arrow-right" size={16} color="black" />
                    </Pressable>
                    <HorizontalRule />
                    <Pressable style={styles.Setting}>
                        <ThemedText>Notifications</ThemedText>
                        <Feather name="arrow-right" size={16} color="black" />
                    </Pressable>
                </View>
            </Container>
            <Container>
                <ThemedText type='subtitle'>Preferences</ThemedText>
                <View style={styles.SettingsList}>
                    <Pressable style={styles.Setting}>
                        <ThemedText>Language</ThemedText>
                        <View style={{ flexDirection: 'row', gap: 16, alignItems: 'center'}}>
                            <ThemedText>{user?.settings?.language}</ThemedText>
                            <Feather name="arrow-right" size={16} color="black" />
                        </View>
                    </Pressable>
                    <HorizontalRule />
                     <Pressable style={styles.Setting}>
                        <ThemedText>Theme</ThemedText>
                        <View style={{ flexDirection: 'row', gap: 16, alignItems: 'center'}}>
                            <ThemedText>{user?.settings?.theme}</ThemedText>
                            <Feather name="arrow-right" size={16} color="black" />
                        </View>
                    </Pressable>
                    <HorizontalRule />
                     <Pressable style={styles.Setting}>
                        <ThemedText>Max Challenges Per Day</ThemedText>
                        <View style={{ flexDirection: 'row', gap: 16, alignItems: 'center'}}>
                            <ThemedText>{user?.settings?.numberOfChallengesPerDay}</ThemedText>
                            <Feather name="arrow-right" size={16} color="black" />
                        </View>
                    </Pressable>
                </View>
            </Container>
            <Button title="Log Out" onPress={logOut} />
        </Wrapper>
    )
}

const styles = StyleSheet.create({
  SettingsList: {
    backgroundColor: '#dbdbdbff',
    paddingHorizontal: 8,
    flexDirection: 'column',
    borderRadius: 8,
  },
  Setting: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  }
});