import { globalStyles } from '@/styles/globalStyles';
import { Button, View, Text, ActivityIndicator, StyleSheet, Pressable } from 'react-native';
import { useMe } from '@/hooks/useMe';
import { useAuth } from '@/utils/AuthContext';
import { HorizontalRule } from '@/components/HorizontalRule';
import Feather from '@expo/vector-icons/Feather';
import { Wrapper } from '@/components/Wrapper';
import { Container } from '@/components/Container';
import { ThemedText } from '@/components/ThemedText';
import { Link } from 'expo-router';

export default function Settings() {
    const { user, loading, error } = useMe();
    const  { logOut } = useAuth();

    if (loading) return <ActivityIndicator />;
    if (error) return <Text>Error: {error.message}</Text>;
    
    return (
        <Wrapper>
            <Container>
                <View style={styles.userRundown}>
                    <ThemedText>Username: {user?.name}</ThemedText>
                    <ThemedText>E-mail: {user?.email}</ThemedText>
                </View>
            </Container>
            <Container>
                <ThemedText type='subtitle'>Account</ThemedText>
                <View style={styles.settingsList}>
                    <Link href='/settings/manage-account' push asChild>
                        <Pressable style={styles.setting}>
                            <ThemedText>Manage Account</ThemedText>
                            <Feather name="arrow-right" size={16} color="black" />
                        </Pressable>
                    </Link>
                    <HorizontalRule />
                    <Pressable style={styles.setting}>
                        <ThemedText>Password & Security</ThemedText>
                        <Feather name="arrow-right" size={16} color="black" />
                    </Pressable>
                    <HorizontalRule />
                    <Pressable style={styles.setting}>
                        <ThemedText>Notifications</ThemedText>
                        <Feather name="arrow-right" size={16} color="black" />
                    </Pressable>
                </View>
            </Container>
            <Container>
                <ThemedText type='subtitle'>Preferences</ThemedText>
                <View style={styles.settingsList}>
                    <Link href='/settings/language' push asChild>
                        <Pressable style={styles.setting}>
                            <ThemedText>Language</ThemedText>
                            <View style={{ flexDirection: 'row', gap: 16, alignItems: 'center'}}>
                                <ThemedText>{user?.settings?.language}</ThemedText>
                                <Feather name="arrow-right" size={16} color="black" />
                            </View>
                        </Pressable>
                    </Link>
                    <HorizontalRule />
                    <Link href='/settings/theme' push asChild>
                        <Pressable style={styles.setting}>
                            <ThemedText>Theme</ThemedText>
                            <View style={{ flexDirection: 'row', gap: 16, alignItems: 'center'}}>
                                <ThemedText>{user?.settings?.theme}</ThemedText>
                                <Feather name="arrow-right" size={16} color="black" />
                            </View>
                        </Pressable>
                    </Link>
                    <HorizontalRule />
                    <Link href='/settings/max-challenges' push asChild>
                        <Pressable style={styles.setting}>
                            <ThemedText>Max Challenges Per Day</ThemedText>
                            <View style={{ flexDirection: 'row', gap: 16, alignItems: 'center'}}>
                                <ThemedText>{user?.settings?.numberOfChallengesPerDay}</ThemedText>
                                <Feather name="arrow-right" size={16} color="black" />
                            </View>
                        </Pressable>
                    </Link>
                </View>
            </Container>
            <Button title="Log Out" onPress={logOut} />
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
  },
  userRundown: {
    backgroundColor: '#dbdbdbff',
    padding: 8,
    flexDirection: 'column',
    gap: 8,
    borderRadius: 8,
  }
});