import { View, Text, Pressable, Image } from 'react-native';
import { useMe } from '@/lib/api/user/userQueries';
import { useAuth } from '@/utils/AuthContext';
import { useGlobalStyles } from '@/styles/globalStyles';
import { HorizontalRule } from '@/components/shared/HorizontalRule';
import Feather from '@expo/vector-icons/Feather';
import { Wrapper } from '@/components/shared/Wrapper';
import { Container } from '@/components/shared/Container';
import { ThemedText } from '@/components/ThemedText';
import { Link } from 'expo-router';
import SettingsPageSkeleton from '@/components/skeleton/pages/SettingsPageSkeleton';
import { useThemeConfig } from '@/hooks/useThemeConfig';

export default function Settings() {
    const { user, loading, error } = useMe();
    const { theme } = useThemeConfig();
    const  { logOut } = useAuth();
    const globalStyles = useGlobalStyles();

    if (!user ||loading) return <SettingsPageSkeleton />;
    if (error) return <Text>Error: {error.message}</Text>;
    
    return (
        <Wrapper>
            <Container>
                <View style={globalStyles.userRundown}>
                    <View style={{width: 80, height: 80, borderRadius: 999, backgroundColor: "blue", alignSelf: "center", overflow: "hidden"}}>
                        <Image style={{width: 80, height: 80, objectFit: "cover"}} source={require('../../../../assets/images/splash-icon.jpg')}/>
                    </View>
                    <View style={{flexDirection: "column", gap: 8}}>
                        <ThemedText type='option'>Username: 
                            <ThemedText> {user?.name}</ThemedText>
                        </ThemedText>
                        <ThemedText type='option'>E-mail: 
                            <ThemedText> {user?.email}</ThemedText>
                        </ThemedText>
                    </View>
                    <Pressable style={{width: 120, alignItems: "center", alignSelf: "center", padding: 8, backgroundColor: "#3e05a8", borderRadius: 8, }} onPress={logOut}>
                        <ThemedText>Sign Out</ThemedText>
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
                                <Feather name="arrow-right" size={16} color={theme.colors.text} />
                            </View>
                        </Pressable>
                    </Link>
                    <HorizontalRule />
                    <Link href='/settings/theme' push asChild>
                        <Pressable style={globalStyles.setting}>
                            <ThemedText type='option'>Theme</ThemedText>
                            <View style={{ flexDirection: 'row', gap: 16, alignItems: 'center'}}>
                                <ThemedText>{user?.settings?.theme}</ThemedText>
                                <Feather name="arrow-right" size={16} color={theme.colors.text} />
                            </View>
                        </Pressable>
                    </Link>
                    <HorizontalRule />
                    <Link href='/settings/max-challenges' push asChild>
                        <Pressable style={globalStyles.setting}>
                            <ThemedText type='option'>Max Challenges Per Day</ThemedText>
                            <View style={{ flexDirection: 'row', gap: 16, alignItems: 'center'}}>
                                <ThemedText>{user?.settings?.numberOfChallengesPerDay}</ThemedText>
                                <Feather name="arrow-right" size={16} color={theme.colors.text} />
                            </View>
                        </Pressable>
                    </Link>
                </View>
            </Container>
        </Wrapper>
    )
};