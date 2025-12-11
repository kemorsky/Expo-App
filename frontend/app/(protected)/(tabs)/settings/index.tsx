import { Button, View, Text, Pressable } from 'react-native';
import { useMe } from '@/lib/api/user/userQueries';
import { useAuth } from '@/utils/AuthContext';
import { useGlobalStyles } from '@/styles/globalStyles';
import { HorizontalRule } from '@/components/HorizontalRule';
import Feather from '@expo/vector-icons/Feather';
import { Wrapper } from '@/components/Wrapper';
import { Container } from '@/components/Container';
import { ThemedText } from '@/components/ThemedText';
import { Link } from 'expo-router';
import SettingsPageSkeleton from '@/components/skeleton/pages/SettingsPageSkeleton';

export default function Settings() {
    const { user, loading, error } = useMe();
    const  { logOut } = useAuth();
    const globalStyles = useGlobalStyles();

    if (!user ||loading) return <SettingsPageSkeleton />;
    if (error) return <Text>Error: {error.message}</Text>;
    
    return (
        <Wrapper>
            <Container>
                <View style={globalStyles.userRundown}>
                    <ThemedText>Username: {user?.name}</ThemedText>
                    <ThemedText>E-mail: {user?.email}</ThemedText>
                </View>
            </Container>
            <Container>
                <ThemedText type='subtitle'>Account</ThemedText>
                <View style={globalStyles.settingsList}>
                    <Link href='/settings/manage-account' push asChild>
                        <Pressable style={globalStyles.setting}>
                            <ThemedText type='option'>Manage Account</ThemedText>
                            <Feather name="arrow-right" size={16} color="black" />
                        </Pressable>
                    </Link>
                    <HorizontalRule />
                    <Pressable style={globalStyles.setting}>
                        <ThemedText type='option'>Password & Security</ThemedText>
                        <Feather name="arrow-right" size={16} color="black" />
                    </Pressable>
                    <HorizontalRule />
                    <Pressable style={globalStyles.setting}>
                        <ThemedText type='option'>Notifications</ThemedText>
                        <Feather name="arrow-right" size={16} color="black" />
                    </Pressable>
                </View>
            </Container>
            <Container>
                <ThemedText type='subtitle'>Preferences</ThemedText>
                <View style={globalStyles.settingsList}>
                    <Link href='/settings/language' push asChild>
                        <Pressable style={globalStyles.setting}>
                            <ThemedText type='option'>Language</ThemedText>
                            <View style={{ flexDirection: 'row', gap: 16, alignItems: 'center'}}>
                                <ThemedText>{user?.settings?.language}</ThemedText>
                                <Feather name="arrow-right" size={16} color="black" />
                            </View>
                        </Pressable>
                    </Link>
                    <HorizontalRule />
                    <Link href='/settings/theme' push asChild>
                        <Pressable style={globalStyles.setting}>
                            <ThemedText type='option'>Theme</ThemedText>
                            <View style={{ flexDirection: 'row', gap: 16, alignItems: 'center'}}>
                                <ThemedText>{user?.settings?.theme}</ThemedText>
                                <Feather name="arrow-right" size={16} color="black" />
                            </View>
                        </Pressable>
                    </Link>
                    <HorizontalRule />
                    <Link href='/settings/max-challenges' push asChild>
                        <Pressable style={globalStyles.setting}>
                            <ThemedText type='option'>Max Challenges Per Day</ThemedText>
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
};