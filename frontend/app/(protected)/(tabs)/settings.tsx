import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { globalStyles } from '@/styles/globalStyles';
import { Button, View, Text, ActivityIndicator } from 'react-native';
import { useMe } from '@/hooks/useMe';
import { useAuth } from '@/utils/auth-context';

export default function Test() {
    const { user, loading, error } = useMe();
    const  { logOut } = useAuth();

    if (loading) return <ActivityIndicator />;
    if (error) return <Text>Error: {error.message}</Text>;
    
    return (
        <ParallaxScrollView
            headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
            headerImage={
                <IconSymbol 
                    size={200} 
                    name="basketball.fill" 
                    color="black"
                    style={globalStyles.headerImage} />
            }>
            <Text>Settings</Text>
            <ThemedView style={globalStyles.titleContainer}>
                <ThemedText style={globalStyles.title} type='title'>Test</ThemedText>
            </ThemedView>
            <ThemedText>This is a test of creating a new tab.</ThemedText>
            <View>
                <ThemedText>{user?.settings?.language}</ThemedText>
                <ThemedText>{user?.settings?.theme}</ThemedText>
                <ThemedText>{user?.settings?.numberOfChallengesPerDay}</ThemedText>
            </View>
            {/* <View>
                <ThemedText>{user?.settings.language}</ThemedText>
                <ThemedText>{user?.settings?.theme}</ThemedText>
                <ThemedText>{user?.settings?.numberOfChallengesPerDay}</ThemedText>
            </View> */}
            <Button title="Log Out" onPress={logOut} />
        </ParallaxScrollView>
    )
}